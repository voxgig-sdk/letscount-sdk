

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


describe('CreateOrUpdateCounterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LETSCOUNT_TEST_LIVE=TRUE.
  afterEach(liveDelay('LETSCOUNT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LetscountSDK.test()
    const ent = testsdk.CreateOrUpdateCounter()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LETSCOUNT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_or_update_counter.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Timestamp when the counter was created","t":"`$STRING`","key$":"created_at","index$":0},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"The key of the counter","t":"`$STRING`","key$":"key","index$":1},"namespace":{"a":true,"h":"Namespace","n":"namespace","r":false,"sh":"The namespace of the counter","t":"`$STRING`","key$":"namespace","index$":2},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Timestamp when the counter was last updated","t":"`$STRING`","key$":"updated_at","index$":3},"value":{"a":true,"h":"Value","n":"value","op":{"create":{"req":true,"type":"`$NUMBER`"}},"r":false,"sh":"The current value of the counter","t":"`$NUMBER`","key$":"value","index$":4}},"name":"create_or_update_counter","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /{namespace}/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"namespace","or":"namespace","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/{namespace}/{key}","q":{"exist":["key","namespace"]},"r":{},"s":[{"var":"namespace"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"create_or_update_counter","name__orig":"create_or_update_counter","Name":"CreateOrUpdateCounter","name_":"create_or_update_counter","name-":"create-or-update-counter","NAME":"CREATE_OR_UPDATE_COUNTER","index$":0}, {"active":true,"entity":"create_or_update_counter","key$":"BasicCreateOrUpdateCounterFlow","kind":"basic","name":"BasicCreateOrUpdateCounterFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_or_update_counter_ref01"},"m":{"key":"key01","namespace":"namespace01"},"o":"create","s":[],"v":[],"index$":0}]}, 'CreateOrUpdateCounter', {"POST /{namespace}/{key}":{"protocol":"http","operationId":"createOrUpdateCounter","requestBody":{"description":"Counter value to set","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"value":{"type":"number","description":"The value to set for the counter","key$":"value"}},"required":["value"],"index$":1}}}},"responses":{"200":{"description":"Counter successfully created or updated","content":{"application/json":{"schema":{"type":"object","properties":{"namespace":{"description":"The namespace of the counter","key$":"namespace","type":"string"},"key":{"description":"The key of the counter","key$":"key","type":"string"},"value":{"description":"The current value of the counter","key$":"value","type":"number"},"created_at":{"description":"Timestamp when the counter was created","format":"date-time","key$":"created_at","type":"string"},"updated_at":{"description":"Timestamp when the counter was last updated","format":"date-time","key$":"updated_at","type":"string"}},"x-ref":"#/components/schemas/Counter","index$":0}}}},"400":{"description":"Bad request","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"namespace","in":"path","required":true,"description":"The unique namespace identifier for the counter","schema":{"type":"string"},"index$":0},{"name":"key","in":"path","required":true,"description":"The unique key identifier for the counter within the namespace","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_or_update_counter_ref01_ent = client.CreateOrUpdateCounter()
    let create_or_update_counter_ref01_data = setup.data.new.create_or_update_counter['create_or_update_counter_ref01']
    create_or_update_counter_ref01_data['key'] = setup.idmap['key01']
    create_or_update_counter_ref01_data['namespace'] = setup.idmap['namespace01']

    create_or_update_counter_ref01_data = (await create_or_update_counter_ref01_ent.create(create_or_update_counter_ref01_data)).data()
    assert(null != create_or_update_counter_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/create_or_update_counter/CreateOrUpdateCounterTestData.json')

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
    ['create_or_update_counter01','create_or_update_counter02','create_or_update_counter03','key01','namespace01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID': idmap,
    'LETSCOUNT_TEST_LIVE': 'FALSE',
    'LETSCOUNT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID']

  const live = 'TRUE' === env.LETSCOUNT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LETSCOUNT_TEST_CREATE_OR_UPDATE_COUNTER_ENTID']
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
  
