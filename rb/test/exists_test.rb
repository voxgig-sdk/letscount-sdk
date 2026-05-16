# Letscount SDK exists test

require "minitest/autorun"
require_relative "../Letscount_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LetscountSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
