<?php
declare(strict_types=1);

// Letscount SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LetscountMakeContext
{
    public static function call(array $ctxmap, ?LetscountContext $basectx): LetscountContext
    {
        return new LetscountContext($ctxmap, $basectx);
    }
}
