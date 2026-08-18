<?php
declare(strict_types=1);

// Letscount SDK configuration

class LetscountConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Letscount",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.letscountapi.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "create_or_update_counter" => [],
                    "decrement_counter" => [],
                    "get_counter" => [],
                    "increment_counter" => [],
                ],
            ],
            "entity" => [
        'create_or_update_counter' => [
          'fields' => [
            [
              'name' => 'created_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'namespace',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$NUMBER`',
                ],
              ],
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'create_or_update_counter',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/{namespace}/{key}',
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'decrement_counter' => [
          'fields' => [],
          'name' => 'decrement_counter',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/{namespace}/{key}',
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_counter' => [
          'fields' => [
            [
              'name' => 'created_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'namespace',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'get_counter',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{namespace}/{key}',
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'increment_counter' => [
          'fields' => [
            [
              'name' => 'amount',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'created_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'namespace',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'increment_counter',
          'op' => [
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/{namespace}/{key}',
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LetscountFeatures::make_feature($name);
    }
}
