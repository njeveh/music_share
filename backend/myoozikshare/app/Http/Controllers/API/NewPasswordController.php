<?php

namespace App\Http\Controllers\API;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class NewPasswordController extends BaseController
{
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
                'current_password' => ['required', 'current_password'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            if ($validator->fails()) {
                $error_messages = $validator->errors()->all();
                return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
            }

            $user = $request->user();

            $user->forceFill([
                'password' => Hash::make($request->string('password')),
                'remember_token' => Str::random(60),
            ])->save();

            event(new PasswordReset($user));

            return $this->respondWithMessage('Password updated successfully.');
            
        } catch (\Throwable $th) {
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }
}
