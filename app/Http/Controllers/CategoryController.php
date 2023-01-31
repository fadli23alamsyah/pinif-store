<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        $data = Category::get();
        return Inertia::render('Category/Index', ["data" => $data]);
    }

    public function add(){
        return Inertia::render('Category/Form');
    }

    public function store(Request $request){
        $data = $request->validate([
            "name" => "required|unique:".Category::class,
        ]);

        if(Category::create($data)){
            return to_route('category')->with(["isSuccess" => true, "message" => "Berhasil ditambah"]);
        }else{
            return to_route('category')->with(["isSuccess" => false, "message" => "Gagal ditambah"]);
        }
    }

    public function edit(Category $category){
        return Inertia::render('Category/Form', ["category" => $category]);
    }

    public function update(Request $request){
        $data = $request->validate([
            "name" => "required|". Rule::unique(Category::class)->ignore($request->id),
        ]);

        if(Category::find($request->id)->update($data)){
            return to_route('category')->with(["isSuccess" => true, "message" => "Berhasil diupdate"]);
        }else{
            return to_route('category')->with(["isSuccess" => false, "message" => "Gagal diupdate"]);
        }
    }

    public function destroy(Request $request){
        $category = Category::withExists(["products"])->find($request->id);
        $check = $category->products_exists;
        if($check){
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus, Data masih terhubung dengan data lain"]);
        }

        if($category->delete()){
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }
}
