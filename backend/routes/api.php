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
    Route::get('/additional',[App\API\Controllers\Auth\AuthController::class,'additional']);

    Route::group(['prefix'=>'user'],function (){
       Route::put('/profile',[\App\API\Controllers\UserController::class,'applyForChanges']);
    });

    Route::group(['prefix'=>'post'],function (){
       Route::get('',[\App\API\Controllers\PostController::class,'index']);
       Route::post('/post',[\App\API\Controllers\PostController::class,'store']);
       Route::get('/{id}',[\App\API\Controllers\PostController::class,'getPost']);
       Route::post('/{id}/comment',[\App\API\Controllers\PostController::class,'comment']);
    });
});
