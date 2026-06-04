# Letscount SDK

Track simple numeric counters by namespace and key, with create, get, increment, and decrement operations

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About LetsCount API

[LetsCount API](https://api.letscountapi.com) is a small, free-to-use service for tracking numeric counters. Each counter is identified by a `{namespace}/{key}` pair, so callers can group counters under their own namespace without coordinating with the API operator.

What you get from the API:

- Create or initialise a counter under a given namespace and key.
- Read the current value of a counter.
- Increment a counter (typically by one, or by a supplied amount).
- Decrement a counter in the same way.

Operational notes: the service is HTTP-based and returns JSON. There is no documented authentication step, so counters are effectively public to anyone who knows the namespace and key. No rate-limit policy is published, and CORS is reported as disabled on the community catalogue page, which may matter for in-browser usage.

## Try it

**TypeScript**
```bash
npm install letscount
```

**Python**
```bash
pip install letscount-sdk
```

**PHP**
```bash
composer require voxgig/letscount-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/letscount-sdk/go
```

**Ruby**
```bash
gem install letscount-sdk
```

**Lua**
```bash
luarocks install letscount-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { LetscountSDK } from 'letscount'

const client = new LetscountSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o letscount-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "letscount": {
      "command": "/abs/path/to/letscount-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **CreateOrUpdateCounter** | Creates a new counter or updates the value of an existing one under a given `{namespace}/{key}` pair. | `/{namespace}/{key}` |
| **DecrementCounter** | Decreases the value of the counter at `{namespace}/{key}`. | `/{namespace}/{key}` |
| **GetCounter** | Reads the current numeric value of a counter identified by its `{namespace}/{key}` pair. | `/{namespace}/{key}` |
| **IncrementCounter** | Increases the value of the counter at `{namespace}/{key}`. | `/{namespace}/{key}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from letscount_sdk import LetscountSDK

client = LetscountSDK({})

```

### PHP

```php
<?php
require_once 'letscount_sdk.php';

$client = new LetscountSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/letscount-sdk/go"

client := sdk.NewLetscountSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Letscount_sdk"

client = LetscountSDK.new({})

```

### Lua

```lua
local sdk = require("letscount_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = LetscountSDK.test()
const result = await client.CreateOrUpdateCounter().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = LetscountSDK.test(None, None)
result, err = client.CreateOrUpdateCounter(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = LetscountSDK::test(null, null);
[$result, $err] = $client->CreateOrUpdateCounter(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CreateOrUpdateCounter(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = LetscountSDK.test(nil, nil)
result, err = client.CreateOrUpdateCounter(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CreateOrUpdateCounter(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the LetsCount API

- Upstream: [https://api.letscountapi.com](https://api.letscountapi.com)

- The LetsCount API is offered free of charge.
- No explicit licence or terms-of-service text is published alongside the API.
- No authentication is required to use the service.
- Treat values as public: any client that knows the namespace and key can read or modify the counter.

---

Generated from the LetsCount API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
