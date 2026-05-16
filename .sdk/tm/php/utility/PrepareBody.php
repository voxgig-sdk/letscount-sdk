<?php
declare(strict_types=1);

// Letscount SDK utility: prepare_body

class LetscountPrepareBody
{
    public static function call(LetscountContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
