<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('admin/login', [AuthController::class, 'authenticate']);
Route::get('get-latest-products',[FrontProductController::class, 'latestProducts']);
Route::get('get-featured-products',[FrontProductController::class, 'featuredProducts']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function(){
    // Route::get('categories', [CategoryController::class, 'index']);
    // Route::get('categories/{id}', [CategoryController::class, 'show']);
    // Route::post('categories/{id}', [CategoryController::class, 'update']);
    // Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
    // Route::post('categories/store', [CategoryController::class, 'store']);

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('brands', BrandController::class);
    Route::get('sizes', [SizeController::class, 'index']);
    Route::apiResource('products', ProductController::class);
    Route::post('temp-images', [TempController::class, 'store']);
    Route::post('save-product-image', [ProductController::class, 'saveProductImage']);
    Route::get('change-product-default-image',[ProductController::class, 'updateDefaultImage']);
    Route::delete('product-image-delete/{id}', [ProductController::class, 'deleteProductImage']);

});
