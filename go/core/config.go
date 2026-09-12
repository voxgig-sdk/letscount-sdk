package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Letscount",
			"slug": "letscount",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.letscountapi.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"create_or_update_counter": map[string]any{},
				"decrement_counter": map[string]any{},
				"get_counter": map[string]any{},
				"increment_counter": map[string]any{},
			},
		},
		"entity": map[string]any{
			"create_or_update_counter": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"short": "Timestamp when the counter was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"short": "The key of the counter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "namespace",
						"short": "The namespace of the counter",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"short": "Timestamp when the counter was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$NUMBER`",
							},
						},
						"short": "The current value of the counter",
						"type": "`$NUMBER`",
					},
				},
				"name": "create_or_update_counter",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "namespace",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{namespace}/{key}",
								"segments": []any{
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "key",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{namespace}",
									"{key}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"decrement_counter": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"namespace",
						"key",
					},
					"sep": "/",
				},
				"name": "decrement_counter",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "namespace",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/{namespace}/{key}",
								"segments": []any{
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "key",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{namespace}",
									"{key}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_counter": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"short": "Timestamp when the counter was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"short": "The key of the counter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "namespace",
						"short": "The namespace of the counter",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"short": "Timestamp when the counter was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "The current value of the counter",
						"type": "`$NUMBER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"key": "key",
						"namespace": "namespace",
					},
					"name": "id",
					"parts": []any{
						"namespace",
						"key",
					},
					"sep": "/",
				},
				"name": "get_counter",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "namespace",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{namespace}/{key}",
								"segments": []any{
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "key",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{namespace}",
									"{key}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"increment_counter": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"short": "The amount to increment the counter by",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"short": "Timestamp when the counter was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"short": "The key of the counter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "namespace",
						"short": "The namespace of the counter",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"short": "Timestamp when the counter was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "The current value of the counter",
						"type": "`$NUMBER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"key": "key",
						"namespace": "namespace",
					},
					"name": "id",
					"parts": []any{
						"namespace",
						"key",
					},
					"sep": "/",
				},
				"name": "increment_counter",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "namespace",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/{namespace}/{key}",
								"segments": []any{
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "key",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{namespace}",
									"{key}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
