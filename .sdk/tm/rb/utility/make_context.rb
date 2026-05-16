# Letscount SDK utility: make_context
require_relative '../core/context'
module LetscountUtilities
  MakeContext = ->(ctxmap, basectx) {
    LetscountContext.new(ctxmap, basectx)
  }
end
