<?php
declare(strict_types=1);

// Letscount SDK exists test

require_once __DIR__ . '/../letscount_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LetscountSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
