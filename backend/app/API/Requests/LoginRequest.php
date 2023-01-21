<?php

namespace App\API\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email'=>'required|string|exists:users,email',
            'password'=>'required|string',
        ];
    }
}
