<?php

use App\Http\Controllers\API\AuthenticatedSessionController;
use App\Http\Controllers\API\EmailVerificationController;
use App\Http\Controllers\API\UserRegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserRegistrationController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function (){
    Route::post('/verify-email', [EmailVerificationController::class, 'verify'])
        ->middleware(['throttle:6,1']);
    Route::get('/email/verification-code', [EmailVerificationController::class, 'sendVerificationCode'])
        ->middleware(['throttle:6,1']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);           
});