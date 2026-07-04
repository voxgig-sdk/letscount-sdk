// Typed models for the Letscount SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CreateOrUpdateCounter is the typed data model for the create_or_update_counter entity.
type CreateOrUpdateCounter struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Key *string `json:"key,omitempty"`
	Namespace *string `json:"namespace,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Value *float64 `json:"value,omitempty"`
}

// CreateOrUpdateCounterCreateData is the typed request payload for CreateOrUpdateCounter.CreateTyped.
type CreateOrUpdateCounterCreateData struct {
	Key string `json:"key"`
	Namespace string `json:"namespace"`
}

// DecrementCounter is the typed data model for the decrement_counter entity.
type DecrementCounter struct {
}

// DecrementCounterRemoveMatch is the typed request payload for DecrementCounter.RemoveTyped.
type DecrementCounterRemoveMatch struct {
	Key string `json:"key"`
	Namespace string `json:"namespace"`
}

// GetCounter is the typed data model for the get_counter entity.
type GetCounter struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Key *string `json:"key,omitempty"`
	Namespace *string `json:"namespace,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Value *float64 `json:"value,omitempty"`
}

// GetCounterLoadMatch is the typed request payload for GetCounter.LoadTyped.
type GetCounterLoadMatch struct {
	Key string `json:"key"`
	Namespace string `json:"namespace"`
}

// IncrementCounter is the typed data model for the increment_counter entity.
type IncrementCounter struct {
	Amount *float64 `json:"amount,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Key *string `json:"key,omitempty"`
	Namespace *string `json:"namespace,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Value *float64 `json:"value,omitempty"`
}

// IncrementCounterUpdateData is the typed request payload for IncrementCounter.UpdateTyped.
type IncrementCounterUpdateData struct {
	Key string `json:"key"`
	Namespace string `json:"namespace"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
