<?php
declare(strict_types=1);

// Letscount SDK utility: feature_add

class LetscountFeatureAdd
{
    public static function call(LetscountContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
