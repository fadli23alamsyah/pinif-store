<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        $popular_products = Transaction::whereNotNull('invoices.customer_id')
            ->orderBy("total_purchase","desc")->with(["product" => function($query){
                $query->with(["variant:name,id"]);
            }])
            ->join("invoices","invoices.id","=","transactions.invoice_id")
            ->selectRaw("transactions.product_id, SUM(transactions.unit) as total_purchase")
            ->groupByRaw("transactions.product_id")->take(5)->get();

        $new_products = Product::orderBy("created_at","desc")->with(['variant'])->take(5)->get();

        // format data response
        $formatNewProduct = [];
        for($i=0; $i < count($new_products); $i++){
            if($i == 0){ 
                $formatNewProduct[] = [
                    "name" => $new_products[$i]->variant?->name ?? $new_products[$i]->name,
                    "category_id" => $new_products[$i]->category_id,
                    "brand_id" => $new_products[$i]->brand_id,
                    "variant_id" => $new_products[$i]->variant_id,
                    "stock" => $new_products[$i]->stock,
                    "prices" => [$new_products[$i]->price],
                    "images" => [$new_products[$i]->image],
                    "variants" => $new_products[$i]->variant ? [[
                        "name" => $new_products[$i]->name,
                        "stock" => $new_products[$i]->stock,
                        "price" => $new_products[$i]->price,
                    ]] : []
                ];

                continue;
            }elseif($new_products[$i]->variant_id != null){
                $key = array_search($new_products[$i]->variant_id, array_column($formatNewProduct, 'variant_id'));
                if($key >= 0){
                    $formatNewProduct[$key]["stock"] += $new_products[$i]->stock;
                    !in_array($new_products[$i]->price, $formatNewProduct[$key]["prices"]) && $formatNewProduct[$key]["prices"][] = $new_products[$i]->price;
                    !in_array($new_products[$i]->image, $formatNewProduct[$key]["images"]) && $formatNewProduct[$key]["images"][] = $new_products[$i]->image;
                    $formatNewProduct[$key]["variants"][] = [
                        "name" => $new_products[$i]->name,
                        "stock" => $new_products[$i]->stock,
                        "price" => $new_products[$i]->price,
                    ];
                    asort($formatNewProduct[$key]["prices"]);
                }else{
                    $formatNewProduct[] = [
                        "name" => $new_products[$i]->variant->name,
                        "category_id" => $new_products[$i]->category_id,
                        "brand_id" => $new_products[$i]->brand_id,
                        "variant_id" => $new_products[$i]->variant_id,
                        "stock" => $new_products[$i]->stock,
                        "prices" => [$new_products[$i]->price],
                        "images" => [$new_products[$i]->image],
                        "variants" => [[
                            "name" => $new_products[$i]->name,
                            "stock" => $new_products[$i]->stock,
                            "price" => $new_products[$i]->price,
                        ]] 
                    ];
                }

                continue;
            }else{
                $formatNewProduct[] = [
                    "name" => $new_products[$i]->name,
                    "category_id" => $new_products[$i]->category_id,
                    "brand_id" => $new_products[$i]->brand_id,
                    "variant_id" => $new_products[$i]->variant_id,
                    "stock" => $new_products[$i]->stock,
                    "prices" => [$new_products[$i]->price],
                    "images" => [$new_products[$i]->image],
                    "variants" => [],
                ];

                continue;
            }
        }

        return Inertia::render('Home/Index', ["popular_products" => $popular_products, "new_products" => $formatNewProduct]);
    }

    public function catalog(Request $request){
        $filter = $request->filter;
        $categories = Category::all();
        
        if($filter == null || $filter == 'all'){
            $products = Product::all();
        }else{
            $products = Product::where("category_id", $categories->where("name",$filter)->value("id"))->get();
        }

        return Inertia::render('Home/Catalog', ["categories" => $categories, "products"=>$products]);
    }
}
