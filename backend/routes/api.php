<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
    Public Routes
 **/
    Route::post('/register',[App\API\Controllers\Auth\AuthController::class,'register']);
    Route::post('/login',[App\API\Controllers\Auth\AuthController::class,'login']);

/**
    Protected Routes
 **/
Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout',[App\API\Controllers\Auth\AuthController::class,'logout']);
    Route::post('/me',[App\API\Controllers\Auth\AuthController::class,'user']);

    Route::group(['prefix'=>'user'],function (){
        Route::get('/additional',[App\API\Controllers\UserController::class,'additional']);
        Route::put('/profile',[\App\API\Controllers\UserController::class,'applyForChanges']);
        Route::get('/others',[\App\API\Controllers\UserController::class,'getOthers']);
        Route::get('/other/{id}',[\App\API\Controllers\UserController::class,'getUserDetails']);
    });

    Route::group(['prefix'=>'requests'],function (){
            Route::get('',[\App\API\Controllers\FriendController::class,'getFriendRequests']);
            Route::post('/{id}',[\App\API\Controllers\FriendController::class,'sendFriendRequest']);
            Route::delete('/{id}',[\App\API\Controllers\FriendController::class,'removeFromFriends']);
            Route::put('/reject/{id}',[\App\API\Controllers\FriendController::class,'rejectRequest']);
            Route::delete('/cancel/{id}',[\App\API\Controllers\FriendController::class,'cancelSentRequest']);
            Route::patch('/resend/{id}',[\App\API\Controllers\FriendController::class,'resendRequest']);
            Route::patch('/accept/{friend_id}',[\App\API\Controllers\FriendController::class,'acceptRequest']);
    });

    Route::group(['prefix'=>'post'],function (){
       Route::get('',[\App\API\Controllers\PostController::class,'index']);
       Route::post('/post',[\App\API\Controllers\PostController::class,'store']);
       Route::get('/{id}',[\App\API\Controllers\PostController::class,'getPost']);
       Route::post('/{id}/comment',[\App\API\Controllers\PostController::class,'comment']);
    });
});
