<?php
declare(strict_types=1);

// Letscount SDK utility: prepare_headers

class LetscountPrepareHeaders
{
    public static function call(LetscountContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
