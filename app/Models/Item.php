<?php

namespace App\Models;

use App\Models\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $table = "items";
    protected $hidden = [];
    protected $fillable = [

        "id",
        "name",
        "type_id",
        "unit_id",
        "price",
        "unit_price",
        "code",
        "category_id",
        "supplier_id",
        "expiration",
        "quantity",
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function supplier()
    {
        return $this->belongsTo(suppliers::class);
    }
    public function type()
    {
        return $this->belongsTo(Type::class);
    }
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
    public function leaf()
    {
        return $this->belongsTo(Leaf::class);
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
}
