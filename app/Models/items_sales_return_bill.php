<?php

namespace App\Models;

use App\Models\Item;
use App\Models\sales_bill;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class items_sales_return_bill extends Model
{
    use HasFactory;

    protected $table="items_sales_return_bill";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "sales_bill_return_id",
        "quntity",
        "item_id",

    ];

    // ================ Relation =======================

     public function sales_return_bill(){

        return $this->hasOne(sales_bill::class,"id","sales_bill_return_id");
    }

    public function items()
    {
        return $this->hasOne(Item::class,"id","item_id");
    }
}
