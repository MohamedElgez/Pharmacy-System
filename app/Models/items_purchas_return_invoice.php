<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class items_purchas_return_invoice extends Model
{
    use HasFactory;

    protected $table="items_purchas_return_invoice";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "purchas_invoice_return_id",
        "item_id",

        "quantity",

    ];

    // ===================== Relation ===================
    public function purchas_return_invoice()
    {
        return $this->hasOne(purchases_invoice::class,"id","purchas_invoice_return_id");
    }
    public function items()
    {
        return $this->hasOne(Item::class,"id","item_id");
    }
}
