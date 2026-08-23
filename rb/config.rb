# Letscount SDK configuration

module LetscountConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Letscount",
        "slug" => "letscount",
        "version" => "0.0.1",
        "target" => "rb",
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
              "short" => "Timestamp when the counter was created",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "short" => "The key of the counter",
              "type" => "`$STRING`",
            },
            {
              "name" => "namespace",
              "short" => "The namespace of the counter",
              "type" => "`$STRING`",
            },
            {
              "name" => "updated_at",
              "short" => "Timestamp when the counter was last updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$NUMBER`",
                },
              },
              "short" => "The current value of the counter",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "create_or_update_counter",
          "op" => {
            "create" => {
              "input" => "data",
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
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "input" => "data",
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
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "short" => "Timestamp when the counter was created",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "short" => "The key of the counter",
              "type" => "`$STRING`",
            },
            {
              "name" => "namespace",
              "short" => "The namespace of the counter",
              "type" => "`$STRING`",
            },
            {
              "name" => "updated_at",
              "short" => "Timestamp when the counter was last updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "The current value of the counter",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "get_counter",
          "op" => {
            "load" => {
              "input" => "data",
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
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "short" => "The amount to increment the counter by",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "created_at",
              "short" => "Timestamp when the counter was created",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "short" => "The key of the counter",
              "type" => "`$STRING`",
            },
            {
              "name" => "namespace",
              "short" => "The namespace of the counter",
              "type" => "`$STRING`",
            },
            {
              "name" => "updated_at",
              "short" => "Timestamp when the counter was last updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "The current value of the counter",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "increment_counter",
          "op" => {
            "update" => {
              "input" => "data",
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
                      },
                      {
                        "kind" => "param",
                        "name" => "namespace",
                        "orig" => "namespace",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
