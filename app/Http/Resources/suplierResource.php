<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class suplierResource extends JsonResource
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
            "name" => $this->name,
            "adress" => $this->adress,
            "city" => $this->city,
            "phone" => $this->phone,
            "mobile" => $this->mobile,
        ];
    }
}
