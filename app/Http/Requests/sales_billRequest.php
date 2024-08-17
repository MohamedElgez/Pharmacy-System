<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class sales_billRequest extends FormRequest
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
            // ===== sale bill =======
            "code"=>["required"],
            "total"=>["required","integer"],
            "sale"=>["required","integer"],
            "total_after_sale"=>["required","integer"],
            "paid"=>["required","integer"],
            "remaind"=>["required","integer"],
            "client_id"=>["integer"],
            "sales_man_id"=>["required","integer"],
            "payment_type"=>["required","integer"],
            // "details"=>["string"],

            //======== items sales bill ==========
            "sales_bill_id"=>["required"],
            "item_id"=>["required","integer"],
            "price"=>["required","integer"],
            "quntity"=>["required","integer"],
            // "net_price"=>["required","integer"],
            // "vat"=>["integer"],
            // "unit"=>["integer"],
        ];
    }
}
