<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

// Modle
use App\Models\clientes;
use App\Models\Item;
use App\Models\New_item;
use App\Models\suppliers;
use App\Models\purchases_invoice;
use App\Models\sales_bill;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\Global_;

class parentController extends Controller
{
    // Variables
    private const Model_path = "App\Models\\";
// ======================================================
// ======================= Validation ===================
// ======================================================

    public static function check_Validation($request, $rules = [])
    {
        // $rules=self::invoice_rule();
        $validator = Validator::make($request, $rules);

        return $validator;
    }
    // ======================================================
    /** invoice_due
     * store payment due in su]lier or client Modle
     * accept $invoice => the model name
     * $invoice_id => the Model id as forign key
     */
    // ======================================================
    public static function invoice_due($invoice, $invoice_id)
    {
        $model = self::Model_path . $invoice;
        if (($invoice == "purchases_invoice")) {
            // $data = $model::where("supplier_id", $invoice_id->supplier_id)->get();
            $data = $model::find($invoice_id->id);
            $supplier = suppliers::find($invoice_id->supplier_id);

            $remaind = $data->remaind+$supplier->remaining_debt;
            if ($supplier){
                $supplier->update(["remaining_debt" => $remaind]);
            }
        }elseif(($invoice == "purchas_return_invoice")){

            $data = $model::find($invoice_id->id);
            $supplier = suppliers::find($invoice_id->supplier_id);
            $remaind = $supplier->remaining_debt - $data->total;

            if ($supplier){
                $supplier->update(["remaining_debt" => $remaind]);
            }
        } elseif (($invoice == "sales_bill")) {

            $data = $model::find($invoice_id->id);
            $client = clientes::find($invoice_id->client_id);
            $remain =  $client->remaining_debt + $data->total;
            if ($client) {
                $client->update(["remaining_debt" => $remain]);
            }
        }elseif(($invoice == "sales_return_bill")){

            $data = $model::findorfail($invoice_id->id);
            $client = clientes::findorfail($invoice_id->client_id);
            $remain =  $client->remaining_debt - $data->total;
            if ($client) {
                $client->update(["remaining_debt" => $remain]);
            }
        }

    }
// ===================================================================
// Change item quntity in sale or purchase
// ===================================================================
    public static function item_quntity($invoice,$request)
    {
        if (($invoice == "sales_bill") || ($invoice == "purchas_return_invoice")){

            $item = Item::find($request["item_id"]);
            $new_qty = $item->quantity - $request["quantity"];

            $item->update([
                "quantity" => $new_qty

            ]);

        } else if (($invoice == "purchases_invoice") || ($invoice == "sales_return_bill")) {

            $item = Item::find($request["item_id"]);

            if($item){
                $new_qty = $item->quantity + $request["quantity"];
                $item->update([ "quantity" => $new_qty]);
            }
        }
    }
    // ===================================================
    // update item price
    //=======================================================
    public static function update_item_price($invoice,$request){
        if(($invoice == "purchases_invoice") ){
            $item = Item::find($request["item_id"]);
            if($item){
                $item->update([ "price" => $request["sell_price"]]);
            }
        }
    }
// =======================================================================
// ========== new item quanity
// =======================================================================
public static function new_item_quantity($invoice,$request,$invoice_id){

if($invoice=="purchases_invoice"){
    // create new item with data
    if($invoice_id->code){
    New_item::create([
        "item_id"=>$request["item_id"],
        "expire_date"=>$request["expire_date"],
        "quantity"=>$request["quantity"],
        "purchase_code"=>$invoice_id->code
    ]);
    }
}else if($invoice == "purchas_return_invoice"){
    // decrement new item quntity by purchase_id
    if($invoice_id->code){
        $new_item=New_item::where("item_id",$request["item_id"])->where("purchase_code",$invoice_id->code)->orderBy("expire_date")->first();
        if($new_item){
            $new_quantityy= $new_item->quantity + $request["quantity"];
            $new_item->update([
                "quantity"=>$new_quantityy
            ]);
        }
    }
}else if($invoice == "sales_bill"){
                // decrement new item quntity
    $new_item=New_item::where("item_id",$request["item_id"])->orderBy("expire_date")->first();
    if($new_item){
    $new_quantity= $new_item->quantity-$request["quantity"];
    $new_item->update([
        "quantity"=>$new_quantity
    ]);
}
}else if($invoice == "sales_return_bill"){
// increment new item quntity
$new_item=New_item::where("item_id",$request["item_id"])->orderBy("expire_date")->first();
if($new_item){
    $new_quantity= $new_item->quantity+$request["quantity"];
    $new_item->update([
        "quantity"=>$new_quantity
    ]);
}
}

}
// ========================================================================
//  ADD
// ========================================================================
public static function add($request,$invoice,$relation,$forignKey){

    // ==================== cal Modles path =====================
            $model = self::Model_path . $invoice;
            // $model_item = self::Model_path . $invoice_item;
            $supplier_table=self::Model_path."suppliers";
            $User_table=self::Model_path."User";
            $Item_table=self::Model_path."Item";

    // ==================== Modles Query ==========================
        $suplier_data = $supplier_table::orderBy("id","desc")->get();
        $sales_man =  $User_table::orderBy("id","desc")->get();
        $items = $Item_table::orderBy("id","desc")->get();
        // $invoice_data= $model::orderBy("id","desc")->get();
    // =================== if request have id return invoice details ================================

    // ==================================================

        // if($invoice=="purchases_invoice"){
            $invoice_relation_data= $model::with($relation)->orderBy("id","desc")->get();
        // }elseif($invoice=="sales_bill"){
            // $invoice_relation_data=$model::with("items_invoice")->orderBy("id","desc")->get();
        // }

    return response()->json([
        "items" => $items,
        //  "supplier" => $suplier_data,
        //   "sales_man" => $sales_man,
          "purchas_data"=>$invoice_relation_data
        ]);
}
// ==========================================================================
// ==========  Store  =============
/** Store
 * store invoice details in any of invlice table
 * accept parames :
 * $request => the Request data
 * $incoive_rules => the validation request rules of invoice
 * $item_rules => the validation request rules of item invoice
 * $invoice => name of incoive table
 * $invoice_item => name of item incoive table
 * $foriegkey => forignkey of invoice in item invoice
 */
// ==========================================================================
    public static function store($requests, $incoive_rules, $item_rules, $invoice, $invoice_item, $foriegkey)
    {
        // return response()->json($requests[]);
        $model = self::Model_path . $invoice;
        $model_item = self::Model_path . $invoice_item;

        if ($requests->isJson()) {
            $req = json_decode($requests->getContent(), true);
            try {
                if ($req !== null) {

                    $invoice_validate = self::check_Validation($req[0], $incoive_rules);
                    if ($invoice_validate->fails()) {return response()->json($invoice_validate->errors(), 422);} //return error

                    // $item_key =  ? "purchaseItems" : "salesItems";
                        if(array_key_exists("purchaseItems", $req[0])){
                            $item_key ="purchaseItems";
                        }else if(array_key_exists("salesItems", $req[0])){
                            $item_key ="salesItems";
                        }else{
                            return response()->json(["AllItem_Errors"=>"Item Key Not Found ,shuld by [purchaseItems'||'salesItems'] only !!"], 422);
                        }
                        foreach ($req[0][$item_key] as $request) {
                            // check validate
                        $item_validator = self::check_Validation($request, $item_rules); //check validate
                        if ($item_validator->fails()) {return response()->json(["Item_Error"=>$item_validator->errors()], 422);} //return error
                        }

                    $invoice_id = $model::create($req[0]);

                    // ================ store remain payment in supplier || client Model =======================================
                    self::invoice_due($invoice, $invoice_id);
                    // =======================================================
                    $i =0;
                    foreach ($req[0][$item_key] as $request) {

                        // return
                        unset($req[0][$item_key][$i]["id"]);

                        // if(in_array($req[0]["Date"],$req[0])){

                        //     $model_item::create(array_merge($req[0][$item_key][$i],
                        //      [
                        //         $foriegkey => $invoice_id->id,
                        //         "created_at" =>$req[0]["Date"]
                        //      ]
                        //     ));

                        // }else{

                            $model_item::create(array_merge($req[0][$item_key][$i], [$foriegkey => $invoice_id->id]));
                        // }
                        self::new_item_quantity($invoice,$request,$invoice_id);
                        self::item_quntity($invoice, $request);
                        self::update_item_price($invoice,$request);

                        $i++;
                    }

                    return response()->json("OK");
                }
            } catch (Exception $e) {
                return $e->getMessage();
            }

        } else {
            return response()->json("request in Not json ");
        }
    }
// ==========================================================================
    /** update
     * store invoice details in any of invlice table
     * accept parames :
     * $request => the Request data
     * $incoive_rules => the validation request rules of invoice
     * $item_rules => the validation request rules of item invoice
     * $invoice => name of incoive table
     * $invoice_item => name of item incoive table
     * $foriegkey => forignkey of invoice in item invoice
     */
// ==========================================================================
    public static function update($id, $requests, $incoive_rules, $item_rules, $invoice, $invoice_item, $foriegkey)
    {

        $model = self::Model_path . $invoice;
        $model_item = self::Model_path . $invoice_item;

        $purchases_invoice = $model::findorfail($id);

        if ($requests->isJson()) {
            $req = json_decode($requests->getContent(), true);
            try {
                if ($req !== null) {

                    $invoice_validate = self::check_Validation($req[0], $incoive_rules);
                    if ($invoice_validate->fails()) {return response()->json($invoice_validate->errors(), 422);} //return error

                    $item_key = array_key_exists("purchaseItems", $req[0]) ? "purchaseItems" : "salesItems";
                    $i = 0;

                    if ($purchases_invoice) {
                        $purchases_invoice->update($req[0]); //update invoice data
                    }

                    foreach ($req[0][$item_key] as $request) {

                        $item_validator = self::check_Validation($request, $item_rules); //invoice validate

                        if ($item_validator->fails()) {return response()->json($item_validator->errors(), 422);} //return error

                        $item_purchas_invoice = $model_item::where("item_id", $request["item_id"])->where($foriegkey, $id)->first();
                        if ($item_purchas_invoice) {
                            $item_purchas_invoice->update(array_merge($req[0][$item_key][$i++], [$foriegkey => $id]));
                        } else {
                            return response()->json("item ID Not Find in DB");
                        }

                    }

                    return response()->json("OK");
                }

            } catch (Exception $e) {
                return $e->getMessage();
            }

        } else {
            return response()->json("request in Not json ");
        }
    }
// ==========================================================================
// ==========  Delete   =============
// ==========================================================================

    public static function delete($id, $invoice, $invoice_item, $foriegkey)
    {
        if ($id) {

            try {
                $model = self::Model_path . $invoice;
                $model_item = self::Model_path . $invoice_item;

                $purchases_invoice = $model::find($id);
                if ($purchases_invoice) {
                    $purchases_invoice->delete();
                    $model_item::where($foriegkey, $id)->delete();
                    return response()->json("OK");
                } else {

                    return response()->json("ID value Not found in DB");
                }

            } catch (Exception $e) {

                return response()->json($e->getmessage());
            }
        } else {
            return response()->json("Missed 'id' parame");
        }
    }
    // =========================================================================
    // Reports
    // =========================================================================
    public function reports($request,$invoice,$invoice_item)
    {
        $rules = [
            "from" => ["required", config("constant.DateFormat")],
            "to" => config("constant.DateFormat") | '',
        ];

        $validator = self::check_Validation($request->all(), $rules);
        if ($validator->fails()) {return response()->json($validator->errors(), 422);}
        $model = self::Model_path . $invoice;
        $model_item = self::Model_path . $invoice_item;
        $date=$request->to?[$request->from,$request->to]:$request->from;

            $report_data = $model_item::with("purchas_invoice", "items")->whereBetween('created_at',  $date)->orderBy('id',"desc")->paginate(config("constant.paginate_ten"));
            $qty = $model_item::whereBetween('created_at', $date)->groupBy("item_id")->sum("quantity");
            $total =$model::whereBetween('created_at', $date)->sum("total");
            $remaind =$model::whereBetween('created_at', $date)->sum("paid");
            $paied=$model::whereBetween('created_at', $date)->sum("remaind");

        return response()->json([
            "total" => $total,
            "remaind" => $remaind,
            "paied" => $paied,
            "quntity" => $qty,
            // "quntity" => $quntity,
            "report_data" => $report_data,
            ]);
}
}
