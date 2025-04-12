<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(){
        $orders = Order::orderBy('created_at','DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $orders
        ],200);
    }

    public function details($id){
        $order = Order::with(['items','items.product'])->find($id);

        if($order == null){
            return response()->json([
                'status' => 404,
                'message' => 'Order not found'
            ],404);
        }

        return response()->json([
            'status' => 200,
            'data' => $order
        ],200);
    }
}
