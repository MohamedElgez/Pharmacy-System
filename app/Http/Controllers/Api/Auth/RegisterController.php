<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Traits\ApiTrait;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    use ApiTrait;
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    use ApiTrait;
    public function __invoke(RegisterRequest $request)
    {   $data=$request->validated();
        $data["password"]=Hash::make($request->password);
        $user=User::create($data);
        return  $this->DataResponse(compact("user"),"user created successfully");
    }

}
