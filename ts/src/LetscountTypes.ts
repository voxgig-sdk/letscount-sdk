// Typed models for the Letscount SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CreateOrUpdateCounter {
  created_at?: string
  key?: string
  namespace?: string
  updated_at?: string
  value?: number
}

export interface CreateOrUpdateCounterCreateData {
  key: string
  namespace: string
  created_at?: string
  updated_at?: string
  value?: number
}

export interface DecrementCounter {
}

export interface DecrementCounterRemoveMatch {
  key: string
  namespace: string
}

export interface GetCounter {
  created_at?: string
  key?: string
  namespace?: string
  updated_at?: string
  value?: number
}

export interface GetCounterLoadMatch {
  key: string
  namespace: string
}

export interface IncrementCounter {
  amount?: number
  created_at?: string
  key?: string
  namespace?: string
  updated_at?: string
  value?: number
}

export interface IncrementCounterUpdateData {
  key: string
  namespace: string
  amount?: number
  created_at?: string
  updated_at?: string
  value?: number
}

