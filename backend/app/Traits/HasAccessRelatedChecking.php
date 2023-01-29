<?php

namespace App\Traits;

use App\Models\Admin;
use App\Models\User;

trait HasAccessRelatedChecking
{
    public function canViewProfile(?int $user_id):bool
    {
        if ($this instanceof User){
            if ($user_id){
               return $this->friends()->pluck('friend_id')->contains($user_id);
            }
            return false;
        }
        if ($this instanceof Admin){
            return true;
        }
        return false;
    }


}
