@php
    $classes = '';
    if ($data['stretched']){
    $classes .= ' image--stretched';
    }
    if ($data['withBorder']){
    $classes .= ' image--bordered';
    }
    if ($data['withBackground']){
    $classes .= ' image--backgrounded';
    }
    //small image
    $thumbnail = '';
    if ($data['file']['thumbnails']){
        $thumbnail = $data['file']['thumbnails'][0];
    }
@endphp

<figure class="image {{ $classes }}">
    <img src="{{ $data['file']['url'] }}" alt="{{ $data['caption'] ?: '' }}">
    @if (!empty($data['caption']))
        <footer class="image-caption">
            {{ $data['caption'] }}
        </footer>
    @endif
</figure>
