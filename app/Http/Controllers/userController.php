<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use App\Http\Requests\userRequest;
use Illuminate\Support\Facades\Auth;

class userController extends Controller
{
    use ApiTrait;
    public function index(Request $request)
    {
        $users = User::Paginate(5);;
        return $this->dataResponse(compact("users"), "get all users successfully");
    }
    // get specific user
    public function getOne(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->ErrorResponse(["user" => "user id dosen't exist in database"], "user not exist", 404);
        } else {
            return $this->dataResponse(compact("user"), "get user successfully");
        }
    }
    // update user
    public function update($id, userRequest $request)
    {
        $data = $request->validated();
        $user = User::find($id);
        if (!$user) {
            return $this->ErrorResponse(["user" => "user id dosen't exist in database"], "user not exist", 404);
        } else {
            $user->update($data);
            return $this->successResponse("success update", ["user" => $data]);
        }
    }
    // edit user
    public function edit(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->ErrorResponse(["user" => "user id dosen't exist in database"], "user not exist", 404);
        } else {
            return $this->DataResponse(compact("user"), "get categories , types ,units and leafs successfully");
        }
    }
    // delete
    public function destory($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->ErrorResponse(["user" => "this user id dosen't exist in database"], "user not exist", 404);
        } else {
            $data = $user;
            $user->delete();
            return $this->successResponse("success delete", ["user" => $data]);
        }
    }
    public function getUserByToken(Request $request)
    {
        $user = Auth::guard('sanctum')->user();
        return $this->DataResponse(compact("user"), "get user successfully");
    }
}
