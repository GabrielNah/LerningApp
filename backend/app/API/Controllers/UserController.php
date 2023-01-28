<?php

namespace App\API\Controllers;

use App\API\ApiController;
use App\API\Requests\UpdateAdditionalDataRequest;
use App\Models\User;
use App\Models\UserAdditional;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends ApiController
{


    public function applyForChanges(UpdateAdditionalDataRequest $request)
    {
        if (empty($request->validated())){
            throw  ValidationException::withMessages([
                'fields'=>'At least one field should be present'
            ]);
        }
        $avatar='';
        if ($request->hasFile('avatar')){
            $avatar=Storage::disk('customers')->putFile('avatars'.auth()->id(),$request->file('avatar'));
        }
        $additional=UserAdditional::updateOrCreate(['user_id'=>auth()->id()],
            array_merge(array_filter($request->safe()->except(['avatar','name'])),['avatar'=>$avatar]));
        if ($request->has('name')){
            auth()->user()->update(['name'=>$request->get('name')]);
        }
        return $this->successResponse([
            'additional'=>array_merge($additional->toArray(),['name'=>$request->get('name')])
        ]);
    }

    public function additional()
    {
        return $this->successResponse(['additional'=>auth()->user()->additional]);
    }


    public function getUserDetails($id)
    {
        $user=User::with('additional')->find($id);
        return $this->successResponse(compact('user'));
    }

    public function getOthers()
    {
        $users=User::with('additional:id,user_id,avatar')->where('id','!=',auth()->id())->get(['id','name']);
        $friends=auth()->user()->friends()->pluck('friend_id');
        $sentFriendRequestsTo=auth()->user()->sentFriendRequests()->pluck('to')->unique()->values();
        return $this->successResponse(compact('users','friends','sentFriendRequestsTo'));
    }

}
