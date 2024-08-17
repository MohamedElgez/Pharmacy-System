<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Traits\ApiTrait;
use App\Models\suppliers;
use App\Models\item_order;
use App\Models\order_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    use ApiTrait;
    public function index()
    {
        $orders = Order::Paginate(10);
        return $this->DataResponse(compact("orders"), "get orders successfully");
    }
    // show order
    public function getOne(Request $request, $id)
    {
        $order = Order::with("supplier", "user", "items")->find($id);
        if (!$order) {
            return $this->ErrorResponse(["order" => "this order id dosen't exist in database"], "order not exist", 404);
        } else {
            return $this->dataResponse(compact("order"));
        }
    }
    // add 
    public function add(Request $request)
    {
        $suppliers = suppliers::select("id", "name")->get();
        $categories = Category::select("id", "name")->get();
        return $this->dataResponse(["suppliers" => $suppliers, "categories" => $categories]);
    }
    // create 
    public function create()
    {  
        
    } 
    public function changeStatus(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return $this->ErrorResponse(["order" => "this order id dosen't exist in database"], "order not exist", 404);
        } else {
            $validator = Validator::make($request->all(), [
                'status' => 'required|in:[0,1,2]',
            ]);
            if ($validator->fails()) {
                return $validator->errors();
            }
            $order->status = $validator->validated()["status"];
            $order->save();
            return $this->dataResponse(compact("order"));
        }
    }
    // delete
    public function destory(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return $this->ErrorResponse(["order" => "this order id dosen't exist in database"], "order not exist", 404);
        } else {
            $data = $order;
            $order->delete();
            item_order::where("order_id", "=", $id)->delete();
            return $this->successResponse("success delete order and it's item", ["order" => $data]);
        }
    }
}
