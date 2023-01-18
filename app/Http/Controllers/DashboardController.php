<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        $year = date('Y');
        $purchase = Invoice::selectRaw('MONTH(date) as month, invoices.*')
            ->whereNotNull('supplier_id')->whereRaw("YEAR(date) = ? ", [$year])
            ->withSum("transactions as total_unit","unit")->get()->groupBy('month');
        $sale = Invoice::selectRaw('MONTH(date) as month, invoices.*')
            ->whereNotNull('customer_id')->whereRaw("YEAR(date) = ? ", [$year])
            ->withSum("transactions as total_unit","unit")->get()->groupBy('month');

        $total_purchase = [];
        $total_sale = [];
        $units_purchase = [];
        $units_sale = [];
        // index 1-12 month
        for($i=1; $i <= 12; $i++){
            // total
            array_push($total_purchase, ($i <= count($purchase)) ? $purchase[$i]->sum("total") : 0);
            array_push($total_sale, ($i <= count($sale)) ? $sale[$i]->sum("total") : 0);

            // units
            array_push($units_purchase, ($i <= count($purchase)) ? $purchase[$i]->sum("total_unit") : 0);
            array_push($units_sale, ($i <= count($sale)) ? $sale[$i]->sum("total_unit") : 0);
        }

        $data = [
            'totalPurchase' => $total_purchase,
            'totalSale' => $total_sale,
            'unitsPurchase' => $units_purchase,
            'unitsSale' => $units_sale,
        ];

        return Inertia::render('Dashboard', ["data" => $data]);
    }
}
