<?php

use App\Http\Controllers\API\AuthenticatedSessionController;
use App\Http\Controllers\API\EmailVerificationController;
use App\Http\Controllers\API\MusicController;
use App\Http\Controllers\API\MusicGroupController;
use App\Http\Controllers\API\MusicGroupMemberController;
use App\Http\Controllers\API\MusicGroupMembershipRequestController;
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
        Route::get('/music/public', [MusicController::class, 'getFilteredPublicMusic']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/verify-email', [EmailVerificationController::class, 'verify'])
            ->middleware(['throttle:6,1']);
        Route::get('/email/verification-code', [EmailVerificationController::class, 'sendVerificationCode'])
            ->middleware(['throttle:6,1']);
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
        Route::post('/update-profile', [ProfileController::class, 'update']);
        Route::post('/change-password', [NewPasswordController::class, 'store']);
        Route::delete('/delete-user-account', [ProfileController::class, 'destroy']);
        // Routes to manage Music groups
        Route::post('/music-groups/create', [MusicGroupController::class, 'store']);
        // Route::get('/music-groups', [MusicGroupController::class, 'index']);
        Route::get('/music-groups', [MusicGroupController::class, 'getFilteredMusicGroups']);
        Route::get('/music-groups/my-music-groups', [MusicGroupController::class, 'getUserMusicGroups']);
        Route::get('/music-groups/{id}', [MusicGroupController::class, 'show']);
        Route::get('/music-groups/my-music-groups/{id}', [MusicGroupController::class, 'showMymusicGroup']);
        Route::put('/music-groups/my-music-groups/{id}/update', [MusicGroupController::class, 'update']);
        Route::delete('/music-groups/my-music-groups/{id}/delete', [MusicGroupController::class, 'destroy']);         
        Route::get('/music-groups/{id}/request-membership', [MusicGroupMembershipRequestController::class, 'store']);
        Route::get('/music-groups/my-music-groups/{id}/members/requests', [MusicGroupController::class, 'getFilteredMusicGroupMembershipRequests']);
        Route::post('/music-groups/my-music-groups/{group_id}/members/requests/{request_id}/reply', [MusicGroupMembershipRequestController::class, 'reply']);
        Route::get('/music-groups/my-music-groups/{id}/members', [MusicGroupController::class, 'getFilteredMusicGroupMembers']);
        Route::post('/music-groups/my-music-groups/{group_id}/members/{member_id}/actions', [MusicGroupMemberController::class, 'act']);
        // Routes to manage Music
        Route::post('/music/upload', [MusicController::class, 'store']);
        Route::get('/music/my-music/{id}', [MusicController::class, 'getMymusic']);
    });
});