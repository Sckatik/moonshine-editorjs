<a class="embed-link" href="{{ $data['link'] }}" target="_blank" rel="nofollow">
    @php
        $metaImageUrl = $data['meta']['imageUrl'] ?? ''
    @endphp
    @if ($metaImageUrl)
        <img class="embed-link__image" src="{{ $metaImageUrl }}">
    @endif

    <div class="embed-link__title">
        {{ $data['meta']['title'] }}
    </div>

    @if(isset($data['meta']['description']))
        <div class="embed-link__description">
            {{ $data['meta']['description'] }}
        </div>
    @endif

    <span class="embed-link__domain">
        {{ parse_url($data['link'], PHP_URL_HOST)}}
    </span>
</a>
