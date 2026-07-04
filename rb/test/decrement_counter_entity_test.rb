# DecrementCounter entity test

require "minitest/autorun"
require "json"
require_relative "../Letscount_sdk"
require_relative "runner"

class DecrementCounterEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LetscountSDK.test(nil, nil)
    ent = testsdk.DecrementCounter(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = decrement_counter_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "decrement_counter." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    decrement_counter_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.decrement_counter")))
    decrement_counter_ref01_data = nil
    if decrement_counter_ref01_data_raw.length > 0
      decrement_counter_ref01_data = Helpers.to_map(decrement_counter_ref01_data_raw[0][1])
    end

    # REMOVE
    decrement_counter_ref01_ent = client.DecrementCounter(nil)
    decrement_counter_ref01_match_rm0 = {
      "id" => decrement_counter_ref01_data["id"],
    }
    decrement_counter_ref01_ent.remove(decrement_counter_ref01_match_rm0, nil)

  end
end

def decrement_counter_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "decrement_counter", "DecrementCounterTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LetscountSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["decrement_counter01", "decrement_counter02", "decrement_counter03", "namespace01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID" => idmap,
    "LETSCOUNT_TEST_LIVE" => "FALSE",
    "LETSCOUNT_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LETSCOUNT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = LetscountSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LETSCOUNT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LETSCOUNT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
