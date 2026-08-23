# Letscount Ruby SDK



The Ruby SDK for the Letscount API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CreateOrUpdateCounter` — with named operations (`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/letscount-sdk/releases](https://github.com/voxgig-sdk/letscount-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Letscount_sdk"

client = LetscountSDK.new
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created CreateOrUpdateCounter record.
created = client.CreateOrUpdateCounter.create({ "key" => "example_key", "namespace" => "example_namespace" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  getcounter = client.GetCounter.load({ "key" => "example", "namespace" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = LetscountSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
getcounter = client.GetCounter.load({ "key" => "example", "namespace" => "example" })
puts getcounter
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LetscountSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LETSCOUNT_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LetscountSDK

```ruby
require_relative "Letscount_sdk"
client = LetscountSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LetscountSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LetscountSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `CreateOrUpdateCounter` | `(data) -> CreateOrUpdateCounterEntity` | Create a CreateOrUpdateCounter entity instance. |
| `DecrementCounter` | `(data) -> DecrementCounterEntity` | Create a DecrementCounter entity instance. |
| `GetCounter` | `(data) -> GetCounterEntity` | Create a GetCounter entity instance. |
| `IncrementCounter` | `(data) -> IncrementCounterEntity` | Create an IncrementCounter entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LetscountError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `create_or_update_counter = client.CreateOrUpdateCounter`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` | Timestamp when the counter was created |
| `key` | `String` | The key of the counter |
| `namespace` | `String` | The namespace of the counter |
| `updated_at` | `String` | Timestamp when the counter was last updated |
| `value` | `Float` | The current value of the counter |

#### Example: Create

```ruby
create_or_update_counter = client.CreateOrUpdateCounter.create({
  "key" => "example_key", # String
  "namespace" => "example_namespace", # String
})
```


### DecrementCounter

Create an instance: `decrement_counter = client.DecrementCounter`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### GetCounter

Create an instance: `get_counter = client.GetCounter`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` | Timestamp when the counter was created |
| `key` | `String` | The key of the counter |
| `namespace` | `String` | The namespace of the counter |
| `updated_at` | `String` | Timestamp when the counter was last updated |
| `value` | `Float` | The current value of the counter |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GetCounter record (raises on error).
get_counter = client.GetCounter.load({ "key" => "key", "namespace" => "namespace" })
```


### IncrementCounter

Create an instance: `increment_counter = client.IncrementCounter`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` | The amount to increment the counter by |
| `created_at` | `String` | Timestamp when the counter was created |
| `key` | `String` | The key of the counter |
| `namespace` | `String` | The namespace of the counter |
| `updated_at` | `String` | Timestamp when the counter was last updated |
| `value` | `Float` | The current value of the counter |


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Letscount_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Letscount_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
getcounter = client.GetCounter
getcounter.load({ "key" => "example", "namespace" => "example" })

# getcounter.data_get now returns the getcounter data from the last load
# getcounter.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
