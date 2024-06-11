<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Support;

use DOMDocument;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

final class LoadDataByLink
{

    public static function loadData($url): JsonResponse
    {
        // Contents
        try {
            $response = Http::get($url)->throw();
        } catch (RequestException) {
            return response()->json([
                'success' => 0,
            ]);
        }

        $doc = new DOMDocument();
        @$doc->loadHTML((string)$response->getBody());
        $nodes = $doc->getElementsByTagName('title');
        $title = $nodes->item(0)->nodeValue;
        $description = '';
        $imageUrl = null;

        $metas = $doc->getElementsByTagName('meta');

        for ($i = 0; $i < $metas->length; $i++) {
            $meta = $metas->item($i);
            if ($meta->getAttribute('name') == 'description') {
                $description = $meta->getAttribute('content');
            }

            if ($meta->getAttribute('property') == 'og:image') {
                $imageUrl = $meta->getAttribute('content');
            }
        }

        return response()->json([
            'success' => 1,
            'meta' => array_filter([
                'title' => $title ?? $url,
                'description' => $description,
                'imageUrl' => $imageUrl,
            ]),
        ]);
    }

}
