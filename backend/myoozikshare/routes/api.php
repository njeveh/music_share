<?php

use App\Http\Controllers\API\AuthenticatedSessionController;
use App\Http\Controllers\API\EmailVerificationController;
use App\Http\Controllers\API\MusicGroupController;
use App\Http\Controllers\API\NewPasswordController;
use App\Http\Controllers\API\PasswordResetController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\UserRegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware(['ensure_json_response'])->group(function (){
    Route::middleware('guest')->group( function () {
        Route::post('/register', [UserRegistrationController::class, 'store']);
        Route::post('/login', [AuthenticatedSessionController::class, 'store']);
        Route::post('/forgot-password', [PasswordResetController::class, 'getPasswordResetCode']);
        Route::post('/reset-password', [PasswordResetController::class, 'store']);
    });

    Route::middleware(['auth:sanctum'])->group(function (){
        Route::post('/verify-email', [EmailVerificationController::class, 'verify'])
            ->middleware(['throttle:6,1']);
        Route::get('/email/verification-code', [EmailVerificationController::class, 'sendVerificationCode'])
            ->middleware(['throttle:6,1']);
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
        Route::post('/update-profile', [ProfileController::class, 'update']);
        Route::post('/change-password', [NewPasswordController::class, 'store']);
        Route::post('/delete-user-account', [ProfileController::class, 'destroy']);
        // Routes to manage Music groups
        Route::post('/music-groups/create', [MusicGroupController::class, 'store']);
        Route::get('/music-groups', [MusicGroupController::class, 'index']);
        Route::get('/music-groups/my-music-groups', [MusicGroupController::class, 'getUserMusicGroups']);
        Route::get('/music-groups/{id}', [MusicGroupController::class, 'show']);
    });
});