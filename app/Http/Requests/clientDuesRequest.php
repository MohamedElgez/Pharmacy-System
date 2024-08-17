<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class clientDuesRequest extends FormRequest
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
            "code" => ['integer', 'unique:client_payment,code,' . $this->id],
            "client_id" => ["required", "integer", "exists:clientes,id"],
            "remaining_debt" => ['required', 'regex:/^[0-9]|[0-9]+(\.[0-9][0-9]?)$/'],
            "past_remaining_debt" => ['required', 'regex:/^[0-9]|[0-9]+(\.[0-9][0-9]?)$/'],
            "paid" => ['required', 'regex:/^[0-9]|[0-9]+(\.[0-9][0-9]?)$/'],
            "created_by" => ['integer', 'exists:users,id']

        ];
    }
}
