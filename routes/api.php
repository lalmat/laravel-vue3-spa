<?php

use App\Http\Controllers\Auth\CustomAuthController;
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


// API Auth
Route::post('/login',   [CustomAuthController::class, 'login']);
Route::get( '/user',    [CustomAuthController::class, 'user']);
Route::get( '/session', [CustomAuthController::class, 'session']);
Route::get( '/logout',  [CustomAuthController::class, 'logout']);
