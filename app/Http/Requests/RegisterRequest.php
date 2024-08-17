<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => ['required','string', 'max:32'],
            'password' => ['required', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/', 'confirmed'],
            'password_confirmation' => ['required'],
            'phone'=>['required','regex:/^01[0125][0-9]{8}$/', 'unique:users,phone'],
            'role'=>['required','in:0,1']
        ];
    }
    public function messages()
    { 
        return [
        "password"=> [" password Required and must be in format like : Minimum eight and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character"]
        ];
    }
}
