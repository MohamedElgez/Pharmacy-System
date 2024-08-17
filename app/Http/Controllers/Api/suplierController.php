<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use FFI\Exception;
// use Illuminate\Http\Request;
use Illuminate\Http\Request;
use App\Http\Requests\suplierRequest;

// Models
use App\Models\categories;
use App\Models\clientes;
use App\Models\item_purchas_invoice;
use App\Models\items_purchas_return_invoice;
use App\Models\items_sales_bill;
use App\Models\Item;
use App\Models\purchas_return_invoice;
use App\Models\purchases_invoice;
use App\Models\sales_bill;
use App\Models\sales_man;
use App\Models\suppliers;
// use App\Models\unites;
// use App\Models\User;

// =========== Resources ==================
// use App\Http\Resources\UserResource;
// use App\Http\Resources\clientResource;
// use App\Http\Resources\purchasResource;
use App\Http\Resources\suplierResource;
use GuzzleHttp\Psr7\Response;
use JsonResponse;

use Illuminate\Support\Facades\Validator;


class suplierController extends Controller
{
  
    function index()
    {
        try {

            $supllier_data = suppliers::orderBy('id')->paginate(config('constant.paginate_ten'));
            return  suplierResource::collection($supllier_data);
        } catch (Exception $e) {
            return response()->json($e->getmessage());
        }
    }
    // ============================================================
    // ===========  store ==================================
    // ============================================================

    public  function store(suplierRequest $request)
    {
        // Request validation
        $rules = $request->validate($request->rules());

        $validate = Validator::make((array)$request, $rules);

        if ($validate->fails()) {
            return response()->json(["errorssss" => $validate->errors()]);
        } else {

        try {
            suppliers::create([
                'name' => $request->name,
                'code' => $request->code,
                'adress' => $request->adress,
                'city' => $request->city,
                'phone' => $request->phone,
                'mobile' => $request->mobile,
            ]);
            return response()->json("OK");
            // }
        } catch (Exception $e) {
            return  $e->getMessage();
        }}
    }

    // ========================================================
    // =========== edite  ==================================
    // ============================================================
    function edite($id)
    {
        if ($id) {
            try {

                $suplier_data = suppliers::find($id);
                if ($suplier_data != null) {

                    return new suplierResource($suplier_data);
                } else {
                    return response()->json("ID Value Not found in DB");
                }
            } catch (Exception $e) {
                return response()->json($e->getmessage());
            }
        } else {
            return response()->json("Missed 'id' parame");
        }
    }
    // ============================================================
    // =========== update  ==================================
    // ============================================================

    function update(suplierRequest $request, $id)
    {

        if ($id) {
            $rules = $request->validate($request->rules());

            $validate = Validator::make((array)$request, $rules);

            if ($validate->fails()) {
                return response()->json(["errors" => $validate->errors()]);
            } else {
            try {

                $suplier_id = suppliers::find($id);
                $suplier_id->update([
                    'name' => $request->name,
                    'code' => $request->code,
                    'adress' => $request->adress,
                    'city' => $request->city,
                    'phone' => $request->phone,
                    'mobile' => $request->mobile,
                ]);
                return response()->json("OK");
            } catch (Exception $e) {
                return response()->json($e->getmessage());
            }}
        } else {
            return response()->json("Missed 'id' parame");
        }
    }
    // ============================================================
    // =========== Delete  ==================================
    // ============================================================

    function Delete($id)
    {
        if ($id) {

            try {
                $suplier_id = suppliers::find($id);
                if ($suplier_id) {
                    $suplier_id->delete();

                    return response()->json("OK");
                } else {
                    return response()->json("ID value Not Found in DB !!");
                }
            } catch (Exception $e) {
                // return "return";
                return response()->json($e->getmessage());
            }
        } else {
            return response()->json("Missed 'id' parame");
        }
    }

      // ============================================================
    // =========== Models Relation   ==================================
    // ============================================================


}// end class
