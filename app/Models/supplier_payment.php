<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class supplier_payment extends Model
{
    use HasFactory;

    protected $table = "supplier_payment";
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


    public function supplier()
    {
        return $this->hasOne(suppliers::class,"id","supplier_id");
    }
}
