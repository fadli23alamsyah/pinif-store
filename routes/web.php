<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\VariantController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catalog', [HomeController::class, 'catalog'])->name('catalog');

Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/filter_cost', [DashboardController::class, 'filter_cost'])->name('dashboard.filterCost');
    Route::get('/dashboard/filter_units', [DashboardController::class, 'filter_units'])->name('dashboard.filterUnits');

    // Invoice
    Route::get('/invoice', [InvoiceController::class, 'index'])->name('invoice');
    Route::post('/invoice', [InvoiceController::class, 'store'])->name('invoice.store');
    Route::put('/invoice', [InvoiceController::class, 'update'])->name('invoice.update');
    Route::delete('/invoice', [InvoiceController::class, 'destroy'])->name('invoice.destroy');
    Route::get('/invoice/add/', [InvoiceController::class, 'add'])->name('invoice.add');
    Route::get('/invoice/edit/{invoice}', [InvoiceController::class, 'edit'])->name('invoice.edit');

    // Supplier
    Route::get('/supplier', [SupplierController::class, 'index'])->name('supplier');
    Route::post('/supplier', [SupplierController::class, 'store'])->name('supplier.store');
    Route::put('/supplier', [SupplierController::class, 'update'])->name('supplier.update');
    Route::delete('/supplier', [SupplierController::class, 'destroy'])->name('supplier.destroy');
    Route::get('/supplier/add', [SupplierController::class, 'add'])->name('supplier.add');
    Route::get('/supplier/edit/{supplier}', [SupplierController::class, 'edit'])->name('supplier.edit');

    // Product
    Route::get('/product', [ProductController::class, 'index'])->name('product');
    Route::post('/product', [ProductController::class, 'store'])->name('product.store');
    Route::put('/product', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/product', [ProductController::class, 'destroy'])->name('product.destroy');
    Route::get('/product/add', [ProductController::class, 'add'])->name('product.add');
    Route::get('/product/edit/{product}', [ProductController::class, 'edit'])->name('product.edit');

    // Brand
    Route::get('/brand', [BrandController::class, 'index'])->name('brand');
    Route::post('/brand', [BrandController::class, 'store'])->name('brand.store');
    Route::put('/brand', [BrandController::class, 'update'])->name('brand.update');
    Route::delete('/brand', [BrandController::class, 'destroy'])->name('brand.destroy');
    Route::get('/brand/add', [BrandController::class, 'add'])->name('brand.add');
    Route::get('/brand/edit/{brand}', [BrandController::class, 'edit'])->name('brand.edit');

    // Category
    Route::get('/category', [CategoryController::class, 'index'])->name('category');
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
    Route::put('/category', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category', [CategoryController::class, 'destroy'])->name('category.destroy');
    Route::get('/category/add', [CategoryController::class, 'add'])->name('category.add');
    Route::get('/category/edit/{category}', [CategoryController::class, 'edit'])->name('category.edit');

    // Variant
    Route::get('/variant', [VariantController::class, 'index'])->name('variant');
    Route::post('/variant', [VariantController::class, 'store'])->name('variant.store');
    Route::put('/variant', [VariantController::class, 'update'])->name('variant.update');
    Route::delete('/variant', [VariantController::class, 'destroy'])->name('variant.destroy');
    Route::get('/variant/add', [VariantController::class, 'add'])->name('variant.add');
    Route::get('/variant/edit/{variant}', [VariantController::class, 'edit'])->name('variant.edit');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
