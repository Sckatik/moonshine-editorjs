<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Sckatik\MoonshineEditorJs\Http\Controllers\EditorJsImageController;
use Sckatik\MoonshineEditorJs\Http\Controllers\EditorJsLinkController;

Route::post('upload/file', EditorJsImageController::class . '@file')->name('editor-js-upload-image-by-file');
Route::post('upload/url', EditorJsImageController::class . '@url')->name('editor-js-upload-image-by-url');
Route::get('fetch/url', EditorJsLinkController::class . '@fetch')->name('editor-js-fetch-url');
Route::delete('delete/file', [EditorJsImageController::class, 'deleteByFile'])
    ->name('editor-js-delete-image');
