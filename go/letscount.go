package voxgigletscountsdk

import (
	"github.com/voxgig-sdk/letscount-sdk/go/core"
	"github.com/voxgig-sdk/letscount-sdk/go/entity"
	"github.com/voxgig-sdk/letscount-sdk/go/feature"
	_ "github.com/voxgig-sdk/letscount-sdk/go/utility"
)

// Type aliases preserve external API.
type LetscountSDK = core.LetscountSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LetscountEntity = core.LetscountEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LetscountError = core.LetscountError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCreateOrUpdateCounterEntityFunc = func(client *core.LetscountSDK, entopts map[string]any) core.LetscountEntity {
		return entity.NewCreateOrUpdateCounterEntity(client, entopts)
	}
	core.NewDecrementCounterEntityFunc = func(client *core.LetscountSDK, entopts map[string]any) core.LetscountEntity {
		return entity.NewDecrementCounterEntity(client, entopts)
	}
	core.NewGetCounterEntityFunc = func(client *core.LetscountSDK, entopts map[string]any) core.LetscountEntity {
		return entity.NewGetCounterEntity(client, entopts)
	}
	core.NewIncrementCounterEntityFunc = func(client *core.LetscountSDK, entopts map[string]any) core.LetscountEntity {
		return entity.NewIncrementCounterEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLetscountSDK = core.NewLetscountSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLetscountSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LetscountSDK  { return NewLetscountSDK(nil) }
func Test() *LetscountSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
