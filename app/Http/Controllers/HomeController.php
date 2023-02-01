<?php

namespace App\Http\Controllers;

use App\Models\Brand;
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

        $new_products = Product::orderBy("created_at","desc")->with(['variant'])->get();

        $productsFormat = self::_productsResponse($new_products, 5);

        return Inertia::render('Home/Index', ["popular_products" => $popular_products, "new_products" => $productsFormat]);
    }

    public function catalog(Request $request){
        $brand = $request->brand;
        $category = $request->category;
        $categories = Category::all();
        $brands = Brand::all();

        $categories_id = ($category == '' || $category == 'all')? $categories->pluck('id')->toArray() : [$category];
        $brands_id = ($brand == '' || $brand == 'all')? $brands->pluck('id')->toArray() : [$brand];

        $products = Product::whereIn("category_id", $categories_id)->whereIn("brand_id", $brands_id)->get();

        $productsFormat = self::_productsResponse($products);

        return Inertia::render('Home/Catalog', ["categories" => $categories, "brands"=>$brands, "products"=>$productsFormat]);
    }

    private function _productsResponse($products, int $max = null) : array {
        // format data response
        $formatProduct = [];
        for($i=0; $i < count($products); $i++){
            if($max != null && $max == count($formatProduct)) break;

            if($i == 0){ 
                $formatProduct[] = [
                    "name" => $products[$i]->variant?->name ?? $products[$i]->name,
                    "category_id" => $products[$i]->category_id,
                    "brand_id" => $products[$i]->brand_id,
                    "variant_id" => $products[$i]->variant_id,
                    "stock" => $products[$i]->stock,
                    "prices" => [$products[$i]->price],
                    "images" => $products[$i]->image ? [$products[$i]->image] : [],
                    "variants" => $products[$i]->variant ? [[
                        "name" => $products[$i]->name,
                        "stock" => $products[$i]->stock,
                        "price" => $products[$i]->price,
                    ]] : []
                ];

                continue;
            }elseif($products[$i]->variant_id != null){
                $key = array_search($products[$i]->variant_id, array_column($formatProduct, 'variant_id'));
                $key = $key === false ? -1 : $key;
                if($key >= 0){
                    $formatProduct[$key]["stock"] += $products[$i]->stock;
                    !in_array($products[$i]->price, $formatProduct[$key]["prices"]) && $formatProduct[$key]["prices"][] = $products[$i]->price;
                    !in_array($products[$i]->image, $formatProduct[$key]["images"]) && $products[$i]->image && $formatProduct[$key]["images"][] = $products[$i]->image;
                    $formatProduct[$key]["variants"][] = [
                        "name" => $products[$i]->name,
                        "stock" => $products[$i]->stock,
                        "price" => $products[$i]->price,
                    ];
                    sort($formatProduct[$key]["prices"]);
                }else{
                    $formatProduct[] = [
                        "name" => $products[$i]->variant->name,
                        "category_id" => $products[$i]->category_id,
                        "brand_id" => $products[$i]->brand_id,
                        "variant_id" => $products[$i]->variant_id,
                        "stock" => $products[$i]->stock,
                        "prices" => [$products[$i]->price],
                        "images" => $products[$i]->image ? [$products[$i]->image] : [],
                        "variants" => [[
                            "name" => $products[$i]->name,
                            "stock" => $products[$i]->stock,
                            "price" => $products[$i]->price,
                        ]] 
                    ];
                }

                continue;
            }else{
                $formatProduct[] = [
                    "name" => $products[$i]->name,
                    "category_id" => $products[$i]->category_id,
                    "brand_id" => $products[$i]->brand_id,
                    "variant_id" => $products[$i]->variant_id,
                    "stock" => $products[$i]->stock,
                    "prices" => [$products[$i]->price],
                    "images" => $products[$i]->image ? [$products[$i]->image] : [],
                    "variants" => [],
                ];

                continue;
            }
        }

        return $formatProduct;
    }
}
