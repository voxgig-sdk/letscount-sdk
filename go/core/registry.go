package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCreateOrUpdateCounterEntityFunc func(client *LetscountSDK, entopts map[string]any) LetscountEntity

var NewDecrementCounterEntityFunc func(client *LetscountSDK, entopts map[string]any) LetscountEntity

var NewGetCounterEntityFunc func(client *LetscountSDK, entopts map[string]any) LetscountEntity

var NewIncrementCounterEntityFunc func(client *LetscountSDK, entopts map[string]any) LetscountEntity

