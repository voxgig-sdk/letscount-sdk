package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestIncrementCounterEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IncrementCounter(nil)
		if ent == nil {
			t.Fatal("expected non-nil IncrementCounterEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := increment_counterBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "increment_counter." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		incrementCounterRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.increment_counter", setup.data)))
		var incrementCounterRef01Data map[string]any
		if len(incrementCounterRef01DataRaw) > 0 {
			incrementCounterRef01Data = core.ToMapAny(incrementCounterRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = incrementCounterRef01Data

		// UPDATE
		incrementCounterRef01Ent := client.IncrementCounter(nil)
		incrementCounterRef01DataUp0Up := map[string]any{
			"namespace": setup.idmap["namespace"],
		}

		incrementCounterRef01MarkdefUp0Name := "created_at"
		incrementCounterRef01MarkdefUp0Value := fmt.Sprintf("Mark01-increment_counter_ref01_%d", setup.now)
		incrementCounterRef01DataUp0Up[incrementCounterRef01MarkdefUp0Name] = incrementCounterRef01MarkdefUp0Value

		incrementCounterRef01ResdataUp0Result, err := incrementCounterRef01Ent.Update(incrementCounterRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		incrementCounterRef01ResdataUp0 := core.ToMapAny(incrementCounterRef01ResdataUp0Result)
		if incrementCounterRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if incrementCounterRef01ResdataUp0[incrementCounterRef01MarkdefUp0Name] != incrementCounterRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", incrementCounterRef01MarkdefUp0Name, incrementCounterRef01ResdataUp0[incrementCounterRef01MarkdefUp0Name])
		}

	})
}

func increment_counterBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "increment_counter", "IncrementCounterTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read increment_counter test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse increment_counter test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"increment_counter01", "increment_counter02", "increment_counter03", "namespace01"},
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
	entidEnvRaw := os.Getenv("LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID": idmap,
		"LETSCOUNT_TEST_LIVE":      "FALSE",
		"LETSCOUNT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add namespace alias for update test.
	if idmapResolved["namespace"] == nil {
		idmapResolved["namespace"] = idmapResolved["namespace01"]
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
