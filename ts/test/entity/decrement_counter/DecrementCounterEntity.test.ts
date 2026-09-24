

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id","parts":["namespace","key"],"sep":"/"},"name":"decrement_counter","op":{"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /{namespace}/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"namespace","or":"namespace","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/{namespace}/{key}","q":{"exist":["key","namespace"]},"r":{},"s":[{"var":"namespace"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"decrement_counter","name__orig":"decrement_counter","Name":"DecrementCounter","name_":"decrement_counter","name-":"decrement-counter","NAME":"DECREMENT_COUNTER","index$":1}, {"active":true,"entity":"decrement_counter","key$":"BasicDecrementCounterFlow","kind":"basic","name":"BasicDecrementCounterFlow","param":{},"step":[]}, 'DecrementCounter', {"DELETE /{namespace}/{key}":{"protocol":"http","operationId":"decrementCounter","requestBody":{"description":"Amount to decrement (optional, defaults to 1)","required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"amount":{"type":"number","description":"The amount to decrement the counter by","default":1}}}}}},"responses":{"200":{"description":"Counter successfully decremented","content":{"application/json":{"schema":{"type":"object","properties":{"namespace":{"description":"The namespace of the counter","key$":"namespace","type":"string"},"key":{"description":"The key of the counter","key$":"key","type":"string"},"value":{"description":"The current value of the counter","key$":"value","type":"number"},"created_at":{"description":"Timestamp when the counter was created","format":"date-time","key$":"created_at","type":"string"},"updated_at":{"description":"Timestamp when the counter was last updated","format":"date-time","key$":"updated_at","type":"string"}},"x-ref":"#/components/schemas/Counter"}}}},"404":{"description":"Counter not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"namespace","in":"path","required":true,"description":"The unique namespace identifier for the counter","schema":{"type":"string"},"index$":0},{"name":"key","in":"path","required":true,"description":"The unique key identifier for the counter within the namespace","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
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
  
