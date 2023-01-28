<?php

namespace App\API\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdditionalDataRequest extends FormRequest
{
    protected $stopOnFirstFailure=true;

    public function rules()
    {
        return [
            'fb'=>['nullable','string'],
            'tw'=>['nullable','string'],
            'ig'=>['nullable','string'],
            'name'=>['nullable','string'],
            'avatar'=>['nullable','image'],
        ];
    }

}
