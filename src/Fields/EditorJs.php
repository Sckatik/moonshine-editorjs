<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Fields;

use MoonShine\AssetManager\Css;
use MoonShine\AssetManager\InlineJs;
use MoonShine\AssetManager\Js;
use MoonShine\UI\Fields\Textarea;

class EditorJs extends Textarea
{
    protected string $view = 'moonshine-editorjs::fields.editorJs';

    public function previewMode(): static
    {
        $this->view = 'moonshine-editorjs::fields.editorJsPreview';

        return $this;
    }

    protected function assets(): array
    {
        $manifestPath = public_path('vendor/moonshine-editorjs/manifest.json');

        if (!file_exists($manifestPath)) {
            return [];
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);

        $assets = [];

        $assets[] = InlineJs::make(
            'window.editorJsConf = window.editorJsConf || ' . json_encode(config('moonshine-editor-js.toolSettings', [])) . ';'
        );

        if (isset($manifest['resources/css/field.css']['file'])) {
            $assets[] = Css::make('/vendor/moonshine-editorjs/' . $manifest['resources/css/field.css']['file']);
        }

        if (isset($manifest['resources/js/field.js']['file'])) {
            $assets[] = Js::make('/vendor/moonshine-editorjs/' . $manifest['resources/js/field.js']['file']);
        }

        return $assets;
    }
}
