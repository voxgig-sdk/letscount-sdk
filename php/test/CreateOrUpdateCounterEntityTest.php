<?php
declare(strict_types=1);

// CreateOrUpdateCounter entity test

require_once __DIR__ . '/../letscount_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CreateOrUpdateCounterEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LetscountSDK::test(null, null);
        $ent = $testsdk->CreateOrUpdateCounter(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = create_or_update_counter_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "create_or_update_counter." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $create_or_update_counter_ref01_ent = $client->CreateOrUpdateCounter(null);
        $create_or_update_counter_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.create_or_update_counter"), "create_or_update_counter_ref01"));
        $create_or_update_counter_ref01_data["key"] = $setup["idmap"]["key01"];
        $create_or_update_counter_ref01_data["namespace"] = $setup["idmap"]["namespace01"];

        [$create_or_update_counter_ref01_data_result, $err] = $create_or_update_counter_ref01_ent->create($create_or_update_counter_ref01_data, null);
        $this->assertNull($err);
        $create_or_update_counter_ref01_data = Helpers::to_map($create_or_update_counter_ref01_data_result);
        $this->assertNotNull($create_or_update_counter_ref01_data);

    }
}

function create_or_update_counter_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/create_or_update_counter/CreateOrUpdateCounterTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LetscountSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["create_or_update_counter01", "create_or_update_counter02", "create_or_update_counter03", "key01", "namespace01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID" => $idmap,
        "LETSCOUNT_TEST_LIVE" => "FALSE",
        "LETSCOUNT_TEST_EXPLAIN" => "FALSE",
        "LETSCOUNT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LETSCOUNT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LETSCOUNT_APIKEY"],
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
