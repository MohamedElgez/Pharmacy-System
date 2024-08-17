<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class item_sales_billRequest extends FormRequest
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
            // "sales_bill_id"=>["required"],
            // "item_id"=>["required","integer"],
            // "price"=>["required","integer"],
            // "quntity"=>["required","integer"],
        ];
    }



}
