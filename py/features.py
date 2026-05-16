# Letscount SDK feature factory

from feature.base_feature import LetscountBaseFeature
from feature.test_feature import LetscountTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LetscountBaseFeature(),
        "test": lambda: LetscountTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
