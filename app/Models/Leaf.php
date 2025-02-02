<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leaf extends Model
{  
    use HasFactory;
    protected $table= "leafs";
    protected $fillable = [
        "id",
        "name",
        "created_at",
        "updated_at",

    ];
    public function item()
    {
        return $this->hasMany(Item::class);
    }
}
