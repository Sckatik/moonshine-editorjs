<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Sckatik\MoonshineEditorJs\RenderEditorJs;

final class MoonshineEditorJsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //

        $this->app->singleton('moonshine-editorjs', static function () {
            return new RenderEditorJs();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->booted(function () {
            $this->routes();
        });

        $this->publishes([
            __DIR__ . '/../config/moonshine-editor-js.php' => base_path('config/moonshine-editor-js.php'),
        ], 'moonshine-editorjs-config');

        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'moonshine-editor-js-views');

        $this->publishes([
            __DIR__ . '/../../public/vendor' => public_path('vendor/moonshine-editorjs'),
        ], 'moonshine-editorjs-assets');

        $this->publishes([
            __DIR__ . '/../../resources/views/blocks' => $this->app->resourcePath(
                'views/vendor/moonshine-editorjs/blocks'
            ),
        ], 'moonshine-editorjs-views-render-blocks');

        $this->publishes([
            __DIR__ . '/../../resources/views/fields' => $this->app->resourcePath(
                'views/vendor/moonshine-editorjs/fields'
            ),
        ], 'moonshine-editorjs-views-fields');
        //
    }


    /**
     * Register the fields's routes.
     * @return void
     */
    protected function routes(): void
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::prefix('moonshine/editor-js-field')
            ->group(__DIR__ . '/../../routes/api.php');
    }

}
