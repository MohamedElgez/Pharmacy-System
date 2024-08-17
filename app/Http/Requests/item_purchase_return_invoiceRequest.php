<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class item_purchase_return_invoiceRequest extends FormRequest
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
            // "purchas_invoice_return_id" => ["required","integer"],
            // "item_id" => ["required","integer"],
            // "quntity" => ["required","integer"],
        ];
    }
}
