
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Letscount',
        slug: "letscount",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.letscountapi.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      create_or_update_counter: {
      },

      decrement_counter: {
      },

      get_counter: {
      },

      increment_counter: {
      },

    }
  }


  entity = {
    "create_or_update_counter": {
      "fields": [
        {
          "format": "date-time",
          "name": "created_at",
          "short": "Timestamp when the counter was created",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "short": "The key of the counter",
          "type": "`$STRING`"
        },
        {
          "name": "namespace",
          "short": "The namespace of the counter",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "updated_at",
          "short": "Timestamp when the counter was last updated",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "op": {
            "create": {
              "req": true,
              "type": "`$NUMBER`"
            }
          },
          "short": "The current value of the counter",
          "type": "`$NUMBER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{namespace}/{key}",
              "segments": [
                {
                  "var": "namespace"
                },
                {
                  "var": "key"
                }
              ],
              "select": {
                "exist": [
                  "key",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{namespace}",
                "{key}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "decrement_counter": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "namespace",
          "key"
        ],
        "sep": "/"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/{namespace}/{key}",
              "segments": [
                {
                  "var": "namespace"
                },
                {
                  "var": "key"
                }
              ],
              "select": {
                "exist": [
                  "key",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{namespace}",
                "{key}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_counter": {
      "fields": [
        {
          "format": "date-time",
          "name": "created_at",
          "short": "Timestamp when the counter was created",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "short": "The key of the counter",
          "type": "`$STRING`"
        },
        {
          "name": "namespace",
          "short": "The namespace of the counter",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "updated_at",
          "short": "Timestamp when the counter was last updated",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "short": "The current value of the counter",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "from": {
          "key": "key",
          "namespace": "namespace"
        },
        "name": "id",
        "parts": [
          "namespace",
          "key"
        ],
        "sep": "/"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{namespace}/{key}",
              "segments": [
                {
                  "var": "namespace"
                },
                {
                  "var": "key"
                }
              ],
              "select": {
                "exist": [
                  "key",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{namespace}",
                "{key}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "increment_counter": {
      "fields": [
        {
          "name": "amount",
          "short": "The amount to increment the counter by",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "created_at",
          "short": "Timestamp when the counter was created",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "short": "The key of the counter",
          "type": "`$STRING`"
        },
        {
          "name": "namespace",
          "short": "The namespace of the counter",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "updated_at",
          "short": "Timestamp when the counter was last updated",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "short": "The current value of the counter",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "from": {
          "key": "key",
          "namespace": "namespace"
        },
        "name": "id",
        "parts": [
          "namespace",
          "key"
        ],
        "sep": "/"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/{namespace}/{key}",
              "segments": [
                {
                  "var": "namespace"
                },
                {
                  "var": "key"
                }
              ],
              "select": {
                "exist": [
                  "key",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{namespace}",
                "{key}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

