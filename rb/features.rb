# Letscount SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LetscountFeatures
  def self.make_feature(name)
    case name
    when "base"
      LetscountBaseFeature.new
    when "test"
      LetscountTestFeature.new
    else
      LetscountBaseFeature.new
    end
  end
end
