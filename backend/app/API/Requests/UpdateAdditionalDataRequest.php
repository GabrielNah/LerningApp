<?php

namespace App\API\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdditionalDataRequest extends FormRequest
{
    protected $stopOnFirstFailure=true;

    public function rules()
    {
        return [
            'fb'=>'nullable|string|required_without_all:tw,ig,name,avatar',
            'tw'=>'nullable|string|required_without_all:fb,ig,name,avatar',
            'ig'=>'nullable|string|required_without_all:tw,fb,name,avatar',
            'name'=>'nullable|string|required_without_all:tw,ig,fb,avatar',
            'avatar'=>'nullable|image|required_without_all:tw,ig,fb,name',
        ];
    }

    public function messages()
    {
        return [
            'fb.required_without_all'=>'At least one should be present',
            'tw.required_without_all'=>'At least one should be present',
            'id.required_without_all'=>'At least one should be present',
            'name'=>'At least one should be present',
            'avatar'=>'At least one should be present'
        ];
    }
}
