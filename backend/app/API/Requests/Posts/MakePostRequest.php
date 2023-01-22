<?php

namespace App\API\Requests\Posts;

use Illuminate\Foundation\Http\FormRequest;

class MakePostRequest extends FormRequest
{

    public function rules()
    {
        return [
            'post'=>'required|string',
            'title'=>'required|string',
            'image' => 'required|image'
        ];
    }
}
