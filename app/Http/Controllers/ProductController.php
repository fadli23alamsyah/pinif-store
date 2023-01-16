<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        $data = Product::orderBy('id','desc')->with('category')->get();
        return Inertia::render('Product/Index', ["data" => $data]);
    }

    public function add(){
        $categories = Category::get();
        return Inertia::render('Product/Form', ["categories" => $categories]);
    }

    public function store(Request $request){
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
            if($exist_image){
                $filename = $request->name .'-'. date('dmYHis').'.'.$exist_image->getClientOriginalExtension();
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
                $filename = $request->name .'-'. date('dmYHis').'.'.$exist_image->getClientOriginalExtension();
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
        if($product->delete()){
            Storage::delete('images/'.$product->image);
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }
}
