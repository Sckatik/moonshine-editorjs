<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Sckatik\MoonshineEditorJs\Http\Requests\DeleteImageRequest;
use Sckatik\MoonshineEditorJs\Http\Requests\UploadImageByFileRequest;
use Sckatik\MoonshineEditorJs\Http\Requests\UploadImageByUrlRequest;
use Sckatik\MoonshineEditorJs\Support\LoadImage;
use Spatie\Image\Exceptions\CouldNotLoadImage;

class EditorJsImageController extends Controller
{

    /**
     * request надо свой нормально
     * Upload file.
     * @throws CouldNotLoadImage
     */
    public function file(UploadImageByFileRequest $request): JsonResponse
    {
        return LoadImage::uploadByFile($request->file('image'));
    }

    /**
     * "Upload" a URL.
     */
    public function url(UploadImageByUrlRequest $request): JsonResponse
    {
        return LoadImage::uploadByUrl($request->url);
    }

    public function deleteByFile(DeleteImageRequest $request)
    {
        return LoadImage::deleteImages($request->urlFile);
    }


}
