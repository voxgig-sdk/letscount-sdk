# Letscount SDK exists test

import pytest
from letscount_sdk import LetscountSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LetscountSDK.test(None, None)
        assert testsdk is not None
