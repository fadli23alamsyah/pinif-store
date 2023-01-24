<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(){
        $data = Brand::get();
        return Inertia::render('Brand/Index', ["data" => $data]);
    }

    public function add(){
        return Inertia::render('Brand/Form');
    }

    public function store(Request $request){
        $data = $request->validate([
            "name" => "required|unique:".Brand::class,
        ]);

        if(Brand::create($data)){
            return to_route('brand')->with(["isSuccess" => true, "message" => "Berhasil ditambah"]);
        }else{
            return to_route('brand')->with(["isSuccess" => false, "message" => "Gagal ditambah"]);
        }
    }

    public function edit(Brand $brand){
        return Inertia::render('Brand/Form', ["brand" => $brand]);
    }

    public function update(Request $request){
        $data = $request->validate([
            "name" => "required|". Rule::unique(Brand::class)->ignore($request->id),
        ]);

        if(Brand::find($request->id)->update($data)){
            return to_route('brand')->with(["isSuccess" => true, "message" => "Berhasil diupdate"]);
        }else{
            return to_route('brand')->with(["isSuccess" => false, "message" => "Gagal diupdate"]);
        }
    }

    public function destroy(Request $request){
        $brand = Brand::find($request->id);
        $check = $brand->withExists(["products"])->first();
        if($check->products_exists){
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus, Data masih terhubung dengan data lain"]);
        }

        if($brand->delete()){
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }
}
