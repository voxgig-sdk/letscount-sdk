# Letscount TypeScript SDK Reference

Complete API reference for the Letscount TypeScript SDK.


## LetscountSDK

### Constructor

```ts
new LetscountSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LetscountSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LetscountSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LetscountSDK` instance in test mode.


### Instance Methods

#### `CreateOrUpdateCounter(data?: object)`

Create a new `CreateOrUpdateCounter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateOrUpdateCounterEntity` instance.

#### `DecrementCounter(data?: object)`

Create a new `DecrementCounter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DecrementCounterEntity` instance.

#### `GetCounter(data?: object)`

Create a new `GetCounter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetCounterEntity` instance.

#### `IncrementCounter(data?: object)`

Create a new `IncrementCounter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IncrementCounterEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LetscountSDK.test()`.

**Returns:** `LetscountSDK` instance in test mode.


---

## CreateOrUpdateCounterEntity

```ts
const create_or_update_counter = client.CreateOrUpdateCounter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp when the counter was created |
| `key` | `string` | No | The key of the counter |
| `namespace` | `string` | No | The namespace of the counter |
| `updated_at` | `string` | No | Timestamp when the counter was last updated |
| `value` | `number` | No | The current value of the counter |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `created_at` | - |
| `key` | - |
| `namespace` | - |
| `updated_at` | - |
| `value` | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CreateOrUpdateCounter().create({
  key: 'example_key',
  namespace: 'example_namespace',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateOrUpdateCounterEntity` instance with the same client and
options.

#### `client()`

Return the parent `LetscountSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DecrementCounterEntity

```ts
const decrement_counter = client.DecrementCounter()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.DecrementCounter().remove({ key: 'key', namespace: 'namespace' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DecrementCounterEntity` instance with the same client and
options.

#### `client()`

Return the parent `LetscountSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetCounterEntity

```ts
const get_counter = client.GetCounter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp when the counter was created |
| `key` | `string` | No | The key of the counter |
| `namespace` | `string` | No | The namespace of the counter |
| `updated_at` | `string` | No | Timestamp when the counter was last updated |
| `value` | `number` | No | The current value of the counter |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetCounter().load({ key: 'key', namespace: 'namespace' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetCounterEntity` instance with the same client and
options.

#### `client()`

Return the parent `LetscountSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IncrementCounterEntity

```ts
const increment_counter = client.IncrementCounter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | The amount to increment the counter by |
| `created_at` | `string` | No | Timestamp when the counter was created |
| `key` | `string` | No | The key of the counter |
| `namespace` | `string` | No | The namespace of the counter |
| `updated_at` | `string` | No | Timestamp when the counter was last updated |
| `value` | `number` | No | The current value of the counter |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.IncrementCounter().update({
  key: 'key',
  namespace: 'namespace',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IncrementCounterEntity` instance with the same client and
options.

#### `client()`

Return the parent `LetscountSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LetscountSDK({
  feature: {
    test: { active: true },
  }
})
```

