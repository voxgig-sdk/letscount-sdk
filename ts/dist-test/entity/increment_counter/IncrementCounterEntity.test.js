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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "h": "Amount", "n": "amount", "r": false, "sh": "The amount to increment the counter by", "t": "`$NUMBER`", "key$": "amount", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Timestamp when the counter was created", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "sh": "The key of the counter", "t": "`$STRING`", "key$": "key", "index$": 3 }, "namespace": { "a": true, "h": "Namespace", "n": "namespace", "r": false, "sh": "The namespace of the counter", "t": "`$STRING`", "key$": "namespace", "index$": 4 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Timestamp when the counter was last updated", "t": "`$STRING`", "key$": "updated_at", "index$": 5 }, "value": { "a": true, "h": "Value", "n": "value", "r": false, "sh": "The current value of the counter", "t": "`$NUMBER`", "key$": "value", "index$": 6 } }, "id": { "field": "id", "from": { "key": "key", "namespace": "namespace" }, "name": "id", "parts": ["namespace", "key"], "sep": "/" }, "name": "increment_counter", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /{namespace}/{key}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "namespace", "or": "namespace", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/{namespace}/{key}", "q": { "exist": ["key", "namespace"] }, "r": {}, "s": [{ "var": "namespace" }, { "var": "key" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "increment_counter", "name__orig": "increment_counter", "Name": "IncrementCounter", "name_": "increment_counter", "name-": "increment-counter", "NAME": "INCREMENT_COUNTER", "index$": 3 }, { "active": true, "entity": "increment_counter", "key$": "BasicIncrementCounterFlow", "kind": "basic", "name": "BasicIncrementCounterFlow", "param": {}, "step": [{ "a": true, "d": { "namespace": "namespace01" }, "i": { "ref": "increment_counter_ref01", "srcdatavar": "increment_counter_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-increment_counter_ref01" } }], "v": [], "index$": 0 }] }, 'IncrementCounter', { "PUT /{namespace}/{key}": { "protocol": "http", "operationId": "incrementCounter", "requestBody": { "description": "Amount to increment (optional, defaults to 1)", "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "amount": { "type": "number", "description": "The amount to increment the counter by", "default": 1, "key$": "amount" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Counter successfully incremented", "content": { "application/json": { "schema": { "type": "object", "properties": { "namespace": { "description": "The namespace of the counter", "key$": "namespace", "type": "string" }, "key": { "description": "The key of the counter", "key$": "key", "type": "string" }, "value": { "description": "The current value of the counter", "key$": "value", "type": "number" }, "created_at": { "description": "Timestamp when the counter was created", "format": "date-time", "key$": "created_at", "type": "string" }, "updated_at": { "description": "Timestamp when the counter was last updated", "format": "date-time", "key$": "updated_at", "type": "string" } }, "x-ref": "#/components/schemas/Counter", "index$": 0 } } } }, "404": { "description": "Counter not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "namespace", "in": "path", "required": true, "description": "The unique namespace identifier for the counter", "schema": { "type": "string" }, "index$": 0 }, { "name": "key", "in": "path", "required": true, "description": "The unique key identifier for the counter within the namespace", "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" } });
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
    let idmap = transform(['increment_counter01', 'increment_counter02', 'increment_counter03', 'namespace01'], {
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