import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [

        laravel({
            hotFile: 'public/vendor/moonshine-editorjs/moonshine-editorjs.hot', // Most important lines
            buildDirectory: 'vendor/moonshine-editorjs', // Most important lines
            input: ['resources/css/field.css', 'resources/js/field.js'],
            refresh: true,
        }),
    ],
});
