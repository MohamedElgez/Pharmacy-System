<?php

namespace App\Models;

use App\Models\clientes;
use App\Models\sales_man;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class sales_return_bill extends Model
{
    use HasFactory;

    protected $table="sales_return_bill";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "code",
        "total",
        "sale",
        "net",
        "remaind",
        "client_id",
        "user_id",

    ];

      // =================== Relation =======================
      public function client(){

        return $this->hasOne(clientes::class,"id","client_id");

    }

// ===================  sale man Relation====================
    public function get_user()
        {
            return $this->hasOne(User::class,"id","user_id");
        }

        public  function items_invoice(){

            $query =  $this->hasMany(items_sales_return_bill::class,"sales_bill_return_id","id")->with("items");
              return $query;
          }

}
