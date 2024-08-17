<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class purchasInvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "code" => $this->code,
            "total" => $this->total,
            "sale" => $this->sale,
            "total_after_sale" => $this->total_after_sale,
            "paid" => $this->paid,
            "remaind" => $this->remaind,
            "supplier_id" => $this->supplier_id,
            "sales_man_id" => $this->sales_man_id,
        ];
    }
}
