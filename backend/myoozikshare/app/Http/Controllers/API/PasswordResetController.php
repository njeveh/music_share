<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\VerificationCode;
use App\Notifications\PasswordReset;
use Illuminate\Auth\Events\PasswordReset as PasswordResetEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class PasswordResetController extends BaseController
{
    /**
     * Handle an incoming password reset code request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function getPasswordResetCode(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(),
                [
                    'email' => ['required', 'string', 'email'],
                ]
            );
            if ($validator->fails()) {
                return $this->respondWithErrorMessage('Invalid email address.', BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);
            }
            
            if (User::where('email', $request->email)->exists()) {
                $user = User::where('email', $request->email)->first();
                VerificationCode::create(
                    [
                        'user_id' => $user->id,
                        'code' => random_int(100000, 999999),
                        'type' => 'password_recovery'
                    ]
                );
                $user->notify(new PasswordReset($user));
                return $this->respondWithMessage('Password reset code sent successfully');
            }
            $message = 'User not found! No user with the submitted email address was found.';
            return $this->respondWithErrorMessage($message, BaseApiCodes::EX_HTTP_NOT_FOUND(), 403);


        } catch (\Throwable $th) {
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        //Log::info($request->all());
        try {
            $validator = Validator::make($request->all(),[
                'reset_code' => ['required'],
                'email' => ['required', 'email'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            if ($validator->fails()) {
                $error_messages = $validator->errors()->all();
                return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
            }
            // Here we will attempt to reset the user's password. If it is successful we
            // will update the password on an actual user model and persist it to the
            // database. Otherwise we will parse the error and return the response.
            $user = User::where('email', $request->string('email'))->first();
            if ($user) {
                if ($user->verificationCodes()->where('type','password_recovery')->where('code', $request->reset_code )->exists()) {
                    $code = $user->verificationCodes()->where('type', 'password_recovery')->where('code', $request->reset_code)->first();
                    $created_at = strtotime($code->created_at);
                    if (($created_at + (60 * 60 * 6)) < time()) {
                        $code->delete();
                        $message = 'password reset code expired';
                        return $this->respondWithErrorMessage($message, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);
                    }
                    else {
                        $user->forceFill([
                            'password' => Hash::make($request->string('password')),
                            'remember_token' => Str::random(60),
                        ])->save();
                        $code->delete();
                        event(new PasswordResetEvent($user));
                        return $this->respondWithMessage('Password Reset successfully.');
                    }
                }
                $message = 'Invalid paswword reset code';
                return $this->respondWithErrorMessage( $message, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);
                
            }

            $message = 'User not found! No user with the submitted email address was found.';
            return $this->respondWithErrorMessage($message, BaseApiCodes::EX_HTTP_NOT_FOUND(), 400);
            //code...
        } catch (\Throwable $th) {
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }
}
