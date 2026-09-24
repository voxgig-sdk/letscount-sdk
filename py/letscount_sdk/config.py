# Letscount SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Letscount",
            "slug": "letscount",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.letscountapi.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "create_or_update_counter": {},
                "decrement_counter": {},
                "get_counter": {},
                "increment_counter": {},
            },
        },
        "entity": {
      "create_or_update_counter": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the counter was created",
            "format": "date-time",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "short": "The key of the counter",
          },
          {
            "name": "namespace",
            "title": "Namespace",
            "type": "`$STRING`",
            "short": "The namespace of the counter",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the counter was last updated",
            "format": "date-time",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$NUMBER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$NUMBER`",
              },
            },
            "short": "The current value of the counter",
          },
        ],
        "name": "create_or_update_counter",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/{namespace}/{key}",
                "segments": [
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "key",
                  },
                ],
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "decrement_counter": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "namespace",
            "key",
          ],
          "sep": "/",
        },
        "name": "decrement_counter",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/{namespace}/{key}",
                "segments": [
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "key",
                  },
                ],
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_counter": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the counter was created",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "short": "The key of the counter",
          },
          {
            "name": "namespace",
            "title": "Namespace",
            "type": "`$STRING`",
            "short": "The namespace of the counter",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the counter was last updated",
            "format": "date-time",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$NUMBER`",
            "short": "The current value of the counter",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "key": "key",
            "namespace": "namespace",
          },
          "name": "id",
          "parts": [
            "namespace",
            "key",
          ],
          "sep": "/",
        },
        "name": "get_counter",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{namespace}/{key}",
                "segments": [
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "key",
                  },
                ],
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "increment_counter": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$NUMBER`",
            "short": "The amount to increment the counter by",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the counter was created",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "short": "The key of the counter",
          },
          {
            "name": "namespace",
            "title": "Namespace",
            "type": "`$STRING`",
            "short": "The namespace of the counter",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the counter was last updated",
            "format": "date-time",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$NUMBER`",
            "short": "The current value of the counter",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "key": "key",
            "namespace": "namespace",
          },
          "name": "id",
          "parts": [
            "namespace",
            "key",
          ],
          "sep": "/",
        },
        "name": "increment_counter",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/{namespace}/{key}",
                "segments": [
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "key",
                  },
                ],
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
