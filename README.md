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

```
 php artisan vendor:publish --tag="moonshine-editorjs-views-render-blocks"
```

You can also connect the necessary components or your own in editorJs. To do this, publish views

```
 php artisan vendor:publish --tag="moonshine-editorjs-views-fields"
```

In the view editorJs.blade.php remove the line

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
