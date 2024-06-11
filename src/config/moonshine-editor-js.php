<?php

declare(strict_types=1);

return [

    /**
     * Configure tools
     */
    'toolSettings' => [
        'header' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+H',
        ],
        'list' => [
            'activated' => true,
            'inlineToolbar' => true,
            'shortcut' => 'CMD+SHIFT+L',
        ],
        'quote' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+W',
        ],
        'code' => [
            'activated' => true,
            'placeholder' => '',
            'shortcut' => 'CMD+SHIFT+C',
        ],
        'link' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+S',
        ],
        'image' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+I',
            'path' => 'public/images',
            'disk' => 'local',
            'alterations' => [
                'resize' => [
                    'width' => false, // integer
                    'height' => false, // integer
                ],
                'optimize' => true, // true or false
                'adjustments' => [
                    'brightness' => false, // -100 to 100
                    'contrast' => false, // -100 to 100
                    'gamma' => false, // 0.1 to 9.99
                ],
                'effects' => [
                    'blur' => false, // 0 to 100
                    'pixelate' => false, // 0 to 100
                    'greyscale' => false, // true or false
                    'sepia' => false, // true or false
                    'sharpen' => false, // 0 to 100
                ],
            ],
            'thumbnails' => [
                // Specify as many thumbnails as required. Key is used as the name.
                '_small' => [
                    'resize' => [
                        'width' => 250, // integer
                        'height' => 250, // integer
                    ],
                    'optimize' => true, // true or false
                    'adjustments' => [
                        'brightness' => false, // -100 to 100
                        'contrast' => false, // -100 to 100
                        'gamma' => false, // 0.1 to 9.99
                    ],
                    'effects' => [
                        'blur' => false, // 0 to 100
                        'pixelate' => false, // 0 to 100
                        'greyscale' => false, // true or false
                        'sepia' => false, // true or false
                        'sharpen' => false, // 0 to 100
                    ],
                ],
            ],
        ],
        'inlineCode' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+A',
        ],
        'checklist' => [
            'activated' => true,
            'inlineToolbar' => true,
            'shortcut' => 'CMD+SHIFT+J',
        ],
        'marker' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+M',
        ],
        'delimiter' => [
            'activated' => true,
        ],
        'table' => [
            'activated' => true,
            'inlineToolbar' => true,
        ],
        'raw' => [
            'activated' => true
        ],
        'vkVideo' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+P',
        ],
        'youtube' => [
            'activated' => true,
            'shortcut' => 'CMD+SHIFT+N',
        ]
    ],
    'renderSettings' => [
        'tools' => [
            'paragraph' => [
                'text' => [
                    'type' => 'string',
                    'allowedTags' => 'i,b,a[href],code[class],mark[class]',
                ],
            ],
            'header' => [
                'text' => [
                    'type' => 'string',
                    'allowedTags' => 'a[href],mark[class]',
                ],
                'level' => [1, 2, 3, 4, 5, 6],
            ],
            'list' => [
                'style' => [
                    0 => 'ordered',
                    1 => 'unordered',
                ],
                'items' => [
                    'type' => 'array',
                    'data' => [
                        '-' => [
                            'type' => 'string',
                            'allowedTags' => 'i,b,a[href],code[class],mark[class]',
                        ],
                    ],
                ],
            ],
            'linkTool' => [
                'link' => 'string',
                'meta' => [
                    'type' => 'array',
                    'data' => [
                        'title' => [
                            'type' => 'string',
                        ],
                        'description' => [
                            'type' => 'string',
                            'required' => false
                        ],
                        'imageUrl' => [
                            'type' => 'string',
                            'required' => false,
                        ],
                        'domain' => [
                            'type' => 'string',
                            'required' => false,
                        ],
                        'image' => [
                            'type' => 'array',
                            'required' => false,
                            'data' => [
                                'url' => [
                                    'type' => 'string',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            'image' => [
                'file' => [
                    'type' => 'array',
                    'data' => [
                        'width' => [
                            'type' => 'integer',
                            'required' => false,
                        ],
                        'height' => [
                            'type' => 'integer',
                            'required' => false,
                        ],
                        'url' => 'string',
                        'thumbnails' => [
                            'type' => 'array',
                            'required' => false,
                            'data' => [
                                '-' => [
                                    'type' => 'string',
                                ],
                            ],
                        ],

                    ],
                ],
                'caption' => [
                    'type' => 'string',
                    'allowedTags' => 'i,b,a[href],code[class],mark[class]',
                ],
                'withBorder' => 'boolean',
                'withBackground' => 'boolean',
                'stretched' => 'boolean',
            ],
            'table' => [
                'withHeadings' => 'boolean',
                'content' => [
                    'type' => 'array',
                    'data' => [
                        '-' => [
                            'type' => 'array',
                            'data' => [
                                '-' => [
                                    'type' => 'string',
                                    'allowedTags' => 'i,b,a[href],code[class],mark[class]',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            'quote' => [
                'text' => [
                    'type' => 'string',
                    'allowedTags' => 'i,b,a[href],code[class],mark[class]',
                ],
                'caption' => [
                    'type' => 'string',
                    'allowedTags' => 'i,b,a[href],code[class],mark[class]',
                ],
                'alignment' => [
                    0 => 'left',
                    1 => 'center',
                ],
            ],
            'code' => [
                'code' => [
                    'type' => 'string',
                    'allowedTags' => '*',
                ],
            ],
            'delimiter' => [],
            'raw' => [
                'html' => [
                    'type' => 'string',
                    'allowedTags' => '*',
                ],
            ],
            'youtube' => [
                'service' => [
                    'type' => 'string'
                ],
                'source' => [
                    'type' => 'string'
                ],
                'embed' => [
                    'type' => 'string'
                ],
                'width' => [
                    'type' => 'integer'
                ],
                'height' => [
                    'type' => 'integer'
                ],
                'caption' => [
                    'type' => 'string'
                ]
            ],
            'vkVideo' => [
                'url' => [
                    'type' => 'string',
                    'allowedTags' => '*',
                ],
            ]
            // 'attaches'  => [
            //     'file'  => [
            //         'type' => 'array',
            //         'data' => [
            //             'url'       => 'string',
            //             'size'      => 'integer',
            //             'name'      => 'string',
            //             'extension' => 'string',
            //         ],
            //     ],
            //     'title' => 'string',
            // ]
        ],
    ]
];
