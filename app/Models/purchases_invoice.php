<?php

namespace App\Models;

use App\Models\User;
use App\Models\sales_man;
use App\Models\suppliers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class purchases_invoice extends Model
{
    use HasFactory;

    protected $table="purchases_invoice";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "code",
        "total",
        "Date",
        "details",
        "paid",
        "remaind",
        "supplier_id",
        "user_id",
        "payment_type",
        "vat"
    ];

    // =============================================================
    // Relationhs
    // =============================================================
    public  function get_supplier(){

      $query =  $this->hasOne(suppliers::class,"id","supplier_id");
        return $query;
    }
    // =============================================================
    // =============================================================
    public  function get_user(){

        $query =  $this->hasOne(User::class,"id","user_id");
          return $query;
      }
    // =============================================================
    // =============================================================
      public  function items_invoice(){

        $query =  $this->hasMany(item_purchas_invoice::class,"purchas_invoice_id","id")->with("items");
          return $query;
      }
}
