-- Letscount SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Letscount",
      slug = "letscount",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.letscountapi.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["create_or_update_counter"] = {},
        ["decrement_counter"] = {},
        ["get_counter"] = {},
        ["increment_counter"] = {},
      },
    },
    entity = {
      ["create_or_update_counter"] = {
        ["fields"] = {
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the counter was created",
            ["format"] = "date-time",
          },
          {
            ["name"] = "key",
            ["title"] = "Key",
            ["type"] = "`$STRING`",
            ["short"] = "The key of the counter",
          },
          {
            ["name"] = "namespace",
            ["title"] = "Namespace",
            ["type"] = "`$STRING`",
            ["short"] = "The namespace of the counter",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the counter was last updated",
            ["format"] = "date-time",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$NUMBER`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$NUMBER`",
              },
            },
            ["short"] = "The current value of the counter",
          },
        },
        ["name"] = "create_or_update_counter",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/{namespace}/{key}",
                ["segments"] = {
                  {
                    ["var"] = "namespace",
                  },
                  {
                    ["var"] = "key",
                  },
                },
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["decrement_counter"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
          ["parts"] = {
            "namespace",
            "key",
          },
          ["sep"] = "/",
        },
        ["name"] = "decrement_counter",
        ["op"] = {
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/{namespace}/{key}",
                ["segments"] = {
                  {
                    ["var"] = "namespace",
                  },
                  {
                    ["var"] = "key",
                  },
                },
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_counter"] = {
        ["fields"] = {
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the counter was created",
            ["format"] = "date-time",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["title"] = "Key",
            ["type"] = "`$STRING`",
            ["short"] = "The key of the counter",
          },
          {
            ["name"] = "namespace",
            ["title"] = "Namespace",
            ["type"] = "`$STRING`",
            ["short"] = "The namespace of the counter",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the counter was last updated",
            ["format"] = "date-time",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$NUMBER`",
            ["short"] = "The current value of the counter",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["key"] = "key",
            ["namespace"] = "namespace",
          },
          ["name"] = "id",
          ["parts"] = {
            "namespace",
            "key",
          },
          ["sep"] = "/",
        },
        ["name"] = "get_counter",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{namespace}/{key}",
                ["segments"] = {
                  {
                    ["var"] = "namespace",
                  },
                  {
                    ["var"] = "key",
                  },
                },
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["increment_counter"] = {
        ["fields"] = {
          {
            ["name"] = "amount",
            ["title"] = "Amount",
            ["type"] = "`$NUMBER`",
            ["short"] = "The amount to increment the counter by",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the counter was created",
            ["format"] = "date-time",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["title"] = "Key",
            ["type"] = "`$STRING`",
            ["short"] = "The key of the counter",
          },
          {
            ["name"] = "namespace",
            ["title"] = "Namespace",
            ["type"] = "`$STRING`",
            ["short"] = "The namespace of the counter",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the counter was last updated",
            ["format"] = "date-time",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$NUMBER`",
            ["short"] = "The current value of the counter",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["key"] = "key",
            ["namespace"] = "namespace",
          },
          ["name"] = "id",
          ["parts"] = {
            "namespace",
            "key",
          },
          ["sep"] = "/",
        },
        ["name"] = "increment_counter",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/{namespace}/{key}",
                ["segments"] = {
                  {
                    ["var"] = "namespace",
                  },
                  {
                    ["var"] = "key",
                  },
                },
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
