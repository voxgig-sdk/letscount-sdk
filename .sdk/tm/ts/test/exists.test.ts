
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LetscountSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LetscountSDK.test()
    equal(testsdk instanceof LetscountSDK, true,
      'LetscountSDK.test() must return a client synchronously')
  })

})
