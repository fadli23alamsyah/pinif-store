<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        $data = Product::orderBy('id','desc')->with(['category'])->get();
        $purchase = Invoice::whereNotNull('supplier_id')
            ->join("transactions","transactions.invoice_id","=","invoices.id")
            ->get(["transactions.product_id", "transactions.unit"])->groupBy("product_id");
        $sale = Invoice::whereNotNull('customer_id')
            ->join("transactions","transactions.invoice_id","=","invoices.id")
            ->get(["transactions.product_id", "transactions.unit"])->groupBy("product_id");

        $checkStock = [];
        foreach($data as $product){
            $checkStock[$product["id"]] = (isset($purchase[$product["id"]]) ? $purchase[$product["id"]]->sum("unit") : 0) 
                                        - (isset($sale[$product["id"]]) ? $sale[$product["id"]]->sum("unit") : 0);
        }
        return Inertia::render('Product/Index', ["data" => $data , "checkStock" => $checkStock]);
    }

    public function add(){
        $brands = Brand::get();
        $categories = Category::get();
        return Inertia::render('Product/Form', ["categories" => $categories, "brands" => $brands]);
    }

    public function store(Request $request){
        $exist_image = $request->file('image');
        if($exist_image){
            $request->validate(["image" => "image|file|max:1024"]);
        }
        
        $data = $request->validate([
            "name" => "required",
            "brand_id" => "required|numeric",
            "category_id" => "required|numeric",
            "price" => "required|numeric",
            "stock" => "required|numeric",
            "additional" => "",
        ]);

        if($data){
            if($exist_image){
                $filename = str_replace(" ","_", $request->name .'-'. date('dmYHis').'.'.$exist_image->getClientOriginalExtension());
                $exist_image->storeAs('images', $filename);
                $data["image"] = $filename;
            };
            Product::create($data);
            return to_route('product')->with(["isSuccess" => true, "message" => "Berhasil ditambah"]);
        }else{
            return to_route('product')->with(["isSuccess" => false, "message" => "Gagal ditambah"]);
        }
    }

    public function edit(Product $product){
        return Inertia::render('Product/Form',[
            "product" => $product,
            "categories" => Category::get(),
            "brands" => Brand::get(),
        ]);
    }

    public function update(Request $request){
        $exist_image = $request->file('image');
        if($exist_image){
            $request->validate(["image" => "image|file|max:1024"]);
        }

        $data = $request->validate([
            "name" => "required",
            "category_id" => "required|numeric",
            "price" => "required|numeric",
            "stock" => "required|numeric",
            "additional" => "",
        ]);

        if($data){
            $product = Product::find($request->id);
            $data["image"] = $product->image;
            if($exist_image){
                Storage::delete('images/'.$product->image);
                $filename = str_replace(" ","_", $request->name .'-'. date('dmYHis').'.'.$exist_image->getClientOriginalExtension());
                $exist_image->storeAs('images', $filename);
                $data["image"] = $filename;
            };
            $product->update($data);
            return to_route('product')->with(["isSuccess" => true, "message" => "Berhasil diupdate"]);
        }else{
            return to_route('product')->with(["isSuccess" => false, "message" => "Gagal diupdate"]);
        }
    }

    public function destroy(Request $request){
        $product = Product::find($request->id);
        $check = $product->withExists(["transactions"])->first();
        if($check->transactions_exists){
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus, Data masih terhubung dengan data lain"]);
        }

        if($product->delete()){
            Storage::delete('images/'.$product->image);
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }
}
