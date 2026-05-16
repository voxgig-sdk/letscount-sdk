
import { Context } from './Context'


class LetscountError extends Error {

  isLetscountError = true

  sdk = 'Letscount'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LetscountError
}

