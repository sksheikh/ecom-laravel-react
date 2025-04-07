<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use App\Models\ProductSize;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Imagick\Driver;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->with(['product_images', 'product_sizes'])
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
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

            if (!empty($request->sizes)) {
                foreach ($request->sizes as $sizeId) {
                    $productSize = new ProductSize();
                    $productSize->size_id = $sizeId;
                    $productSize->product_id = $product->id;
                    $productSize->save();
                }
            }

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

                    $productImage =  new ProductImage();
                    $productImage->image = $imageName;
                    $productImage->product_id = $product->id;
                    $productImage->save();

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

    public function show($id)
    {
        $product = Product::with(['product_images', 'product_sizes'])
            ->find($id);


        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        $productSizes = $product->product_sizes->pluck('size_id');

        return response()->json([
            'status' => 200,
            'data' => $product,
            'productSizes' => $productSizes
        ], 200);
    }

    public function update($id, Request $request)
    {
        $product = Product::find($id);
        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        $validator  = Validator::make($request->all(), [
            'title' => 'required|unique:products,title,' . $id . ',id',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku,' . $id . 'id',
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

        if (!empty($request->sizes)) {
            ProductSize::where('product_id', $product->id)->delete();
            foreach ($request->sizes as $sizeId) {
                $productSize = new ProductSize();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product has been updated successfully'
        ], 200);
    }

    public function destroy($id)
    {
        $product = Product::with('product_images')->find($id);
        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        if ($product->product_images()) {
            foreach ($product->product_images as $key => $productImage) {
                File::delete(public_path('uploads/products/large/' . $productImage->image));
                File::delete(public_path('uploads/products/small/' . $productImage->image));
            }
        }

        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Product has been deleted successfully'
        ], 200);
    }

    public function saveProductImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // $directory = "uploads/temp/";
        $image = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension();
        // $image->move(public_path($directory),$imageName);

        // Large thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        // dd($img);
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        // Small thumbnail
        $img = $manager->read($image->getPathname());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        //store product image in productImage table
        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully',
            'data' => $productImage
        ], 200);
    }

    public function updateDefaultImage(Request $request)
    {
        // dd($request->all());
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product default image changed successfully'
        ], 200);
    }

    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);

        if ($productImage == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Image not found'
            ], 404);
        }

        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product image deleted successfully'
        ], 200);
    }
}
