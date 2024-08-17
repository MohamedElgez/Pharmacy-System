<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class purchase_return_invoiceRequest extends FormRequest
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
            
            // purchas return imvoice
            "code"=>["required"],
            "total"=>["required","integer"],
            "sale"=>["required","integer"],
            "total_after_sale"=>["required","integer"],
            "paid"=>["required","integer"],
            "remaind"=>["required","integer"],
            "supplier_id"=>["required","integer"],
            "sales_man_id"=>["required","integer"],
            "payment_type"=>["required","integer"],

            // items_purchas_return_invoice

            "purchas_invoice_return_id" => ["required","integer"],
            "item_id" => ["required","integer"],
            "quntity" => ["required","integer"],
        ];
    }
}
