<div class="box">
    <x-moonshine::form.textarea
        :attributes="$element->attributes()->merge([
        'name' => $element->name(),
        'data-type'=>'editor-js',
        'id' => $element->name(),
        'class' => 'hidden'
    ])->except('x-bind:id')"

    >{!! $element->value() ?? '' !!}</x-moonshine::form.textarea>
    <div id="editorjs"></div>
</div>
<script>
    const editorJsConf = @php echo json_encode(config('moonshine-editor-js')['toolSettings']) @endphp;
</script>
{{ Vite::useHotFile('vendor/moonshine-editorjs/moonshine-editorjs.hot')
        ->useBuildDirectory("vendor/moonshine-editorjs")
        ->withEntryPoints(['resources/css/field.css', 'resources/js/field.js']) }}
