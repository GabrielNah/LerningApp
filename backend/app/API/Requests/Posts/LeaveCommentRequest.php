<?php

namespace App\API\Requests\Posts;

use Illuminate\Foundation\Http\FormRequest;

class LeaveCommentRequest extends FormRequest
{

    public function rules()
    {
        return [
            'comment'=>'required|string'
        ];
    }
}
