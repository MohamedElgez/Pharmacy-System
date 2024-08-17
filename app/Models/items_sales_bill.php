<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\sales_bill;
use App\Models\Item;
class items_sales_bill extends Model
{
    use HasFactory;

    protected $table="items_sales_bill";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "sales_bill_id",
        "item_id",
        "item_code",
        "price",
        "quantity",

    ];

    // ================ Relation ========================
    public function sales_bill(){

        return $this->hasOne(sales_bill::class,"id","sales_bill_id");
    }

    public function items()
    {
        return $this->hasOne(Item::class,"id","item_id");
    }

}
