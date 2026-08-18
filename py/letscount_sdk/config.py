# Letscount SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "type": "`$STRING`",
          },
          {
            "name": "namespace",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "op": {
              "create": {
                "req": True,
                "type": "`$NUMBER`",
              },
            },
            "type": "`$NUMBER`",
          },
        ],
        "name": "create_or_update_counter",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "namespace",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/{namespace}/{key}",
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
        "fields": [],
        "name": "decrement_counter",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "namespace",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/{namespace}/{key}",
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "type": "`$STRING`",
          },
          {
            "name": "namespace",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "type": "`$NUMBER`",
          },
        ],
        "name": "get_counter",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "namespace",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{namespace}/{key}",
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$NUMBER`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "type": "`$STRING`",
          },
          {
            "name": "namespace",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "type": "`$NUMBER`",
          },
        ],
        "name": "increment_counter",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "namespace",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/{namespace}/{key}",
                "parts": [
                  "{namespace}",
                  "{key}",
                ],
                "select": {
                  "exist": [
                    "key",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
