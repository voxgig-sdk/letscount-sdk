-- Typed models for the Letscount SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CreateOrUpdateCounter
---@field created_at? string
---@field key? string
---@field namespace? string
---@field updated_at? string
---@field value? number

---@class CreateOrUpdateCounterCreateData
---@field key string
---@field namespace string
---@field created_at? string
---@field updated_at? string
---@field value? number

---@class DecrementCounter

---@class DecrementCounterRemoveMatch
---@field key string
---@field namespace string

---@class GetCounter
---@field created_at? string
---@field key? string
---@field namespace? string
---@field updated_at? string
---@field value? number

---@class GetCounterLoadMatch
---@field key string
---@field namespace string

---@class IncrementCounter
---@field amount? number
---@field created_at? string
---@field key? string
---@field namespace? string
---@field updated_at? string
---@field value? number

---@class IncrementCounterUpdateData
---@field key string
---@field namespace string
---@field amount? number
---@field created_at? string
---@field updated_at? string
---@field value? number

local M = {}

return M
