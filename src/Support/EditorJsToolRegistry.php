<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Support;

use InvalidArgumentException;

/**
 * Public extension point of the Editor.js field.
 *
 * Allows external packages to register additional Editor.js tools
 * (frontend settings merged into the field config) and render blocks
 * of custom types with their own Blade views.
 */
final class EditorJsToolRegistry
{
    /** @var array<string, array{view: string, validation: array<string, mixed>}> */
    private array $blocks = [];

    /**
     * Merge tool settings into the field config, so they become
     * available to the frontend via the `editorJsConf` global.
     *
     * @param array<string, mixed> $settings
     */
    public function registerToolSettings(string $tool, array $settings): void
    {
        $key = "moonshine-editor-js.toolSettings.{$tool}";

        $current = (array) config($key, []);

        config()->set($key, array_merge($current, $settings));
    }

    /**
     * Register a renderable block type with its own Blade view
     * and validation config for the server-side Editor.js parser.
     *
     * @param array<string, mixed> $validationConfig
     *
     * @throws InvalidArgumentException when the type is already registered
     */
    public function registerBlock(string $type, string $view, array $validationConfig = []): void
    {
        if (isset($this->blocks[$type])) {
            throw new InvalidArgumentException(
                "Editor.js block type [{$type}] is already registered."
            );
        }

        $this->blocks[$type] = [
            'view' => $view,
            'validation' => $validationConfig,
        ];
    }

    /**
     * Resolve the Blade view registered for a block type.
     */
    public function getBlockView(string $type): ?string
    {
        return $this->blocks[$type]['view'] ?? null;
    }

    /**
     * Whether a block type is registered in this registry.
     */
    public function hasBlock(string $type): bool
    {
        return isset($this->blocks[$type]);
    }

    /**
     * Registered block types.
     *
     * @return list<string>
     */
    public function registeredBlocks(): array
    {
        return array_keys($this->blocks);
    }

    /**
     * Validation config of registered blocks in the shape of
     * `moonshine-editor-js.renderSettings.tools`, merged by the renderer
     * on top of the package config.
     *
     * @return array{tools?: array<string, array<string, mixed>>}
     */
    public function getRenderSettings(): array
    {
        $tools = [];

        foreach ($this->blocks as $type => $block) {
            if ($block['validation'] !== []) {
                $tools[$type] = $block['validation'];
            }
        }

        if ($tools === []) {
            return [];
        }

        return ['tools' => $tools];
    }
}
