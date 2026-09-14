<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs;

use EditorJS\EditorJS;
use EditorJS\EditorJSException;
use Exception;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;
use Sckatik\MoonshineEditorJs\Support\EditorJsToolRegistry;

final class RenderEditorJs
{

    /**
     * Render blocks
     *
     * @param string $data
     * @return string
     * @throws Exception
     */
    public function render(string $data): string
    {
        try {
            $registry = app(EditorJsToolRegistry::class);

            $renderSettings = array_merge_recursive(
                (array) config('moonshine-editor-js.renderSettings', []),
                $registry->getRenderSettings(),
            );

            $configJson = json_encode($renderSettings ?: []);

            $editor = new EditorJS($data, $configJson);

            $renderedBlocks = [];
            foreach ($editor->getBlocks() as $block) {
                $registeredView = $registry->getBlockView($block['type']);

                $viewName = $registeredView
                    ?? "moonshine-editorjs::blocks." . Str::snake($block['type'], '-');

                if (!View::exists($viewName)) {
                    $viewName = 'moonshine-editorjs::blocks.not-found';
                }

                $renderedBlocks[] = View::make($viewName, [
                    'type' => $block['type'],
                    'data' => $block['data']
                ])->render();
            }

            return implode($renderedBlocks);
        } catch (EditorJSException $e) {
            throw new Exception($e->getMessage());
        }
    }

}
