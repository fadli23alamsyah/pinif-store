<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index(){
        $data = Supplier::get();
        return Inertia::render('Supplier/Index', ["data" => $data]);
    }

    public function add(){
        return Inertia::render('Supplier/Form');
    }

    public function store(Request $request){
        $data = $request->validate([
            "name" => "required",
            "address" => "required",
            "phone" => "required|numeric",
        ]);

        if(Supplier::create($data)){
            return to_route('supplier')->with(["isSuccess" => true, "message" => "Berhasil ditambah"]);
        }else{
            return to_route('supplier')->with(["isSuccess" => false, "message" => "Gagal ditambah"]);
        }
    }

    public function edit(Supplier $supplier){
        return Inertia::render('Supplier/Form', ["supplier" => $supplier]);
    }

    public function update(Request $request){
        $data = $request->validate([
            "name" => "required",
            "address" => "required",
            "phone" => "required|numeric",
        ]);

        if(Supplier::find($request->id)->update($data)){
            return to_route('supplier')->with(["isSuccess" => true, "message" => "Berhasil diupdate"]);
        }else{
            return to_route('supplier')->with(["isSuccess" => false, "message" => "Gagal diupdate"]);
        }
    }

    public function destroy(Request $request){
        $supplier = Supplier::find($request->id);
        $check = $supplier->withExists(["invoices"])->first();
        if($check->invoices_exists){
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus, Data masih terhubung dengan data lain"]);
        }

        if($supplier->delete()){
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }
}
