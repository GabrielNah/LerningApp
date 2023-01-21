<?php

namespace App\API\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function rules()
    {
        return [
            'name'=>'required|string',
            'email'=>'required|unique:users,email',
            'password'=>'required|string|confirmed',
            'password_confirmation'=>'required|string',
        ];
    }
}
