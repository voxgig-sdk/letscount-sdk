-- Letscount SDK error

local LetscountError = {}
LetscountError.__index = LetscountError


function LetscountError.new(code, msg, ctx)
  local self = setmetatable({}, LetscountError)
  self.is_sdk_error = true
  self.sdk = "Letscount"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LetscountError:error()
  return self.msg
end


function LetscountError:__tostring()
  return self.msg
end


return LetscountError
