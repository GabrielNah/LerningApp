<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('login',[\App\Http\Controllers\Auth\AuthController::class,'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[\App\Http\Controllers\Auth\AuthController::class,'logout']);
    Route::post('me',[\App\Http\Controllers\Auth\AuthController::class,'user']);
    Route::group(['prefix'=>'admin'],function (){
        Route::get('users',[\App\Http\Controllers\Auth\AuthController::class,'getUsers']);

        Route::group(['prefix'=>'users'],function (){
              Route::get('{user}',[\App\Http\Controllers\UserProfileController::class,'getUserProfile']);
        });
    });
});

Route::get('/{any?}', function () {
    return view('admin');
})->where('any', '.*');;
