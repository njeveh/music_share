<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class AuthenticatedSessionController extends BaseController
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(),
                [
                    'email' => ['required', 'string', 'lowercase', 'email'],
                    'password' => ['required', 'string'],
                ]
            );
            if ($validator->fails()) {
                return $this->respondWithErrorMessage('Invalid credentials.', BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);
            }
            if (Auth::attempt($validator->valid())) {;
                $user = User::where('email', $request->email)->first();
                $token = $user->createToken('API TOKEN');
                $data = [
                    'user' => $user,
                    'has_verified_email' => $user->hasVerifiedEmail(),
                    'token' => $token->plainTextToken
                ];
                //Log::info($data);
                return $this->respond($data, 'User logged in successfully.');
            }
            return $this->respondWithErrorMessage('Invalid credentials.', BaseApiCodes::EX_VALIDATION_EXCEPTION(), 400);

        } catch (\Throwable $th) {
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        try {
            $request->user()->tokens()->delete();
            return $this->respondWithMessage('User logged out successfully.');
        } catch (\Throwable $th) {
            Log::info($th);
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
        }
    }
}
