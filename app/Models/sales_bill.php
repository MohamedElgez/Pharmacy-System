<?php

namespace App\Models;

use App\Models\clientes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sales_bill extends Model
{
    use HasFactory;

    protected $table = "sales_bill";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "code",
        "total",
        "paid",
        "remaind",
        "client_id",
        "user_id",
        "payment_type",

    ];

    // =================== Relation =======================
    public function client()
    {

        return $this->hasOne(clientes::class, "id", "client_id");

    }

// ===================  sale man Relation====================
    public function get_user()
    {
        return $this->hasOne(User::class, "id", "user_id");
    }
    public function items_invoice()
    {

        $query = $this->hasMany(items_sales_bill::class, "sales_bill_id", "id")->with("items");
        return $query;
    }
}
