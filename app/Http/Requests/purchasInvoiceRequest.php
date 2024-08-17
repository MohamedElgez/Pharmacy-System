<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class purchasInvoiceRequest extends FormRequest
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
        return[
            "code" => ["required", 'regex:/^[0-9]/'],
            "total" => ["required", "integer"],
            "total_after_sale" => ["required", "integer"],
            "paid" => ["required", "integer"],
            "remaind" => ["required", "integer"],
            "supplier_id" => ["required", "integer"],
            "sales_man_id" => ["required", "integer"],
            "Date" => ["required", "date"],
            "payment_type" => ["required", "integer"],
         ];
    }


    // public function messages()
    // {
    //     return [
    //         "code"=>["required"],
    //         "total"=>["required","integer"],
    //         "sale"=>["required","integer"],
    //         "total_after_sale"=>["required","integer"],
    //         "paid"=>["required","integer"],
    //         "remaind"=>["required","integer"],
    //         "supplier_id"=>["required","integer"],
    //         "sales_man_id"=>["required","integer"],
    //     ];
    // }



}//end class
