<?php

namespace App\Http\Controllers\API;

use App\Events\UserRegistered;
use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class UserRegistrationController extends BaseController
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'user_name' => ['sometimes', 'nullable', 'unique:users,user_name', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            $error_messages = $validator->errors()->all();
            return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
        }
        try {
            DB::beginTransaction();
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'user_name' => $request->user_name,
                'email' => $request->email,
                'password' => Hash::make($request->string('password')),
            ]);
            VerificationCode::create(
                [
                    'user_id' => $user->id,
                    'code' => random_int(1001, 9999),
                    'type' => 'email'
                ]
            );
            event(new UserRegistered($user));
    
            $token = $user->createToken('API TOKEN');
            DB::commit();
            $data = [
                'user' => $user,
                'has_verified_email' => $user->hasVerifiedEmail(),
                'token' => $token->plainTextToken,
            ];
            // Log::info($data);
            return $this->respond($data, 'Registration done successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->respondWithErrorMessage('Sorry something went wrong, please try again.', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }
}
