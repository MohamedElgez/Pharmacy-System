<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\purchases_invoice;

class suppliers extends Model
{
    use HasFactory;

    protected $table="suppliers";
    protected $hidden = [

    ];
    protected $fillable = [
        "id",
        "code",
        "name",
        "adress",
        "city",
        "phone",
        "remaining_debt",
        "mobile",
       
    ];


}
