# Letscount SDK utility: make_context

from projectname_sdk.core.context import LetscountContext


def make_context_util(ctxmap, basectx):
    return LetscountContext(ctxmap, basectx)
