

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":false,"sh":"The amount to increment the counter by","t":"`$NUMBER`","key$":"amount","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Timestamp when the counter was created","t":"`$STRING`","key$":"created_at","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"The key of the counter","t":"`$STRING`","key$":"key","index$":3},"namespace":{"a":true,"h":"Namespace","n":"namespace","r":false,"sh":"The namespace of the counter","t":"`$STRING`","key$":"namespace","index$":4},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Timestamp when the counter was last updated","t":"`$STRING`","key$":"updated_at","index$":5},"value":{"a":true,"h":"Value","n":"value","r":false,"sh":"The current value of the counter","t":"`$NUMBER`","key$":"value","index$":6}},"id":{"field":"id","from":{"key":"key","namespace":"namespace"},"name":"id","parts":["namespace","key"],"sep":"/"},"name":"increment_counter","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /{namespace}/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"namespace","or":"namespace","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/{namespace}/{key}","q":{"exist":["key","namespace"]},"r":{},"s":[{"var":"namespace"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"increment_counter","name__orig":"increment_counter","Name":"IncrementCounter","name_":"increment_counter","name-":"increment-counter","NAME":"INCREMENT_COUNTER","index$":3}, {"active":true,"entity":"increment_counter","key$":"BasicIncrementCounterFlow","kind":"basic","name":"BasicIncrementCounterFlow","param":{},"step":[{"a":true,"d":{"namespace":"namespace01"},"i":{"ref":"increment_counter_ref01","srcdatavar":"increment_counter_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-increment_counter_ref01"}}],"v":[],"index$":0}]}, 'IncrementCounter', {"PUT /{namespace}/{key}":{"protocol":"http","operationId":"incrementCounter","requestBody":{"description":"Amount to increment (optional, defaults to 1)","required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"amount":{"type":"number","description":"The amount to increment the counter by","default":1,"key$":"amount"}},"index$":1}}}},"responses":{"200":{"description":"Counter successfully incremented","content":{"application/json":{"schema":{"type":"object","properties":{"namespace":{"description":"The namespace of the counter","key$":"namespace","type":"string"},"key":{"description":"The key of the counter","key$":"key","type":"string"},"value":{"description":"The current value of the counter","key$":"value","type":"number"},"created_at":{"description":"Timestamp when the counter was created","format":"date-time","key$":"created_at","type":"string"},"updated_at":{"description":"Timestamp when the counter was last updated","format":"date-time","key$":"updated_at","type":"string"}},"x-ref":"#/components/schemas/Counter","index$":0}}}},"404":{"description":"Counter not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"namespace","in":"path","required":true,"description":"The unique namespace identifier for the counter","schema":{"type":"string"},"index$":0},{"name":"key","in":"path","required":true,"description":"The unique key identifier for the counter within the namespace","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
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
    ['increment_counter01','increment_counter02','increment_counter03','namespace01'],
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
  
