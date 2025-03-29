<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class TempController extends Controller
{
    public function store(Request $request){
        // dd('ok');
        $validator = Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpeg,png,jpg'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=> 400,
                'errors' => $validator->errors()
            ],400);
        }

        $tempImage = new TempImage();
        $tempImage->name = 'dummy name';
        $tempImage->save();

        $directory = "uploads/temp/";
        $image = $request->file('image');
        $imageName = time().'.'.$image->extension();
        $image->move(public_path($directory),$imageName);

        $tempImage->name = $imageName;
        $tempImage->save();
        // dd('ok');
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path($directory.$imageName));
        $img->coverDown(400,450);
        $img->save(public_path($directory.'thumb/'.$imageName));

        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully',
            'data' => $tempImage
        ],200);


    }
}
