<?php
declare(strict_types=1);

// IncrementCounter entity test

require_once __DIR__ . '/../letscount_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class IncrementCounterEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LetscountSDK::test(null, null);
        $ent = $testsdk->IncrementCounter(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = increment_counter_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "increment_counter." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $increment_counter_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.increment_counter")));
        $increment_counter_ref01_data = null;
        if (count($increment_counter_ref01_data_raw) > 0) {
            $increment_counter_ref01_data = Helpers::to_map($increment_counter_ref01_data_raw[0][1]);
        }

        // UPDATE
        $increment_counter_ref01_ent = $client->IncrementCounter(null);
        $increment_counter_ref01_data_up0_up = [
            "namespace" => $setup["idmap"]["namespace"],
        ];

        $increment_counter_ref01_markdef_up0_name = "created_at";
        $increment_counter_ref01_markdef_up0_value = "Mark01-increment_counter_ref01_" . $setup["now"];
        $increment_counter_ref01_data_up0_up[$increment_counter_ref01_markdef_up0_name] = $increment_counter_ref01_markdef_up0_value;

        [$increment_counter_ref01_resdata_up0_result, $err] = $increment_counter_ref01_ent->update($increment_counter_ref01_data_up0_up, null);
        $this->assertNull($err);
        $increment_counter_ref01_resdata_up0 = Helpers::to_map($increment_counter_ref01_resdata_up0_result);
        $this->assertNotNull($increment_counter_ref01_resdata_up0);
        $this->assertEquals($increment_counter_ref01_resdata_up0[$increment_counter_ref01_markdef_up0_name], $increment_counter_ref01_markdef_up0_value);

    }
}

function increment_counter_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/increment_counter/IncrementCounterTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LetscountSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["increment_counter01", "increment_counter02", "increment_counter03", "namespace01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID" => $idmap,
        "LETSCOUNT_TEST_LIVE" => "FALSE",
        "LETSCOUNT_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["namespace"])) {
        $idmap_resolved["namespace"] = $idmap_resolved["namespace01"];
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
