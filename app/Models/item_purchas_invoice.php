<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Item;
use App\Models\purchases_invoice;

class item_purchas_invoice extends Model
{
    use HasFactory;
    protected $table="item_purchas_invoice";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "purchas_invoice_id",
        "item_id",
        "item_code",
        "quantity",
        "suplier_price",
        "sell_price",
        "discount",
        "total",
        "expire_date",
        "created_at"
    ];
// ====================== Relations ============================
    public function purchas_invoice()
    {
        return $this->hasOne(purchases_invoice::class,"id","purchas_invoice_id");
    }
    public function items()
    {
        return $this->hasOne(Item::class,"id","item_id");
    }

}
