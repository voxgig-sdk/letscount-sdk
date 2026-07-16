<?php
declare(strict_types=1);

// Letscount SDK base feature

class LetscountBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LetscountContext $ctx, array $options): void {}
    public function PostConstruct(LetscountContext $ctx): void {}
    public function PostConstructEntity(LetscountContext $ctx): void {}
    public function SetData(LetscountContext $ctx): void {}
    public function GetData(LetscountContext $ctx): void {}
    public function GetMatch(LetscountContext $ctx): void {}
    public function SetMatch(LetscountContext $ctx): void {}
    public function PrePoint(LetscountContext $ctx): void {}
    public function PreSpec(LetscountContext $ctx): void {}
    public function PreRequest(LetscountContext $ctx): void {}
    public function PreResponse(LetscountContext $ctx): void {}
    public function PreResult(LetscountContext $ctx): void {}
    public function PreDone(LetscountContext $ctx): void {}
    public function PreUnexpected(LetscountContext $ctx): void {}
}
