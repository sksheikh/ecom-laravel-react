<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Imagick\Driver;

class ProductController extends Controller
{
    public function index() {
        $products = Product::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ],200);
    }

    public function store(Request $request)
    {
        $validator  = Validator::make($request->all(), [
            'title' => 'required|unique:products,title',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        DB::beginTransaction();
        try {
            $product = new Product();
            $product->title = $request->title;
            $product->price = $request->price;
            $product->compare_price = $request->compare_price;
            $product->category_id = $request->category;
            $product->brand_id = $request->brand;
            $product->sku = $request->sku;
            $product->qty = $request->qty;
            $product->description = $request->description;
            $product->short_description = $request->short_description;
            $product->barcode = $request->barcode;
            $product->is_featured = $request->is_featured;
            $product->status = $request->status;
            $product->save();

            if (!empty($request->gallery)) {
                foreach ($request->gallery as $key => $tempImageId) {
                    $tempImage = TempImage::find($tempImageId);

                    if (!$tempImage) {
                        throw new \Exception("Temp image not found");
                    }

                    // Large thumbnail
                    $extArray = explode('.', $tempImage->name);
                    $ext = end($extArray);
                    $imageName = $product->id . '-' . time() . '.' . $ext;

                    $manager = new ImageManager(Driver::class);
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                // dd($img);
                    $img->scaleDown(1200);
                    $img->save(public_path('uploads/products/large/' . $imageName));

                    // Small thumbnail
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->coverDown(400, 460);
                    $img->save(public_path('uploads/products/small/' . $imageName));

                    if ($key == 0) {
                        $product->image = $imageName;
                        $product->save();
                    }
                }
            }

            DB::commit(); // Commit transaction if everything is successful

            return response()->json([
                'status' => 200,
                'message' => 'Product has been created successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction if any error occurs
            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id) {
        $product = Product::find($id);
        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ],404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product
        ],200);
    }

    public function update($id, Request $request) {
        $product = Product::find($id);
        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ],404);
        }

        $validator  = Validator::make($request->all(), [
            'title' => 'required|unique:products,title,'.$id.',id',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku,'.$id.'id',
            'is_featured' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->barcode = $request->barcode;
        $product->is_featured = $request->is_featured;
        $product->status = $request->status;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product has been updated successfully'
        ], 200);
    }

    public function destroy($id) {
        $product = Product::find($id);
        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ],404);
        }

        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Product has been deleted successfully'
        ],200);
    }
}
