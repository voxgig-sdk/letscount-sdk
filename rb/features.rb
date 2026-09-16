# Letscount SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LetscountFeatures
  def self.make_feature(name)
    case name
    when "base"
      LetscountBaseFeature.new
    when "ratelimit"
      LetscountRatelimitFeature.new
    when "retry"
      LetscountRetryFeature.new
    when "test"
      LetscountTestFeature.new
    when "timeout"
      LetscountTimeoutFeature.new
    else
      LetscountBaseFeature.new
    end
  end
end
