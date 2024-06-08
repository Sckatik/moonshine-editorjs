<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Sckatik\MoonshineEditorJs\Http\Requests\LoadDataByLinkRequest;
use Sckatik\MoonshineEditorJs\Support\LoadDataByLink;

class EditorJsLinkController extends Controller
{
    /**
     * Determine microdata for the given file.
     */
    public function fetch(LoadDataByLinkRequest $request): JsonResponse
    {
        return LoadDataByLink::loadData($request->url);
    }
}
