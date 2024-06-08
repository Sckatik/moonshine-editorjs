<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Support;

use finfo;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Exceptions\CouldNotLoadImage;
use Spatie\Image\Exceptions\InvalidManipulation;
use Spatie\Image\Image;

final class LoadImage
{
    private const VALID_IMAGE_MIMES = [
        'image/jpeg',
        'image/webp',
        'image/gif',
        'image/png',
        'image/svg+xml',
    ];

    /**
     * @throws CouldNotLoadImage
     */
    public static function uploadByFile(UploadedFile $file): JsonResponse
    {
        $path = $file->store(
            config('moonshine-editor-js.toolSettings.image.path'),
            config('moonshine-editor-js.toolSettings.image.disk')
        );
        if (config('moonshine-editor-js.toolSettings.image.disk') !== 'local') {
            $tempPath = $file->store(
                config('moonshine-editor-js.toolSettings.image.path'),
                'local'
            );

            self::applyAlterations(Storage::disk('local')->path($tempPath));
            $thumbnails = self::applyThumbnails($tempPath);

            self::deleteFiles(true, Storage::disk('local')->path($tempPath));
            Storage::disk('local')->delete($tempPath);
        } else {
            self::applyAlterations(Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->path($path));
            $thumbnails = self::applyThumbnails($path);
        }

        return response()->json([
            'success' => 1,
            'file' => [
                'url' => Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->url($path),
                'thumbnails' => $thumbnails,
            ],
        ]);
    }

    public static function uploadByUrl($url): JsonResponse
    {
        try {
            $response = Http::connectTimeout(3)->get($url)->throw();
        } catch (ConnectionException|RequestException) {
            return response()->json([
                'success' => 0,
            ]);
        }

        // Validate mime type
        $mime = (new finfo())->buffer($response->body(), FILEINFO_MIME_TYPE);
        if (!in_array($mime, self::VALID_IMAGE_MIMES, true)) {
            return response()->json([
                'success' => 0,
            ]);
        }

        $urlBasename = basename(parse_url(url($url), PHP_URL_PATH));
        $nameWithPath = config('moonshine-editor-js.toolSettings.image.path') . '/' . uniqid() . $urlBasename;
        Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->put($nameWithPath, $response->body());

        return response()->json([
            'success' => 1,
            'file' => [
                'url' => Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->url($nameWithPath),
            ],
        ]);
    }

    public static function deleteImages($path): JsonResponse
    {
        if (File::exists(public_path($path))) {
            self::deleteFiles(true, public_path($path));
            self::deleteFiles(false, public_path($path));
            return response()->json(['message' => 'Картинка успешно удалена!']);
        }
        return response()->json(['message' => 'Такой картинки нет. Уже удалена.'], 500);
    }

    /**
     * @param $path
     * @param array $alterations
     * @throws CouldNotLoadImage
     */
    private static function applyAlterations($path, array $alterations = []): void
    {
        try {
            $image = Image::load($path);

            $imageSettings = config('moonshine-editor-js.toolSettings.image.alterations');

            if (!empty($alterations)) {
                $imageSettings = $alterations;
            }

            if (empty($imageSettings)) {
                return;
            }

            if (!empty($imageSettings['resize']['width'])) {
                $image->width($imageSettings['resize']['width']);
            }

            if (!empty($imageSettings['resize']['height'])) {
                $image->height($imageSettings['resize']['height']);
            }

            if (!empty($imageSettings['optimize'])) {
                $image->optimize();
            }

            if (!empty($imageSettings['adjustments']['brightness'])) {
                $image->brightness($imageSettings['adjustments']['brightness']);
            }

            if (!empty($imageSettings['adjustments']['contrast'])) {
                $image->contrast($imageSettings['adjustments']['contrast']);
            }

            if (!empty($imageSettings['adjustments']['gamma'])) {
                $image->gamma($imageSettings['adjustments']['gamma']);
            }

            if (!empty($imageSettings['effects']['blur'])) {
                $image->blur($imageSettings['effects']['blur']);
            }

            if (!empty($imageSettings['effects']['pixelate'])) {
                $image->pixelate($imageSettings['effects']['pixelate']);
            }

            if (!empty($imageSettings['effects']['greyscale'])) {
                $image->greyscale();
            }
            if (!empty($imageSettings['effects']['sepia'])) {
                $image->sepia();
            }

            if (!empty($imageSettings['effects']['sharpen'])) {
                $image->sharpen($imageSettings['effects']['sharpen']);
            }

            $image->save();
        } catch (InvalidManipulation $exception) {
            report($exception);
        }
    }


    /**
     * @param $path
     * @return array
     * @throws CouldNotLoadImage
     */
    private static function applyThumbnails($path): array
    {
        $thumbnailSettings = config('moonshine-editor-js.toolSettings.image.thumbnails');

        $generatedThumbnails = [];

        if (!empty($thumbnailSettings)) {
            foreach ($thumbnailSettings as $thumbnailName => $setting) {
                $filename = pathinfo($path, PATHINFO_FILENAME);
                $extension = pathinfo($path, PATHINFO_EXTENSION);

                $newThumbnailName = $filename . $thumbnailName . '.' . $extension;
                $newThumbnailPath = config('moonshine-editor-js.toolSettings.image.path') . '/' . $newThumbnailName;

                Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->copy($path, $newThumbnailPath);

                if (config('moonshine-editor-js.toolSettings.image.disk') !== 'local') {
                    Storage::disk('local')->copy($path, $newThumbnailPath);
                    $newPath = Storage::disk('local')->path($newThumbnailPath);
                } else {
                    $newPath = Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->path(
                        $newThumbnailPath
                    );
                }

                self::applyAlterations($newPath, $setting);

                $generatedThumbnails[] = Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->url(
                    $newThumbnailPath
                );
            }
        }

        return $generatedThumbnails;
    }


    private static function deleteFiles(bool $thumbnail, string $path): void
    {
        if ($thumbnail) {
            $thumbnailSettings = config('moonshine-editor-js.toolSettings.image.thumbnails');

            if (!empty($thumbnailSettings)) {
                foreach ($thumbnailSettings as $thumbnailName => $setting) {
                    $filename = pathinfo($path, PATHINFO_FILENAME);
                    $extension = pathinfo($path, PATHINFO_EXTENSION);

                    $newThumbnailName = $filename . $thumbnailName . '.' . $extension;
                    $newThumbnailPath = config('moonshine-editor-js.toolSettings.image.path') . '/' . $newThumbnailName;
                    Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->delete(
                        $path,
                        $newThumbnailPath
                    );
                }
            }
        } else {
            Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->delete(public_path($path));

            $filename = pathinfo($path, PATHINFO_FILENAME);
            $extension = pathinfo($path, PATHINFO_EXTENSION);

            $newNameFile = $filename . '.' . $extension;
            $newPath = config('moonshine-editor-js.toolSettings.image.path') . '/' . $newNameFile;
            Storage::disk(config('moonshine-editor-js.toolSettings.image.disk'))->delete($path, $newPath);
        }
    }

}
