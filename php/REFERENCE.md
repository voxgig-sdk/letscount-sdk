# Letscount PHP SDK Reference

Complete API reference for the Letscount PHP SDK.


## LetscountSDK

### Constructor

```php
require_once __DIR__ . '/letscount_sdk.php';

$client = new LetscountSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LetscountSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LetscountSDK::test();
```


### Instance Methods

#### `CreateOrUpdateCounter($data = null)`

Create a new `CreateOrUpdateCounterEntity` instance. Pass `null` for no initial data.

#### `DecrementCounter($data = null)`

Create a new `DecrementCounterEntity` instance. Pass `null` for no initial data.

#### `GetCounter($data = null)`

Create a new `GetCounterEntity` instance. Pass `null` for no initial data.

#### `IncrementCounter($data = null)`

Create a new `IncrementCounterEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LetscountUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CreateOrUpdateCounterEntity

```php
$create_or_update_counter = $client->CreateOrUpdateCounter();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp when the counter was created |
| `key` | `string` | No | The key of the counter |
| `namespace` | `string` | No | The namespace of the counter |
| `updated_at` | `string` | No | Timestamp when the counter was last updated |
| `value` | `float` | No | The current value of the counter |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `created_at` | - |
| `key` | - |
| `namespace` | - |
| `updated_at` | - |
| `value` | Yes |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CreateOrUpdateCounter()->create([
  "key" => null, // string
  "namespace" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreateOrUpdateCounterEntity`

Create a new `CreateOrUpdateCounterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DecrementCounterEntity

```php
$decrement_counter = $client->DecrementCounter();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->DecrementCounter()->remove(["key" => "key", "namespace" => "namespace"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DecrementCounterEntity`

Create a new `DecrementCounterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetCounterEntity

```php
$get_counter = $client->GetCounter();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp when the counter was created |
| `key` | `string` | No | The key of the counter |
| `namespace` | `string` | No | The namespace of the counter |
| `updated_at` | `string` | No | Timestamp when the counter was last updated |
| `value` | `float` | No | The current value of the counter |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetCounter()->load(["key" => "key", "namespace" => "namespace"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetCounterEntity`

Create a new `GetCounterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IncrementCounterEntity

```php
$increment_counter = $client->IncrementCounter();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | The amount to increment the counter by |
| `created_at` | `string` | No | Timestamp when the counter was created |
| `key` | `string` | No | The key of the counter |
| `namespace` | `string` | No | The namespace of the counter |
| `updated_at` | `string` | No | Timestamp when the counter was last updated |
| `value` | `float` | No | The current value of the counter |

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->IncrementCounter()->update([
  "key" => "key",
  "namespace" => "namespace",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IncrementCounterEntity`

Create a new `IncrementCounterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LetscountSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

