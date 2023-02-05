<?php

namespace App\Http\Controllers;

use App\API\ApiController;
use App\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends ApiController
{
    public function getUserProfile(User $user)
    {
       $user->load('additional');
       return $user;
    }
}
