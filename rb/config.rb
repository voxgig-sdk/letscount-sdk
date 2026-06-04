# Letscount SDK configuration

module LetscountConfig
  def self.make_config
    {
      "main" => {
        "name" => "Letscount",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.letscountapi.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "create_or_update_counter" => {},
          "decrement_counter" => {},
          "get_counter" => {},
          "increment_counter" => {},
        },
      },
      "entity" => {
        "create_or_update_counter" => {
          "fields" => [
            {
              "name" => "created_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "key",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "namespace",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "updated_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "value",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$NUMBER`",
                },
              },
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "create_or_update_counter",
          "op" => {
            "create" => {
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "POST",
                  "orig" => "/{namespace}/{key}",
                  "parts" => [
                    "{namespace}",
                    "{key}",
                  ],
                  "select" => {
                    "exist" => [
                      "key",
                      "namespace",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "decrement_counter" => {
          "fields" => [],
          "name" => "decrement_counter",
          "op" => {
            "remove" => {
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "DELETE",
                  "orig" => "/{namespace}/{key}",
                  "parts" => [
                    "{namespace}",
                    "{key}",
                  ],
                  "select" => {
                    "exist" => [
                      "key",
                      "namespace",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "remove",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_counter" => {
          "fields" => [
            {
              "name" => "created_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "key",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "namespace",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "updated_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "value",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "get_counter",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/{namespace}/{key}",
                  "parts" => [
                    "{namespace}",
                    "{key}",
                  ],
                  "select" => {
                    "exist" => [
                      "key",
                      "namespace",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "increment_counter" => {
          "fields" => [
            {
              "name" => "amount",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "created_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "key",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "namespace",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "updated_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "value",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 5,
            },
          ],
          "name" => "increment_counter",
          "op" => {
            "update" => {
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "PUT",
                  "orig" => "/{namespace}/{key}",
                  "parts" => [
                    "{namespace}",
                    "{key}",
                  ],
                  "select" => {
                    "exist" => [
                      "key",
                      "namespace",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "update",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    LetscountFeatures.make_feature(name)
  end
end
