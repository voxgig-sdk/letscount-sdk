package = "voxgig-sdk-letscount"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/letscount-sdk.git"
}
description = {
  summary = "Letscount SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["letscount_sdk"] = "letscount_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
