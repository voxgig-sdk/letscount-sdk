# Letscount SDK feature factory

from letscount_sdk.feature.base_feature import LetscountBaseFeature
from letscount_sdk.feature.ratelimit_feature import LetscountRatelimitFeature
from letscount_sdk.feature.retry_feature import LetscountRetryFeature
from letscount_sdk.feature.test_feature import LetscountTestFeature
from letscount_sdk.feature.timeout_feature import LetscountTimeoutFeature


_FEATURES = {
    "base": lambda: LetscountBaseFeature(),
    "ratelimit": lambda: LetscountRatelimitFeature(),
    "retry": lambda: LetscountRetryFeature(),
    "test": lambda: LetscountTestFeature(),
    "timeout": lambda: LetscountTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
