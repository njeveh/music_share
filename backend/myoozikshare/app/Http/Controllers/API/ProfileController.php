<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class ProfileController extends BaseController
{

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        try {
            //Log::info($request);
            $validator = Validator::make($request->all(), [
                'first_name' => ['required', 'string', 'min:2', 'max:255'],
                'last_name' => ['required', 'string', 'min:2', 'max:255'],
                'user_name' => ['sometimes', 'nullable',
                    Rule::unique('users', 'user_name')->ignore($request->user()->id), 'string', 'min:2', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users','email')->ignore($request->user()->id)],
            ]);
    
            if ($validator->fails()) {
                $error_messages = $validator->errors()->all();
                return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
            }
            $user = $request->user();
            $user->fill($validator->validated());
    
            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }
    
            $user->save();
            $user = $user->refresh();
    
                $data = [
                    'user' => $user,
                ];
                // Log::info($data);
                return $this->respond($data, 'profile updated successfully.');
        } catch (\Throwable $th) {
            //Log::info($th);
            return $this->respondWithErrorMessage('Sorry something went wrong, please try again.', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'password' => ['required', 'current_password'],
            ]);

            if ($validator->fails()) {
                return $this->respondWithValidationErrors('Invalid password.', BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
            }
            $user = $request->user();
            $user->tokens()->delete();
            $user->delete();
            return $this->respondWithMessage('User account deleted successfully.');
        } catch (\Throwable $th) {
            //Log::info($th);
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
        }
    }
}
