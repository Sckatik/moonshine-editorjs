<?php

declare(strict_types=1);

namespace Sckatik\MoonshineEditorJs\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

final class UploadImageByFileRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,webp,svg+xml',
        ];
    }

    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json(['success' => 0], 422));
    }

}
