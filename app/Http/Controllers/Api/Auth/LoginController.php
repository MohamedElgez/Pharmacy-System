<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Traits\ApiTrait;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    use ApiTrait;
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LoginRequest $request)
    {
        $user = User::where("phone", "=", $request->phone)->first();
        if (!$user) {
            return $this->ErrorResponse(["phone" => __("auth.failed")], __("auth.failed"), 401);
        }
        if (!Hash::check($request->password, $user->password)) {
            return $this->ErrorResponse(["password" => __("auth.failed")], __("auth.failed"), 401);
        }
        $user->token = "Bearer " . $user->createToken($request->phone)->plainTextToken;
        return $this->DataResponse(compact("user"), "login done successfully");
    }
}
