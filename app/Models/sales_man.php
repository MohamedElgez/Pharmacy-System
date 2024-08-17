<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sales_man extends Model
{
    use HasFactory;

    protected $table="sales_man";
    protected $hidden = [
        
    ];
    protected $fillable = [
        "id",
        "name",
        "mobile",
        "adress",
        "city",
      
    ];
}
