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
                "slug" => "letscount",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the counter was created',
              'format' => 'date-time',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
              'short' => 'The key of the counter',
            ],
            [
              'name' => 'namespace',
              'title' => 'Namespace',
              'type' => '`$STRING`',
              'short' => 'The namespace of the counter',
            ],
            [
              'name' => 'updated_at',
              'title' => 'Updated At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the counter was last updated',
              'format' => 'date-time',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$NUMBER`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$NUMBER`',
                ],
              ],
              'short' => 'The current value of the counter',
            ],
          ],
          'name' => 'create_or_update_counter',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/{namespace}/{key}',
                  'segments' => [
                    [
                      'var' => 'namespace',
                    ],
                    [
                      'var' => 'key',
                    ],
                  ],
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'key',
                        'orig' => 'key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
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
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
            'parts' => [
              'namespace',
              'key',
            ],
            'sep' => '/',
          ],
          'name' => 'decrement_counter',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/{namespace}/{key}',
                  'segments' => [
                    [
                      'var' => 'namespace',
                    ],
                    [
                      'var' => 'key',
                    ],
                  ],
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'key',
                        'orig' => 'key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
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
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the counter was created',
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
              'short' => 'The key of the counter',
            ],
            [
              'name' => 'namespace',
              'title' => 'Namespace',
              'type' => '`$STRING`',
              'short' => 'The namespace of the counter',
            ],
            [
              'name' => 'updated_at',
              'title' => 'Updated At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the counter was last updated',
              'format' => 'date-time',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$NUMBER`',
              'short' => 'The current value of the counter',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'key' => 'key',
              'namespace' => 'namespace',
            ],
            'name' => 'id',
            'parts' => [
              'namespace',
              'key',
            ],
            'sep' => '/',
          ],
          'name' => 'get_counter',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{namespace}/{key}',
                  'segments' => [
                    [
                      'var' => 'namespace',
                    ],
                    [
                      'var' => 'key',
                    ],
                  ],
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'key',
                        'orig' => 'key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
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
              'title' => 'Amount',
              'type' => '`$NUMBER`',
              'short' => 'The amount to increment the counter by',
            ],
            [
              'name' => 'created_at',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the counter was created',
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
              'short' => 'The key of the counter',
            ],
            [
              'name' => 'namespace',
              'title' => 'Namespace',
              'type' => '`$STRING`',
              'short' => 'The namespace of the counter',
            ],
            [
              'name' => 'updated_at',
              'title' => 'Updated At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the counter was last updated',
              'format' => 'date-time',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$NUMBER`',
              'short' => 'The current value of the counter',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'key' => 'key',
              'namespace' => 'namespace',
            ],
            'name' => 'id',
            'parts' => [
              'namespace',
              'key',
            ],
            'sep' => '/',
          ],
          'name' => 'increment_counter',
          'op' => [
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/{namespace}/{key}',
                  'segments' => [
                    [
                      'var' => 'namespace',
                    ],
                    [
                      'var' => 'key',
                    ],
                  ],
                  'parts' => [
                    '{namespace}',
                    '{key}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'key',
                        'orig' => 'key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'namespace',
                        'orig' => 'namespace',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'namespace',
                    ],
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
