<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client_payment extends Model
{
    use HasFactory;

    protected $table = "client_payment";
    protected $hidden = [];
    protected $fillable = [
        "id",
        "code",
        "supplier_id",
        "past_remaining_debt",
        "paid",
        "remaining_debt",
        "created_by"
    ];


    public function client()
    {
        return $this->hasOne(clientes::class,"id","client_id");
    }
}
