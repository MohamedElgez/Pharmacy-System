<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
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

            'name' => ['required', 'string', 'max:32', 'unique:items,name,' . $this->id],
            "type_id" => ['required', 'integer', 'exists:types,id'],
            "unit_id" => ['required', 'integer', 'exists:units,id'],
            "price" => ['required', 'numeric'],
            "unit_price" => ['required', 'numeric'],
            "code" => ['required', 'string', 'unique:items,code,' . $this->id],
            "category_id" => ['required', 'integer', 'exists:categories,id'],
            "supplier_id" => ['required', 'integer', 'exists:suppliers,id'],
            "expiration" => ['required', 'date'],
            "quantity" => ['required', 'integer']
        ];
    }
}
