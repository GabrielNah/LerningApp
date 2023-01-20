<?php

namespace App\Http\Controllers\Auth;

use App\API\ApiController;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use App\Models\Permissions;
use http\Exception\RuntimeException;
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
            throw new RuntimeException($e->getMessage());
        }

    }


    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();
            return $this->successResponse([]);
        }catch (\Throwable $e){
            throw new RuntimeException($e->getMessage());
        }
    }
}
