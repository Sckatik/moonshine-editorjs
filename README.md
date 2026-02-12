## EditorJs block editor for MoonShine

## Demo

You can can play with the demo [here](https://editorjs.io/)

## Installation

Install via composer:

```
 composer require sckatik/moonshine-editorjs
```

Publish the config file

```
 php artisan vendor:publish --tag="moonshine-editorjs-config"
```

Publish assets be sure to publish without them the editor will not work

```
 php artisan vendor:publish --tag="moonshine-editorjs-assets"
```

Optionally, you can publish the views if you want to change the appearance of the fields that are output from the
editorJs
In views blocks

```
 php artisan vendor:publish --tag="moonshine-editorjs"
```

You can also connect the necessary components or your own in editorJs.

In the view fields/editorJs.blade.php remove the line

```
{{ Vite::useHotFile('vendor/moonshine-editorjs/moonshine-editorjs.hot')
->useBuildDirectory("vendor/moonshine-editorjs")
->withEntryPoints(['resources/css/field.css', 'resources/js/field.js']) }}
```

and connect your js with a set of its components EditorJs

## Config

You can disable or enable the necessary blocks in the editor.
In config/moonshine-editor-js.php in the configuration block - toolSettings

In config/moonshine-editor-js.php in the configuration block - renderSettings You can customize the rendering rules from
EditorJs data

## Usage

Add a field to the database with the text type
To output data from EditorJs, use the following methods:

```php
use App\Models\Post;
use Sckatik\MoonshineEditorJs\Facades\RenderEditorJs;
$post = Post::find(1);
echo RenderEditorJs::render($post->body);
```

Defining An Accessor

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Sckatik\MoonshineEditorJs\Facades\RenderEditorJs;

class Post extends Model
{
    public function getBodyAttribute()
    {
        return RenderEditorJs::render($this->attributes['body']);
    }
}

$post = Post::find(1);
echo $post->body;
```

## Display on the detail page in the MoonShine admin panel.

To display EditorJs on the resource detail page, you need to:
In the resource’s DetailPage, call EditorJs with the previewMode() function.

https://getmoonshine.app/en/docs/4.x/model-resource/pages#detail-page

Example:

```php

    use Sckatik\MoonshineEditorJs\Fields\EditorJs;
    
    protected function fields(): iterable
    {
        return [
            ID::make(),
            Text::make("Название", "name"),
            EditorJs::make('EditorJS', 'content')->previewMode()
        ];
    }
```

## Upload Image
The Spatie/Image package is used to upload images.
you need to install the extension in php - https://www.php.net/manual/en/book.image.php

## For Laravel 11 and 12+
Сhange the path for uploading images from disk=>local to public in the moonshine-editor-js config in the toolSettings.image.disk block if you have a standard configuration filesystems.php not unfaithful. 
If there are any changes, then it's up to you.

## Сustomization adding your own component

To add your component, you need the following:

1. Publish assets with the command -
```
   php artisan vendor:publish --tag="moonshine-editorjs-assets"
```
2. In the file - /resources/views/vendor/moonshine-editorjs/fields/editorJs.blade.php there is an example of creating your own component
   , you must either uncomment it or change it for yourself. You can also use the vite and create your own class, and
   you also need to connect your own js and css. But you need to keep in mind that connecting your component takes place in this way.
```
    editorJsConf.custom = {
        customImage: {
            class: SimpleImage,
            inlineToolbar: true
        }
   };
```
Using the js css connection method is at the discretion of the developer

3. You also need to add a blade file to /resources/views/vendor/moonshine-editorjs/blocks with data processing from your component
   for output to the frontend or via the api.


