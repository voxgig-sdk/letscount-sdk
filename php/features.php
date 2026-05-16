<?php
declare(strict_types=1);

// Letscount SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LetscountFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LetscountBaseFeature();
            case "test":
                return new LetscountTestFeature();
            default:
                return new LetscountBaseFeature();
        }
    }
}
