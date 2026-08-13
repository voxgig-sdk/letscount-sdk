<?php
declare(strict_types=1);

// Typed models for the Letscount SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CreateOrUpdateCounter entity data model. */
class CreateOrUpdateCounter
{
    public ?string $created_at = null;
    public ?string $key = null;
    public ?string $namespace = null;
    public ?string $updated_at = null;
    public ?float $value = null;
}

/** Request payload for CreateOrUpdateCounter#create. */
class CreateOrUpdateCounterCreateData
{
    public string $key;
    public string $namespace;
    public ?string $created_at = null;
    public ?string $updated_at = null;
    public ?float $value = null;
}

/** DecrementCounter entity data model. */
class DecrementCounter
{
}

/** Request payload for DecrementCounter#remove. */
class DecrementCounterRemoveMatch
{
    public string $key;
    public string $namespace;
}

/** GetCounter entity data model. */
class GetCounter
{
    public ?string $created_at = null;
    public ?string $key = null;
    public ?string $namespace = null;
    public ?string $updated_at = null;
    public ?float $value = null;
}

/** Request payload for GetCounter#load. */
class GetCounterLoadMatch
{
    public string $key;
    public string $namespace;
}

/** IncrementCounter entity data model. */
class IncrementCounter
{
    public ?float $amount = null;
    public ?string $created_at = null;
    public ?string $key = null;
    public ?string $namespace = null;
    public ?string $updated_at = null;
    public ?float $value = null;
}

/** Request payload for IncrementCounter#update. */
class IncrementCounterUpdateData
{
    public string $key;
    public string $namespace;
    public ?float $amount = null;
    public ?string $created_at = null;
    public ?string $updated_at = null;
    public ?float $value = null;
}

