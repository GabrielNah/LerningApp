<?php

namespace App\API\Controllers;

use App\API\ApiController;
use App\API\Requests\UpdateAdditionalDataRequest;

class UserController  extends ApiController
{
    public function applyForChanges(UpdateAdditionalDataRequest $request)
    {
        return $request->validated();
    }
}
