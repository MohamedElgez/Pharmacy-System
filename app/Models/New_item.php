<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class New_item extends Model
{
    use HasFactory;
    protected $table="new_items";
    protected $hidden = [

    ];
    protected $fillable = [

        "id",
        "item_id",
        "purchase_code",
        "expire_date",
        "quantity",
    ];
}
