<?php

namespace App\Http\Controllers\API;

use App\Models\VerificationCode;
use App\Notifications\EmailVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class EmailVerificationController extends BaseController
{
    public function sendVerificationCode(Request $request) {
        $user = $request->user();
        if ($user->hasVerifiedEmail()) {
            $message = 'email address is already verified';
            return $this->respondWithErrorMessage($message, BaseApiCodes::EX_HTTP_EXCEPTION(), 400);
        }
        VerificationCode::create(
            [
                'user_id' => $user->id,
                'code' => random_int(1001, 9999),
                'type' => 'email'
            ]
        );

        $user->notify(new EmailVerification($user));;

        return $this->respondWithMessage('email address verification code sent successfully');
    }

    public function verify(Request $request) {
        $user = $request->user();
        // Log::info($request->email_verification_code);
        if (!$user->hasVerifiedEmail()) {
            if ($user->verificationCodes()->where('type','email')->where('code', $request->email_verification_code )->exists()) {
                $code = $user->verificationCodes()->where('type', 'email')->where('code', $request->email_verification_code)->first();
                $created_at = strtotime($code->created_at);
                if (($created_at + (60 * 60 * 6)) < time()) {
                    $code->delete();
                    $message = 'verification code expired';
                    return $this->respondWithErrorMessage($message, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);
                }
                else {
                $user->markEmailAsVerified();
                $code->delete();
                return $this->respondWithMessage('email address verified successfully');
                }
                
            }
            $message = 'invalid verification code';
            return $this->respondWithErrorMessage( $message, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 404);
        }
        $message = 'email address is already verified';
        return $this->respondWithErrorMessage( $message, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);
    }
}
