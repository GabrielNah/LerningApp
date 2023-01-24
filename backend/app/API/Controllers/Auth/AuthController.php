<?php

namespace App\API\Controllers\Auth;

use App\API\ApiController;
use App\API\Requests\LoginRequest;
use App\API\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends ApiController
{
    public function register(RegisterRequest $request)
    {
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
            ]);
        $token=$user->createToken('token-name')->plainTextToken;
        return $this->createdResponse([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    public function login(LoginRequest $request)
    {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            $user->tokens()->delete();
            $token=$user->createToken('token-name')->plainTextToken;
            return $this->successResponse(compact('token','user'),Response::HTTP_OK);
    }

    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();
            return $this->successResponse([]);
        }catch (\Throwable $e){
            return $this->errorResponse();
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

    public function additional()
    {
        return $this->successResponse(['additional'=>auth()->user()->additional]);
    }
}
