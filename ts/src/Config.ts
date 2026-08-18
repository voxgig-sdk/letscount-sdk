
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Letscount',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        },
        {
          "name": "namespace",
          "type": "`$STRING`"
        },
        {
          "name": "updated_at",
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
              "parts": [
                "{namespace}",
                "{key}"
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
              "parts": [
                "{namespace}",
                "{key}"
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
              }
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
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        },
        {
          "name": "namespace",
          "type": "`$STRING`"
        },
        {
          "name": "updated_at",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "type": "`$NUMBER`"
        }
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
              "parts": [
                "{namespace}",
                "{key}"
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
              }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        },
        {
          "name": "namespace",
          "type": "`$STRING`"
        },
        {
          "name": "updated_at",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "type": "`$NUMBER`"
        }
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
              "parts": [
                "{namespace}",
                "{key}"
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
              }
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
  config
}

