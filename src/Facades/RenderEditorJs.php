<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Facades;

use Illuminate\Support\Facades\Facade;

final class RenderEditorJs extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'moonshine-editorjs';
    }
}
