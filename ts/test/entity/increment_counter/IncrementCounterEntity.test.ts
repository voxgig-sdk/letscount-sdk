

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


describe('IncrementCounterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LETSCOUNT_TEST_LIVE=TRUE.
  afterEach(liveDelay('LETSCOUNT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LetscountSDK.test()
    const ent = testsdk.IncrementCounter()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LETSCOUNT_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'increment_counter.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"amount","req":false,"short":"The amount to increment the counter by","type":"`$NUMBER`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":false,"short":"Timestamp when the counter was created","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"key","req":false,"short":"The key of the counter","type":"`$STRING`","index$":3},{"active":true,"name":"namespace","req":false,"short":"The namespace of the counter","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"updated_at","req":false,"short":"Timestamp when the counter was last updated","type":"`$STRING`","index$":5},{"active":true,"name":"value","req":false,"short":"The current value of the counter","type":"`$NUMBER`","index$":6}],"id":{"field":"id","from":{"key":"key","namespace":"namespace"},"name":"id","parts":["namespace","key"],"sep":"/"},"name":"increment_counter","op":{"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"namespace","orig":"namespace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"PUT /{namespace}/{key}","json":"{\"operationId\":\"incrementCounter\",\"parameters\":[{\"description\":\"The unique namespace identifier for the counter\",\"in\":\"path\",\"name\":\"namespace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The unique key identifier for the counter within the namespace\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"amount\":{\"default\":1,\"description\":\"The amount to increment the counter by\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Amount to increment (optional, defaults to 1)\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"description\":\"Timestamp when the counter was created\",\"format\":\"date-time\",\"type\":\"string\"},\"key\":{\"description\":\"The key of the counter\",\"type\":\"string\"},\"namespace\":{\"description\":\"The namespace of the counter\",\"type\":\"string\"},\"updated_at\":{\"description\":\"Timestamp when the counter was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"The current value of the counter\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Counter successfully incremented\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Counter not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/{namespace}/{key}","segments":[{"var":"namespace"},{"var":"key"}],"select":{"exist":["key","namespace"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"increment_counter","name__orig":"increment_counter","Name":"IncrementCounter","name_":"increment_counter","name-":"increment-counter","NAME":"INCREMENT_COUNTER","index$":3}, {"active":true,"entity":"increment_counter","key$":"BasicIncrementCounterFlow","kind":"basic","name":"BasicIncrementCounterFlow","param":{},"step":[{"active":true,"data":{"namespace":"namespace01"},"input":{"ref":"increment_counter_ref01","srcdatavar":"increment_counter_ref01_data","suffix":"_up0","textfield":"created_at"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-increment_counter_ref01"}}],"valid":[],"index$":0}]}, 'IncrementCounter')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let increment_counter_ref01_data = Object.values(setup.data.existing.increment_counter)[0] as any

    // UPDATE
    const increment_counter_ref01_ent = client.IncrementCounter()
    const increment_counter_ref01_data_up0: any = {}
    increment_counter_ref01_data_up0.id = increment_counter_ref01_data.id
    increment_counter_ref01_data_up0 ['namespace'] = setup.idmap['namespace']

    const increment_counter_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-increment_counter_ref01_' + setup.now }
    ;(increment_counter_ref01_data_up0 as any)[increment_counter_ref01_markdef_up0.name] = increment_counter_ref01_markdef_up0.value

    const increment_counter_ref01_resdata_up0 = (await increment_counter_ref01_ent.update(increment_counter_ref01_data_up0)).data()
    assert(increment_counter_ref01_resdata_up0.id === increment_counter_ref01_data_up0.id)

    assert((increment_counter_ref01_resdata_up0 as any)[increment_counter_ref01_markdef_up0.name] === increment_counter_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/increment_counter/IncrementCounterTestData.json')

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
    ['increment_counter01','increment_counter02','increment_counter03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID': idmap,
    'LETSCOUNT_TEST_LIVE': 'FALSE',
    'LETSCOUNT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID']

  const live = 'TRUE' === env.LETSCOUNT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LETSCOUNT_TEST_INCREMENT_COUNTER_ENTID']
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
  
