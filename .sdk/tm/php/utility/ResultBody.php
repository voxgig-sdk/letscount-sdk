<?php
declare(strict_types=1);

// Letscount SDK utility: result_body

class LetscountResultBody
{
    public static function call(LetscountContext $ctx): ?LetscountResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
