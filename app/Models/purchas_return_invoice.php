<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\items_purchas_return_invoice;
use App\Models\suppliers;

class purchas_return_invoice extends Model
{
    use HasFactory;

    protected $table="purchas_return_invoice";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "code",
        "total",
        "paid",
        "remaind",
        "supplier_id",
        "user_id",

    ];

// ===================== Model Relation ==========================
    public  function get_supplier(){

        $query =  $this->hasOne(suppliers::class,"id","suplier_id");
          return $query;
      }
      public  function get_user(){

          $query =  $this->hasOne(User::class,"id","user_id");
            return $query;
        }
        public  function items_invoice(){

            $query =  $this->hasMany(items_purchas_return_invoice::class,"purchas_invoice_return_id","id")->with("items");
              return $query;
          }

}
