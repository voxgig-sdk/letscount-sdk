# Letscount PHP SDK



The PHP SDK for the Letscount API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->CreateOrUpdateCounter()` — with named operations (`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/letscount-sdk/releases](https://github.com/voxgig-sdk/letscount-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'letscount_sdk.php';

$client = new LetscountSDK();
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created CreateOrUpdateCounter record.
$created = $client->CreateOrUpdateCounter()->create(["key" => "example_key", "namespace" => "example_namespace"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $getcounter = $client->GetCounter()->load(["key" => "example", "namespace" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = LetscountSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$getcounter = $client->GetCounter()->load(["key" => "example", "namespace" => "example"]);
print_r($getcounter);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LetscountSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LETSCOUNT_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LetscountSDK

```php
require_once 'letscount_sdk.php';
$client = new LetscountSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LetscountSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LetscountSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `CreateOrUpdateCounter` | `($data): CreateOrUpdateCounterEntity` | Create a CreateOrUpdateCounter entity instance. |
| `DecrementCounter` | `($data): DecrementCounterEntity` | Create a DecrementCounter entity instance. |
| `GetCounter` | `($data): GetCounterEntity` | Create a GetCounter entity instance. |
| `IncrementCounter` | `($data): IncrementCounterEntity` | Create an IncrementCounter entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### CreateOrUpdateCounter

| Field | Description |
| --- | --- |
| `created_at` | Timestamp when the counter was created |
| `key` | The key of the counter |
| `namespace` | The namespace of the counter |
| `updated_at` | Timestamp when the counter was last updated |
| `value` | The current value of the counter |

Operations: Create.

API path: `/{namespace}/{key}`

#### DecrementCounter

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/{namespace}/{key}`

#### GetCounter

| Field | Description |
| --- | --- |
| `created_at` | Timestamp when the counter was created |
| `key` | The key of the counter |
| `namespace` | The namespace of the counter |
| `updated_at` | Timestamp when the counter was last updated |
| `value` | The current value of the counter |

Operations: Load.

API path: `/{namespace}/{key}`

#### IncrementCounter

| Field | Description |
| --- | --- |
| `amount` | The amount to increment the counter by |
| `created_at` | Timestamp when the counter was created |
| `key` | The key of the counter |
| `namespace` | The namespace of the counter |
| `updated_at` | Timestamp when the counter was last updated |
| `value` | The current value of the counter |

Operations: Update.

API path: `/{namespace}/{key}`



## Entities


### CreateOrUpdateCounter

Create an instance: `$create_or_update_counter = $client->CreateOrUpdateCounter();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Timestamp when the counter was created |
| `key` | `string` | The key of the counter |
| `namespace` | `string` | The namespace of the counter |
| `updated_at` | `string` | Timestamp when the counter was last updated |
| `value` | `float` | The current value of the counter |

#### Example: Create

```php
$create_or_update_counter = $client->CreateOrUpdateCounter()->create([
    "key" => null, // string
    "namespace" => null, // string
]);
```


### DecrementCounter

Create an instance: `$decrement_counter = $client->DecrementCounter();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### GetCounter

Create an instance: `$get_counter = $client->GetCounter();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Timestamp when the counter was created |
| `key` | `string` | The key of the counter |
| `namespace` | `string` | The namespace of the counter |
| `updated_at` | `string` | Timestamp when the counter was last updated |
| `value` | `float` | The current value of the counter |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GetCounter record (throws on error).
$get_counter = $client->GetCounter()->load(["key" => "key", "namespace" => "namespace"]);
```


### IncrementCounter

Create an instance: `$increment_counter = $client->IncrementCounter();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | The amount to increment the counter by |
| `created_at` | `string` | Timestamp when the counter was created |
| `key` | `string` | The key of the counter |
| `namespace` | `string` | The namespace of the counter |
| `updated_at` | `string` | Timestamp when the counter was last updated |
| `value` | `float` | The current value of the counter |


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── letscount_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`letscount_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$getcounter = $client->GetCounter();
$getcounter->load(["key" => "example", "namespace" => "example"]);

// $getcounter->data_get() now returns the getcounter data from the last load
// $getcounter->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
