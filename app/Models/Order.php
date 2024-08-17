<?php

namespace App\Models;


use App\Models\User;
use App\Models\suppliers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        "code",
        "supplier_id",
        "needed_date",
        "status",
        "created_by",
        "delivered_at"
    ];
    public function supplier()
    {
        return $this->belongsTo(suppliers::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class,'created_by',"id");
    }
    public function items()
    {
        return $this->belongsToMany(Item::class);
    }
    
}
