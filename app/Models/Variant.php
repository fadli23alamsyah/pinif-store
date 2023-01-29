<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function productOption(){
        return $this->belongsToMany(ProductOption::class, 'product_variant');
    }
}
