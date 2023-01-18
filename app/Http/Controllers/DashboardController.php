<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        $year = date('Y');

        $chart_cost = $this->_chart_cost($year);
        $chart_units = $this->_chart_units($year);

        $filter_year = Invoice::selectRaw('DISTINCT YEAR(date) as year')->orderBy("year", "desc")->get()->toArray();
        $filter_year = array_column($filter_year, "year");

        if(!in_array($year, $filter_year)){
            array_unshift($filter_year, $year);
        }

        $chart_dashboard = [
            ...$chart_cost,
            ...$chart_units,
        ];

        return Inertia::render('Dashboard', ["chart" => $chart_dashboard, "filterYear" => $filter_year]);
    }

    public function filter_cost(Request $request){
        $chart_cost = $this->_chart_cost($request->filter);
        return response()->json($chart_cost);
    }

    public function filter_units(Request $request){
        $chart_units = $this->_chart_units($request->filter);
        return response()->json($chart_units);
    }

    private function _chart_cost($year){
        $purchase = Invoice::selectRaw('MONTH(date) as month, invoices.*')
            ->whereNotNull('supplier_id')->whereRaw("YEAR(date) = ? ", [$year])
            ->withSum("transactions as total_unit","unit")->get()->groupBy('month');
        $sale = Invoice::selectRaw('MONTH(date) as month, invoices.*')
            ->whereNotNull('customer_id')->whereRaw("YEAR(date) = ? ", [$year])
            ->withSum("transactions as total_unit","unit")->get()->groupBy('month');

        $total_purchase = [];
        $total_sale = [];
        // index 1-12 month
        for($i=1; $i <= 12; $i++){
            array_push($total_purchase, ($i <= count($purchase)) ? $purchase[$i]->sum("total") : 0);
            array_push($total_sale, ($i <= count($sale)) ? $sale[$i]->sum("total") : 0);
        }

        return [
            'totalPurchase' => $total_purchase,
            'totalSale' => $total_sale,
        ];
    }

    private function _chart_units($year){
        $purchase = Invoice::selectRaw('MONTH(date) as month, invoices.*')
            ->whereNotNull('supplier_id')->whereRaw("YEAR(date) = ? ", [$year])
            ->withSum("transactions as total_unit","unit")->get()->groupBy('month');
        $sale = Invoice::selectRaw('MONTH(date) as month, invoices.*')
            ->whereNotNull('customer_id')->whereRaw("YEAR(date) = ? ", [$year])
            ->withSum("transactions as total_unit","unit")->get()->groupBy('month');

        $units_purchase = [];
        $units_sale = [];
        // index 1-12 month
        for($i=1; $i <= 12; $i++){
            array_push($units_purchase, ($i <= count($purchase)) ? $purchase[$i]->sum("total_unit") : 0);
            array_push($units_sale, ($i <= count($sale)) ? $sale[$i]->sum("total_unit") : 0);
        }

        return [
            'unitsPurchase' => $units_purchase,
            'unitsSale' => $units_sale,
        ];
    }
}
