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
            ->orderBy("total_purchase","desc")->with("product")
            ->join("invoices","invoices.id","=","transactions.invoice_id")
            ->selectRaw("transactions.product_id, SUM(transactions.unit) as total_purchase")
            ->groupByRaw("transactions.product_id")->take(5)->get();

        $new_products = Product::orderBy("created_at","desc")->take(5)->get();

        return Inertia::render('Home/Index', ["popular_products" => $popular_products, "new_products" => $new_products]);
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
