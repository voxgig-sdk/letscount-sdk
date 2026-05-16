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
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## CreateOrUpdateCounterEntity

```php
$create_or_update_counter = $client->CreateOrUpdateCounter();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->CreateOrUpdateCounter()->create([
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CreateOrUpdateCounterEntity`

Create a new `CreateOrUpdateCounterEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DecrementCounterEntity

```php
$decrement_counter = $client->DecrementCounter();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->DecrementCounter()->remove(["id" => "decrement_counter_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DecrementCounterEntity`

Create a new `DecrementCounterEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetCounterEntity

```php
$get_counter = $client->GetCounter();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GetCounter()->load(["id" => "get_counter_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetCounterEntity`

Create a new `GetCounterEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IncrementCounterEntity

```php
$increment_counter = $client->IncrementCounter();
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

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->IncrementCounter()->update([
  "id" => "increment_counter_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IncrementCounterEntity`

Create a new `IncrementCounterEntity` instance with the same client and
options.

#### `getName(): string`

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

