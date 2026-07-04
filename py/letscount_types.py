# Typed models for the Letscount SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CreateOrUpdateCounter:
    created_at: Optional[str] = None
    key: Optional[str] = None
    namespace: Optional[str] = None
    updated_at: Optional[str] = None
    value: Optional[float] = None


@dataclass
class CreateOrUpdateCounterCreateData:
    key: str
    namespace: str


@dataclass
class DecrementCounter:
    pass


@dataclass
class DecrementCounterRemoveMatch:
    key: str
    namespace: str


@dataclass
class GetCounter:
    created_at: Optional[str] = None
    key: Optional[str] = None
    namespace: Optional[str] = None
    updated_at: Optional[str] = None
    value: Optional[float] = None


@dataclass
class GetCounterLoadMatch:
    key: str
    namespace: str


@dataclass
class IncrementCounter:
    amount: Optional[float] = None
    created_at: Optional[str] = None
    key: Optional[str] = None
    namespace: Optional[str] = None
    updated_at: Optional[str] = None
    value: Optional[float] = None


@dataclass
class IncrementCounterUpdateData:
    key: str
    namespace: str

