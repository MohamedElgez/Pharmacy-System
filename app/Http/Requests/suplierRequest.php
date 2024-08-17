<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class suplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
        "name" => ["required","string"],
        "code" => ["required"],
        "adress" => ["required"],
        "city" => ["required"],
        "phone" => ["required","unique:suppliers,phone,". $this->id,config("constant.phone"),"min:11"],
        "mobile" =>[ "required","unique:suppliers,mobile,". $this->id,config("constant.phone"),"min:11"]
        ];
    }

    // public function messages(){
    //     return[

    //         'name' => 'name -> is "required" and shoud by "string" ',
    //         'code' => 'code -> is "required" and shoud by "integer"',
    //         'adress' => 'adress -> is "required"',
    //         'city' => 'city -> is "required"',
    //         'phone' => 'phone -> is "required" and shoud by "integer" and length "11+"',
    //         'mobile' => 'mobile -> is "required" and shoud by "integer"',
    //     ];
    // }
}
