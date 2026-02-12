{!! Sckatik\MoonshineEditorJs\Facades\RenderEditorJs::render($value) ?? ''  !!}

{{ Vite::useHotFile('vendor/moonshine-editorjs/moonshine-editorjs.hot')
        ->useBuildDirectory("vendor/moonshine-editorjs")
        ->withEntryPoints(['resources/css/field.css', 'resources/js/field.js']) }}