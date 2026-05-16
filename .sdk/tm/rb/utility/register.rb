# Letscount SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LetscountUtility.registrar = ->(u) {
  u.clean = LetscountUtilities::Clean
  u.done = LetscountUtilities::Done
  u.make_error = LetscountUtilities::MakeError
  u.feature_add = LetscountUtilities::FeatureAdd
  u.feature_hook = LetscountUtilities::FeatureHook
  u.feature_init = LetscountUtilities::FeatureInit
  u.fetcher = LetscountUtilities::Fetcher
  u.make_fetch_def = LetscountUtilities::MakeFetchDef
  u.make_context = LetscountUtilities::MakeContext
  u.make_options = LetscountUtilities::MakeOptions
  u.make_request = LetscountUtilities::MakeRequest
  u.make_response = LetscountUtilities::MakeResponse
  u.make_result = LetscountUtilities::MakeResult
  u.make_point = LetscountUtilities::MakePoint
  u.make_spec = LetscountUtilities::MakeSpec
  u.make_url = LetscountUtilities::MakeUrl
  u.param = LetscountUtilities::Param
  u.prepare_auth = LetscountUtilities::PrepareAuth
  u.prepare_body = LetscountUtilities::PrepareBody
  u.prepare_headers = LetscountUtilities::PrepareHeaders
  u.prepare_method = LetscountUtilities::PrepareMethod
  u.prepare_params = LetscountUtilities::PrepareParams
  u.prepare_path = LetscountUtilities::PreparePath
  u.prepare_query = LetscountUtilities::PrepareQuery
  u.result_basic = LetscountUtilities::ResultBasic
  u.result_body = LetscountUtilities::ResultBody
  u.result_headers = LetscountUtilities::ResultHeaders
  u.transform_request = LetscountUtilities::TransformRequest
  u.transform_response = LetscountUtilities::TransformResponse
}
