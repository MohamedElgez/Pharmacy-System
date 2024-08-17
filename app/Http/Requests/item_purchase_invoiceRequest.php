<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class item_purchase_invoiceRequest extends FormRequest
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
            "item_id" => ["required", "integer"],
            "quntity" => ["required", "integer"],
            "suplier_price" => ["required", "integer"],
            "sell_price" => ["integer"],
            "discount" => ["integer"],
            "expire_date" => ["required", "date"],
            "total" => ["required", "integer"],
        ];
    }
}
