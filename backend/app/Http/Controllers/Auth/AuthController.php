<?php

namespace App\Http\Controllers\Auth;

use App\API\ApiController;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use App\Models\Permissions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends ApiController
{
    public function login(LoginRequest $request)
    {
        try {
            $user = Admin::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            $user->tokens()->delete();
            $abilities=Permissions::query()->pluck('name')->all();
            $token=$user->createToken('token-name',$abilities)->plainTextToken;
            return $this->successResponse(compact('token','abilities'),Response::HTTP_OK);
        }catch (\Throwable $e){
            throw new \Exception($e->getMessage());
        }

    }


    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();
            return $this->successResponse([]);
        }catch (\Throwable $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function user(Request $request)
    {
        try {
            if ($request->user()){
                return $this->successResponse(['user'=>$request->user()]);
            }

        }catch (\Throwable $e){
            return $this->errorResponse([]);
        }
    }


    public function getUsers()
    {
        $this->authorize('view-all-users');
        $users=User::withCount(['posts','friends'])->get();
        return $this->successResponse(compact('users'));
    }
}
