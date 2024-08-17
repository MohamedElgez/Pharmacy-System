<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

// Models
use Illuminate\Http\Request;
use App\Models\categories;
use App\Models\clientes;
use App\Models\item_purchas_invoice;
use App\Models\items_purchas_return_invoice;
use App\Models\items_sales_bill;
use App\Models\Item;
use App\Models\purchas_return_invoice;
use App\Models\purchases_bill;
use App\Models\sales_bill;
use App\Models\sales_man;
use App\Models\suppliers;
use App\Models\unites;
use App\Models\User;

// =========== Resources ==================
use App\Http\Resources\UserResource;
use App\Http\Resources\clientResource;
use App\Http\Resources\purchasResource;
use App\Http\Resources\suplierResource;

// =========== Requests ==================
use App\Http\Requests\clientRequest;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class clientController extends Controller
{
    function index()
    {
        try {

            $data = clientes::orderBy('id')->paginate(config('constant.paginate_ten'));
            return  clientResource::collection($data);
        } catch (Exception $e) {
            return response()->json($e->getmessage());
        }
    }
    // ============================================================
    // ===========  store ==================================
    // ============================================================

    /**
     *
     * @param Request $request
     *  * name string
     *code integer
     *adress string
     *city  string
     * phone number
     *mobile number
     * @return void
     */
    public function store(clientRequest $request)
    {

        $rules = $request->validate($request->rules());

        $validate = Validator::make((array)$request, $rules);

        if ($validate->fails()) {
            return response()->json(["errors" => $validate->errors()]);
        } else {


            try {
                clientes::create([
                    'name' => $request->name,
                    'adress' => $request->adress,
                    'city' => $request->city,
                    'phone' => $request->phone,
                    'mobile' => $request->mobile,
                ]);
                return Response()->json("OK");
            } catch (Exception $e) {
                return  $e->getMessage();
            }
        }
    }

    // ========================================================
    // =========== edite  ==================================
    // ============================================================
    function edite($id)
    {
        if ($id) {
            try {

                $suplier_data = clientes::find($id);
                if ($suplier_data != null){
                    return new clientResource($suplier_data);
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

    function update(clientRequest $request, $id)
    {

        if ($id) {

            $rules = $request->validate($request->rules());

            $validate = Validator::make((array)$request, $rules);

            if ($validate->fails()) {
                return response()->json(["errors" => $validate->errors()]);
            } else {

            try {
                $suplier_id = clientes::find($id);
                if($suplier_id){
                $suplier_id->update([
                    'name' => $request->name,
                    'code' => $request->code,
                    'adress' => $request->adress,
                    'city' => $request->city,
                    'phone' => $request->phone,
                    'mobile' => $request->mobile,
                ]);

                return response()->json("OK");
            } else {
                return response()->json("ID value Not Found in DB !!");

            }
            } catch (Exception $e) {
                return response()->json($e->getmessage());
            }
          }
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

                $suplier_id = clientes::find($id);
                if($suplier_id){

                    $suplier_id->delete();
                    return response()->json("OK");
                }else{
                    return response()->json("ID value Not Found in DB !!");

                }
            } catch (Exception $e) {
                return response()->json($e->getmessage());
            }
        } else {
            return response()->json("Missed 'id' parame");
        }
    }
}//end classs
