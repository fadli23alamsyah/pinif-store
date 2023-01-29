<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOption extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function variant(){
        return $this->belongsToMany(Variant::class, 'product_variant');
    }
}
