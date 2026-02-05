<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Fields;

use MoonShine\UI\Fields\Textarea;

class EditorJs extends Textarea
{
    protected string $view = 'moonshine-editorjs::fields.editorJs';

    public function changePreview()
    {
        $this->view = 'moonshine-editorjs::fields.editorJsPreview';

        return $this;
    }
}
