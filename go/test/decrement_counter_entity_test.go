package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/letscount-sdk/go"
	"github.com/voxgig-sdk/letscount-sdk/go/core"

	vs "github.com/voxgig-sdk/letscount-sdk/go/utility/struct"
)

func TestDecrementCounterEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DecrementCounter(nil)
		if ent == nil {
			t.Fatal("expected non-nil DecrementCounterEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := decrement_counterBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "decrement_counter." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		decrementCounterRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.decrement_counter", setup.data)))
		var decrementCounterRef01Data map[string]any
		if len(decrementCounterRef01DataRaw) > 0 {
			decrementCounterRef01Data = core.ToMapAny(decrementCounterRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = decrementCounterRef01Data

	})
}

func decrement_counterBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "decrement_counter", "DecrementCounterTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read decrement_counter test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse decrement_counter test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"decrement_counter01", "decrement_counter02", "decrement_counter03", "namespace01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID": idmap,
		"LETSCOUNT_TEST_LIVE":      "FALSE",
		"LETSCOUNT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LETSCOUNT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewLetscountSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LETSCOUNT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LETSCOUNT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
