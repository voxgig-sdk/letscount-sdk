

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LetscountSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DecrementCounterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LETSCOUNT_TEST_LIVE=TRUE.
  afterEach(liveDelay('LETSCOUNT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LetscountSDK.test()
    const ent = testsdk.DecrementCounter()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LETSCOUNT_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'decrement_counter.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id","parts":["namespace","key"],"sep":"/"},"name":"decrement_counter","op":{"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"namespace","orig":"namespace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /{namespace}/{key}","json":"{\"operationId\":\"decrementCounter\",\"parameters\":[{\"description\":\"The unique namespace identifier for the counter\",\"in\":\"path\",\"name\":\"namespace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The unique key identifier for the counter within the namespace\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"amount\":{\"default\":1,\"description\":\"The amount to decrement the counter by\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Amount to decrement (optional, defaults to 1)\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"description\":\"Timestamp when the counter was created\",\"format\":\"date-time\",\"type\":\"string\"},\"key\":{\"description\":\"The key of the counter\",\"type\":\"string\"},\"namespace\":{\"description\":\"The namespace of the counter\",\"type\":\"string\"},\"updated_at\":{\"description\":\"Timestamp when the counter was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"The current value of the counter\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Counter successfully decremented\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Counter not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/{namespace}/{key}","segments":[{"var":"namespace"},{"var":"key"}],"select":{"exist":["key","namespace"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"decrement_counter","name__orig":"decrement_counter","Name":"DecrementCounter","name_":"decrement_counter","name-":"decrement-counter","NAME":"DECREMENT_COUNTER","index$":1}, {"active":true,"entity":"decrement_counter","key$":"BasicDecrementCounterFlow","kind":"basic","name":"BasicDecrementCounterFlow","param":{},"step":[]}, 'DecrementCounter')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let decrement_counter_ref01_data = Object.values(setup.data.existing.decrement_counter)[0] as any

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/decrement_counter/DecrementCounterTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LetscountSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['decrement_counter01','decrement_counter02','decrement_counter03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID': idmap,
    'LETSCOUNT_TEST_LIVE': 'FALSE',
    'LETSCOUNT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID']

  const live = 'TRUE' === env.LETSCOUNT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LETSCOUNT_TEST_DECREMENT_COUNTER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LetscountSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
