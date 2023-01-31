<?php

namespace App\Http\Controllers;

use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VariantController extends Controller
{
    public function index(){
        $data = Variant::get();
        return Inertia::render('Variant/Index', ["data" => $data]);
    }

    public function add(){
        return Inertia::render('Variant/Form');
    }

    public function store(Request $request){
        $data = $request->validate([
            "name" => "required|unique:".Variant::class,
        ]);

        if(Variant::create($data)){
            return to_route('variant')->with(["isSuccess" => true, "message" => "Berhasil ditambah"]);
        }else{
            return to_route('variant')->with(["isSuccess" => false, "message" => "Gagal ditambah"]);
        }
    }

    public function edit(Variant $variant){
        return Inertia::render('Variant/Form', ["variant" => $variant]);
    }

    public function update(Request $request){
        $data = $request->validate([
            "name" => "required|". Rule::unique(Variant::class)->ignore($request->id),
        ]);

        if(Variant::find($request->id)->update($data)){
            return to_route('variant')->with(["isSuccess" => true, "message" => "Berhasil diupdate"]);
        }else{
            return to_route('variant')->with(["isSuccess" => false, "message" => "Gagal diupdate"]);
        }
    }

    public function destroy(Request $request){
        $variant = Variant::withExists(["products"])->find($request->id);
        $check = $variant->products_exists;
        if($check){
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus, Data masih terhubung dengan data lain"]);
        }

        if($variant->delete()){
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }
}
