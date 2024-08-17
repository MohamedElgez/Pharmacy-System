<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\EnsureEmailRequest;
use App\Http\Requests\ResetPaswordRequest;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    use ApiTrait;
    public function ensureEmail(EnsureEmailRequest $request)
    {
        $user = User::where("email", "=", $request->email)->first();
        $user->token = "Bearer " . $user->createToken($request->email)->plainTextToken;
        return $this->DataResponse(compact("user"));
    }

    public function resetPassword(ResetPaswordRequest $request)
    {
        //    $user=Auth::guard('sanctum')->user();
        $user = User::where("id", "=", $request->user_id)->first();
        $user->password = Hash::make($request->password);
        $user->save();
        //    $user->token=$request->header('Authorization');
        return $this->DataResponse(compact("user"), "password reset successfuly");
    }
}
