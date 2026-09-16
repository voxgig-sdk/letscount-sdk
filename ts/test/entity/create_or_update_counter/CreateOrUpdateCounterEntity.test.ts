

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":false,"short":"Timestamp when the counter was created","type":"`$STRING`","index$":0},{"active":true,"name":"key","req":false,"short":"The key of the counter","type":"`$STRING`","index$":1},{"active":true,"name":"namespace","req":false,"short":"The namespace of the counter","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"updated_at","req":false,"short":"Timestamp when the counter was last updated","type":"`$STRING`","index$":3},{"active":true,"name":"value","op":{"create":{"req":true,"type":"`$NUMBER`"}},"req":false,"short":"The current value of the counter","type":"`$NUMBER`","index$":4}],"name":"create_or_update_counter","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"namespace","orig":"namespace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"POST /{namespace}/{key}","json":"{\"operationId\":\"createOrUpdateCounter\",\"parameters\":[{\"description\":\"The unique namespace identifier for the counter\",\"in\":\"path\",\"name\":\"namespace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The unique key identifier for the counter within the namespace\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"value\":{\"description\":\"The value to set for the counter\",\"type\":\"number\"}},\"required\":[\"value\"],\"type\":\"object\"}}},\"description\":\"Counter value to set\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"description\":\"Timestamp when the counter was created\",\"format\":\"date-time\",\"type\":\"string\"},\"key\":{\"description\":\"The key of the counter\",\"type\":\"string\"},\"namespace\":{\"description\":\"The namespace of the counter\",\"type\":\"string\"},\"updated_at\":{\"description\":\"Timestamp when the counter was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"The current value of the counter\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Counter successfully created or updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/{namespace}/{key}","segments":[{"var":"namespace"},{"var":"key"}],"select":{"exist":["key","namespace"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"create_or_update_counter","name__orig":"create_or_update_counter","Name":"CreateOrUpdateCounter","name_":"create_or_update_counter","name-":"create-or-update-counter","NAME":"CREATE_OR_UPDATE_COUNTER","index$":0}, {"active":true,"entity":"create_or_update_counter","key$":"BasicCreateOrUpdateCounterFlow","kind":"basic","name":"BasicCreateOrUpdateCounterFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"create_or_update_counter_ref01"},"match":{"key":"key01","namespace":"namespace01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'CreateOrUpdateCounter')
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
    ['create_or_update_counter01','create_or_update_counter02','create_or_update_counter03'],
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
  
