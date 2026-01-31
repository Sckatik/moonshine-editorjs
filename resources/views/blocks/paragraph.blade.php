{{-- example style for tag p --}}
{{-- <style>--}}
{{--    .ce-paragraph[data-indent="1"] {--}}
{{--        margin-left:1em;--}}
{{--    }--}}
{{--    .ce-paragraph[data-indent="2"] {--}}
{{--        margin-left:2em;--}}
{{--    }--}}
{{--    .ce-paragraph[data-indent="3"] { margin-left:3em; }--}}
{{--    .ce-paragraph[data-indent="4"] { margin-left:4em; }--}}
{{--    .ce-paragraph[data-indent="5"] { margin-left:5em; }--}}

{{--    .ce-paragraph[data-alinea="1"] { text-indent: 1em; }--}}
{{--    .ce-paragraph[data-alinea="2"] { text-indent: 2em; }--}}
{{--    .ce-paragraph[data-alinea="3"] { text-indent: 3em; }--}}
{{--    .ce-paragraph[data-alinea="4"] { text-indent: 4em; }--}}
{{--    .ce-paragraph[data-alinea="5"] { text-indent: 5em; }--}}
{{--</style>--}}

@php
    $class = '';

   $indent = isset($data['shift']['indent']) && $data['shift']['indent']>0 ? 'data-indent='.$data['shift']['indent'] : 'data-indent=0';
   $alinea = isset($data['shift']['alinea']) && $data['shift']['alinea']>0 ? 'data-alinea='.$data['shift']['alinea'] : 'data-alinea=0';

    if('center' === $data['alignment']) {
        $class = 'text-center';
    } elseif('left' === $data['alignment']) {
        $class = 'text-left';
    } else {
        $class = 'text-right';
    }
@endphp

<p class="ce-paragraph {{ $class }}" {{$indent}} {{$alinea}}>{!! $data['text']  !!} </p>