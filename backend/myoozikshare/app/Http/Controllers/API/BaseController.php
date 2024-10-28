<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function respond($data, $msg = null) {
        return ResponseBuilder::asSuccess()->withData($data)->withMessage($msg)->build();
    }

    public function respondWithMessage($msg) {
        return ResponseBuilder::asSuccess()->withMessage($msg)->build();
    }

    public function respondWithError($api_code, $http_code) {
        return ResponseBuilder::asError($api_code)->withHttpCode($http_code)->build();
    }

    public function respondWithValidationErrors($error_data, $api_code, $http_code) {
        return ResponseBuilder::asError($api_code)->withHttpCode($http_code)->withData($error_data)->build();
    }

    public function respondWithErrorMessage($message, $api_code, $http_code) {
        return ResponseBuilder::asError($api_code)->withMessage($message)->withHttpCode($http_code)->build();
    }    

    public function respondBadRequest($api_code) {
        return $this->respondWithError($api_code, 400);
    }
    public function respondUnAuthorizedRequest($api_code) {
        return $this->respondWithError($api_code, 401);
    }
    public function respondNotFound($api_code) {
        return $this->respondWithError($api_code, 404);
    }
}