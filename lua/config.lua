-- Letscount SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Letscount",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "namespace",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$NUMBER`",
              },
            },
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "create_or_update_counter",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/{namespace}/{key}",
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
        ["fields"] = {},
        ["name"] = "decrement_counter",
        ["op"] = {
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/{namespace}/{key}",
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "namespace",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "get_counter",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{namespace}/{key}",
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "created_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "namespace",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "increment_counter",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/{namespace}/{key}",
                ["parts"] = {
                  "{namespace}",
                  "{key}",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
