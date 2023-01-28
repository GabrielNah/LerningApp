<?php

namespace App\API\Controllers;

use App\API\ApiController;
use App\Managers\FriendRequestManager;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class FriendController  extends ApiController
{
    private FriendRequestManager $friendManager;

    public function __construct(FriendRequestManager $friendRequestManager)
    {
        $this->friendManager=$friendRequestManager;
    }


    public function sendFriendRequest($id)
    {
        $this->friendManager->sendFriendRequests(auth()->user(),$id);
        return $this->createdResponse([]);
    }

    public function removeFromFriends($id)
    {
        try {
            $this->friendManager->removeFromFriend(auth()->user(),$id);
            return  $this->deletedResponse();
        }catch (\Throwable $e){
            Log::warning($e);
            return $this->errorResponse(['msg'=>'Something went wrong']);
        }
    }
    public function getFriendRequests()
    {
        [$sent,$received]=$this->friendManager->getFriendRequestOfUser(auth()->user());
        return $this->successResponse(['requests'=>[...$sent,...$received]]);
    }
}
