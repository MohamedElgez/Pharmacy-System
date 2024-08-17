<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class clientes extends Model
{
    use HasFactory;
    protected $table="clientes";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "name",
        "adress",
        "city",
        "phone",
        "remaining_debt",
        "mobile",

    
       

    ];
}
