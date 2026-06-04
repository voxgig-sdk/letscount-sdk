<?php
declare(strict_types=1);

// DecrementCounter entity test

require_once __DIR__ . '/../letscount_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DecrementCounterEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LetscountSDK::test(null, null);
        $ent = $testsdk->DecrementCounter(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = decrement_counter_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "decrement_counter." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $decrement_counter_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.decrement_counter")));
        $decrement_counter_ref01_data = null;
        if (count($decrement_counter_ref01_data_raw) > 0) {
            $decrement_counter_ref01_data = Helpers::to_map($decrement_counter_ref01_data_raw[0][1]);
        }

        // REMOVE
        $decrement_counter_ref01_ent = $client->DecrementCounter(null);
        $decrement_counter_ref01_match_rm0 = [
            "id" => $decrement_counter_ref01_data["id"],
        ];
        [$_, $err] = $decrement_counter_ref01_ent->remove($decrement_counter_ref01_match_rm0, null);
        $this->assertNull($err);

    }
}

function decrement_counter_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/decrement_counter/DecrementCounterTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LetscountSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["decrement_counter01", "decrement_counter02", "decrement_counter03", "namespace01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID" => $idmap,
        "LETSCOUNT_TEST_LIVE" => "FALSE",
        "LETSCOUNT_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LETSCOUNT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new LetscountSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LETSCOUNT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LETSCOUNT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
