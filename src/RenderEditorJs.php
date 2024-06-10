<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs;

use EditorJS\EditorJS;
use EditorJS\EditorJSException;
use Exception;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;

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
            $configJson = json_encode(config('moonshine-editor-js.renderSettings') ?: []);

            $editor = new EditorJS($data, $configJson);

            $renderedBlocks = [];
            foreach ($editor->getBlocks() as $block) {
                $viewName = "moonshine-editorjs::blocks." . Str::snake($block['type'], '-');

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
