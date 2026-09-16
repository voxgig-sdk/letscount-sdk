"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('IncrementCounterEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LETSCOUNT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LETSCOUNT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LetscountSDK.test();
        const ent = testsdk.IncrementCounter();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LETSCOUNT_TEST_LIVE;
        for (const op of ['update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'increment_counter.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "amount", "req": false, "short": "The amount to increment the counter by", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "format": "date-time", "name": "created_at", "req": false, "short": "Timestamp when the counter was created", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "key", "req": false, "short": "The key of the counter", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "namespace", "req": false, "short": "The namespace of the counter", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "updated_at", "req": false, "short": "Timestamp when the counter was last updated", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "value", "req": false, "short": "The current value of the counter", "type": "`$NUMBER`", "index$": 6 }], "id": { "field": "id", "from": { "key": "key", "namespace": "namespace" }, "name": "id", "parts": ["namespace", "key"], "sep": "/" }, "name": "increment_counter", "op": { "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "namespace", "orig": "namespace", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "PUT /{namespace}/{key}", "json": "{\"operationId\":\"incrementCounter\",\"parameters\":[{\"description\":\"The unique namespace identifier for the counter\",\"in\":\"path\",\"name\":\"namespace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The unique key identifier for the counter within the namespace\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"amount\":{\"default\":1,\"description\":\"The amount to increment the counter by\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Amount to increment (optional, defaults to 1)\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"description\":\"Timestamp when the counter was created\",\"format\":\"date-time\",\"type\":\"string\"},\"key\":{\"description\":\"The key of the counter\",\"type\":\"string\"},\"namespace\":{\"description\":\"The namespace of the counter\",\"type\":\"string\"},\"updated_at\":{\"description\":\"Timestamp when the counter was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"The current value of the counter\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Counter successfully incremented\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Counter not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/{namespace}/{key}", "segments": [{ "var": "namespace" }, { "var": "key" }], "select": { "exist": ["key", "namespace"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "increment_counter", "name__orig": "increment_counter", "Name": "IncrementCounter", "name_": "increment_counter", "name-": "increment-counter", "NAME": "INCREMENT_COUNTER", "index$": 3 }, { "active": true, "entity": "increment_counter", "key$": "BasicIncrementCounterFlow", "kind": "basic", "name": "BasicIncrementCounterFlow", "param": {}, "step": [{ "active": true, "data": { "namespace": "namespace01" }, "input": { "ref": "increment_counter_ref01", "srcdatavar": "increment_counter_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-increment_counter_ref01" } }], "valid": [], "index$": 0 }] }, 'IncrementCounter');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let increment_counter_ref01_data = Object.values(setup.data.existing.increment_counter)[0];
        // UPDATE
        const increment_counter_ref01_ent = client.IncrementCounter();
        const increment_counter_ref01_data_up0 = {};
        increment_counter_ref01_data_up0.id = increment_counter_ref01_data.id;
        increment_counter_ref01_data_up0['namespace'] = setup.idmap['namespace'];
        const increment_counter_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-increment_counter_ref01_' + setup.now };
        increment_counter_ref01_data_up0[increment_counter_ref01_markdef_up0.name] = increment_counter_ref01_markdef_up0.value;
        const increment_counter_ref01_resdata_up0 = (await increment_counter_ref01_ent.update(increment_counter_ref01_data_up0)).data();
        (0, node_assert_1.default)(increment_counter_ref01_resdata_up0.id === increment_counter_ref01_data_up0.id);
        (0, node_assert_1.default)(increment_counter_ref01_resdata_up0[increment_counter_ref01_markdef_up0.name] === increment_counter_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/increment_counter/IncrementCounterTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LetscountSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['increment_counter01', 'increment_counter02', 'increment_counter03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID': idmap,
        'LETSCOUNT_TEST_LIVE': 'FALSE',
        'LETSCOUNT_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID'];
    const live = 'TRUE' === env.LETSCOUNT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LetscountSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LETSCOUNT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=IncrementCounterEntity.test.js.map