<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class sales_return_billRequest extends FormRequest
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

            "code"=>["required"],
            "total"=>["required","integer"],
            "sale"=>["required","integer"],
            "total_after_sale"=>["required","integer"],
            "paid"=>["required","integer"],
            "remaind"=>["required","integer"],
            "client_id"=>["integer"],
            "sales_man_id"=>["required","integer"],

            // item sales return request
            'sales_bill_return_id' => ['required'],
            'item_id' => ['required'],
            // 'quntity'=>["required"]
        ];
    }
}
