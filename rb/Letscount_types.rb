# frozen_string_literal: true

# Typed models for the Letscount SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CreateOrUpdateCounter entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] namespace
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Float, nil]
CreateOrUpdateCounter = Struct.new(
  :created_at,
  :key,
  :namespace,
  :updated_at,
  :value,
  keyword_init: true
)

# Request payload for CreateOrUpdateCounter#create.
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] namespace
#   @return [String]
CreateOrUpdateCounterCreateData = Struct.new(
  :key,
  :namespace,
  keyword_init: true
)

# DecrementCounter entity data model.
class DecrementCounter
end

# Request payload for DecrementCounter#remove.
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] namespace
#   @return [String]
DecrementCounterRemoveMatch = Struct.new(
  :key,
  :namespace,
  keyword_init: true
)

# GetCounter entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] namespace
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Float, nil]
GetCounter = Struct.new(
  :created_at,
  :key,
  :namespace,
  :updated_at,
  :value,
  keyword_init: true
)

# Request payload for GetCounter#load.
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] namespace
#   @return [String]
GetCounterLoadMatch = Struct.new(
  :key,
  :namespace,
  keyword_init: true
)

# IncrementCounter entity data model.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] namespace
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Float, nil]
IncrementCounter = Struct.new(
  :amount,
  :created_at,
  :key,
  :namespace,
  :updated_at,
  :value,
  keyword_init: true
)

# Request payload for IncrementCounter#update.
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] namespace
#   @return [String]
IncrementCounterUpdateData = Struct.new(
  :key,
  :namespace,
  keyword_init: true
)

