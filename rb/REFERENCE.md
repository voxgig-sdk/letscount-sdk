# Letscount Ruby SDK Reference

Complete API reference for the Letscount Ruby SDK.


## LetscountSDK

### Constructor

```ruby
require_relative 'letscount_sdk'

client = LetscountSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LetscountSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LetscountSDK.test
```


### Instance Methods

#### `CreateOrUpdateCounter(data = nil)`

Create a new `CreateOrUpdateCounter` entity instance. Pass `nil` for no initial data.

#### `DecrementCounter(data = nil)`

Create a new `DecrementCounter` entity instance. Pass `nil` for no initial data.

#### `GetCounter(data = nil)`

Create a new `GetCounter` entity instance. Pass `nil` for no initial data.

#### `IncrementCounter(data = nil)`

Create a new `IncrementCounter` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## CreateOrUpdateCounterEntity

```ruby
create_or_update_counter = client.CreateOrUpdateCounter
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `namespace` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `value` | ``$NUMBER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `key` | - | - | - | - | - |
| `namespace` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `value` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.CreateOrUpdateCounter.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreateOrUpdateCounterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DecrementCounterEntity

```ruby
decrement_counter = client.DecrementCounter
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.DecrementCounter.remove({ "id" => "decrement_counter_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DecrementCounterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetCounterEntity

```ruby
get_counter = client.GetCounter
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `namespace` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `value` | ``$NUMBER`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GetCounter.load({ "id" => "get_counter_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetCounterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IncrementCounterEntity

```ruby
increment_counter = client.IncrementCounter
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | ``$NUMBER`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `namespace` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `value` | ``$NUMBER`` | No |  |

### Operations

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.IncrementCounter.update({
  "id" => "increment_counter_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IncrementCounterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LetscountSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

