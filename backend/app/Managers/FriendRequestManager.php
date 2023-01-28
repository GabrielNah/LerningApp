<?php

namespace App\Managers;

use App\Models\Friends;
use App\Models\Requests;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class FriendRequestManager
{
    public function sendFriendRequests(Authenticatable $user,int $friend_id)
    {
        return $user->sentFriendRequests()->create([
            'to'=>$friend_id,
            'state'=>Requests::SENT
        ]);
    }

    public function acceptFriendRequest(Authenticatable $user,int $friend_id)
    {
        $user->receivedFriendRequests()->firstWhere('from',$friend_id)->update(['state'=>Requests::ACCEPTED]);
        $data=[
            [
                'user_id'=>$user->id,
                'friend_id'=>$friend_id,
                'created_at'=>now()
            ],
            [
                'user_id'=>$friend_id,
                'friend_id'=>$user->id,
                'created_at'=>now()
            ]
        ];
        Friends::insert($data);
    }

    public function rejectFriendRequests(Authenticatable $user,int $friend_id)
    {
        $user->receivedFriendRequests()->firstWhere('from',$friend_id)->update(['state'=>Requests::REJECTED]);
    }

    public function getFriends(Authenticatable $user)
    {
        return $this->getFriendQuery($user)->get();
    }

    public function getFriendQuery(Authenticatable $user)
    {
        return $user->friends();
    }

    public function getSentFriendRequests(Authenticatable $user)
    {
        return $user->sentFriendRequests()->pluck('id');
    }

    public function removeFromFriend(Authenticatable $user,int $friend_id)
    {
        $user->friends()->detach($friend_id);
        User::find($friend_id)->friends()->detach($user->id);
    }

    public function getFriendRequestOfUser(Authenticatable $user)
    {
        $sent=$user->load('sentFriendRequests.receiver:id,name')?->sentFriendRequests??[];
        $received=$user->load('receivedFriendRequests.sender:id,name')?->receivedFriendRequests??[];
        return [$sent,$received];
    }
}
