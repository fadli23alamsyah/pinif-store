<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(){
        $data = Invoice::orderBy("date","desc")->with(["customer","supplier"])->get();
        return Inertia::render('Invoice/Index', ["data" => $data]);
    }

    public function add(Request $request){
        if($request->op != 'customer' && $request->op != 'supplier') {
            return to_route('invoice')->with(["isSuccess" => false, "message" => "Terdapat kesalahan !!"]);
        }
        $suppliers = Supplier::get();
        $products = Product::with(["variant"])->get();
        return Inertia::render('Invoice/Form',[
            "op" => $request->op, 
            "suppliers" => $suppliers, 
            "products" => $products, 
        ]);
    }

    public function store(Request $request){
        if($request->op != 'customer' && $request->op != 'supplier') {
            return to_route('invoice')->with(["isSuccess" => false, "message" => "Terdapat kesalahan !!"]);
        }

        if($request->op == 'customer'){
            $data_customer = $request->validate([
                "name" => "required",
                "address" => "required",
                "phone" => "required|numeric",
            ]);
        }else{
            $request->validate([
                "supplier_id" => "required|numeric",
            ]);
        }

        $transactions = $request->transactions;
        // Belum berfungsi validasi transaksi
        // for($i=0; $i < count($transactions); $i++){
        //     $request->validate([
        //         "transactions[$i]['product_id']" => "required|email",
        //         "transactions[$i]['price']" => "required|numeric",
        //         "transactions[$i]['unit']" => "required|numeric",
        //     ]);
        // }

        $data_invoice = [
            "date" => $request->validate(["date" => "required|date"])["date"],
            "total" => array_sum(array_column($transactions, 'total')),
        ];

        if($request->op == 'customer'){
            $customer = Customer::create($data_customer);
            $data_invoice["customer_id"] = $customer->id;
        }else{
            $data_invoice["supplier_id"] = $request->supplier_id;
        }

        $invoice = Invoice::create($data_invoice);

        $data_transactions = [];
        for($i=0; $i < count($transactions); $i++){
            $data_transactions[] = [
                "price" => $transactions[$i]["price"],
                "unit" => $transactions[$i]["unit"],
                "product_id" => $transactions[$i]["product_id"],
                "invoice_id" => $invoice->id,
            ];
        }

        $productChange = array_column($data_transactions,'product_id');

        if(Transaction::insert($data_transactions)){
            $this->_updateStock($productChange);
            return to_route('invoice')->with(["isSuccess" => true, "message" => "Berhasil ditambah"]);
        }else{
            return to_route('invoice')->with(["isSuccess" => false, "message" => "Gagal ditambah"]);
        }
    }

    public function edit(Invoice $invoice){
        $op = ($invoice->supplier_id != null)? 'supplier' : 'customer';
        $suppliers = Supplier::get();
        $products = Product::with(["variant"])->get();
        $invoice = Invoice::where('id',$invoice->id)->with(["transactions","supplier","customer"])->first();
        return Inertia::render('Invoice/Form',[
            "op" => $op, 
            "suppliers" => $suppliers, 
            "products" => $products, 
            "invoice" => $invoice,
        ]);
    }

    public function update(Request $request){
        if($request->op != 'customer' && $request->op != 'supplier') {
            return to_route('invoice')->with(["isSuccess" => false, "message" => "Terdapat kesalahan !!"]);
        }

        if($request->op == 'customer'){
            $customer = $request->validate([
                "name" => "required",
                "address" => "required",
                "phone" => "required|numeric",
            ]);
        }else{
            $request->validate([
                "supplier_id" => "required|numeric",
            ]);
        }

        // Variable Transaction
        $transactions = $request->transactions;

        if($request->op == 'customer'){
            $data_invoice["customer_id"] = $request->customer_id;
        }else{
            $data_invoice["supplier_id"] = $request->supplier_id;
        }
        $data_invoice = [
            "date" => $request->validate(["date" => "required|date"])["date"],
            "total" => array_sum(array_column($transactions, 'total')),
        ];

        $invoice = Invoice::find($request->id);
        if($request->op == 'customer') $invoice->customer->update($customer);

        $old_transaction = array_column($invoice->transactions->toArray(), 'id');
        for($i=0; $i < count($transactions); $i++){
            $data = [
                "price" => $transactions[$i]["price"],
                "unit" => $transactions[$i]["unit"],
                "product_id" => $transactions[$i]["product_id"],
                "invoice_id" => $invoice->id,
            ];

            // Check transaction for delete
            if(in_array($transactions[$i]["id"], $old_transaction)){
                $old_transaction = array_diff($old_transaction, [$transactions[$i]["id"]]);
            }

            // Update or Create
            $invoice->transactions()->updateOrCreate(["id" => $transactions[$i]["id"]] , $data);
        }

        // Delete transaction
        $invoice->transactions()->whereIn('id', $old_transaction)->delete();

        $productChange = array_merge(
            array_column($transactions,'product_id'), 
            array_column($invoice->transactions->toArray(), 'product_id')
        );

        if($invoice->update($data_invoice)){
            $this->_updateStock(array_unique($productChange));
            return to_route('invoice')->with(["isSuccess" => true, "message" => "Berhasil diupdate"]);
        }else{
            return to_route('invoice')->with(["isSuccess" => false, "message" => "Gagal diupdate"]);
        }
    }

    public function destroy(Request $request){
        $invoice = Invoice::find($request->id);
        $productChange = $invoice->transactions()->get('product_id')->mode("product_id");
        $invoice->transactions()->delete();
        $invoice->delete();
        if($invoice["customer_id"]){
            $invoice->customer->delete();
        }
        if($invoice){
            $this->_updateStock(array_unique($productChange));
            return back()->with(["isSuccess" => true, "message" => "Berhasil dihapus"]);
        }else{
            return back()->with(["isSuccess" => false, "message" => "Gagal dihapus"]);
        }
    }

    private function _updateStock(array $product_ids){
        foreach($product_ids as $product_id){
            $product = Product::find($product_id);
            $purchase = Invoice::whereNotNull('supplier_id')->where('transactions.product_id', $product_id)
                ->join("transactions","transactions.invoice_id","=","invoices.id")
                ->get(["transactions.product_id", "transactions.unit"])->groupBy("product_id");
            $sale = Invoice::whereNotNull('customer_id')->where('transactions.product_id', $product_id)
                ->join("transactions","transactions.invoice_id","=","invoices.id")
                ->get(["transactions.product_id", "transactions.unit"])->groupBy("product_id");

            $stock = (isset($purchase[$product_id]) ? $purchase[$product_id]->sum("unit") : 0) 
                                        - (isset($sale[$product_id]) ? $sale[$product_id]->sum("unit") : 0);
            $product->update(["stock" => $stock]);
        }
    }
}
