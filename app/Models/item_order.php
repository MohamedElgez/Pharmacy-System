<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class item_order extends Model
{
    use HasFactory;
    protected $table = "item_order";
    protected $fillable = [
        "order_id",
        "item_id",
        "quantity",
    ];
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
