# IncrementCounter entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from letscount_sdk import LetscountSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestIncrementCounterEntity:

    def test_should_create_instance(self):
        testsdk = LetscountSDK.test(None, None)
        ent = testsdk.IncrementCounter(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _increment_counter_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "increment_counter." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        increment_counter_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.increment_counter")))
        increment_counter_ref01_data = None
        if len(increment_counter_ref01_data_raw) > 0:
            increment_counter_ref01_data = helpers.to_map(increment_counter_ref01_data_raw[0][1])

        # UPDATE
        increment_counter_ref01_ent = client.IncrementCounter(None)
        increment_counter_ref01_data_up0_up = {
            "namespace": setup["idmap"]["namespace"],
        }

        increment_counter_ref01_markdef_up0_name = "created_at"
        increment_counter_ref01_markdef_up0_value = "Mark01-increment_counter_ref01_" + str(setup["now"])
        increment_counter_ref01_data_up0_up[increment_counter_ref01_markdef_up0_name] = increment_counter_ref01_markdef_up0_value

        increment_counter_ref01_resdata_up0 = helpers.to_map(increment_counter_ref01_ent.update(increment_counter_ref01_data_up0_up, None))
        assert increment_counter_ref01_resdata_up0 is not None
        assert increment_counter_ref01_resdata_up0[increment_counter_ref01_markdef_up0_name] == increment_counter_ref01_markdef_up0_value



def _increment_counter_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/increment_counter/IncrementCounterTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LetscountSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["increment_counter01", "increment_counter02", "increment_counter03", "namespace01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID": idmap,
        "LETSCOUNT_TEST_LIVE": "FALSE",
        "LETSCOUNT_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("namespace") is None:
        idmap_resolved["namespace"] = idmap_resolved.get("namespace01")

    if env.get("LETSCOUNT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = LetscountSDK(helpers.to_map(merged_opts))

    _live = env.get("LETSCOUNT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LETSCOUNT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
