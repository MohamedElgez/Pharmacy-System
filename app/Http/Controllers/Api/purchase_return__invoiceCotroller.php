<?php

namespace App\Http\Controllers\Api;

use App\Models\Item;
use App\Models\User;
use App\Models\sales_man;
use App\Models\suppliers;
use Illuminate\Http\Request;
use App\Models\purchases_invoice;
use App\Http\Controllers\Controller;
use App\Models\item_purchas_invoice;
use App\Models\purchas_return_invoice;
use App\Models\items_purchas_return_invoice;
use App\Http\Controllers\Api\reportsController;

// use App\Models\items_purchas_return_invoice;
class purchase_return__invoiceCotroller extends Controller
{
    private $invoice_table = "purchas_return_invoice";
    private $item_invoice_table = "items_purchas_return_invoice";
    private $invoice_table_forinKey = "purchas_invoice_return_id";
    public function check_invoice_Validat()
    {

        $validator = [

            "code" => ["required", 'exists:purchases_invoice,code'],
            "total" => ["required", config("constant.DoubleNumRegex")],
            // config("constant.phone")
            // "total_after_sale" => ["required", "integer"],
            "paid" => ["required", config("constant.DoubleNumRegex")],
            "remaind" => [config("constant.DoubleNumRegex")],
            "supplier_id" => ["required", "integer",'exists:suppliers,id'],
            "user_id" => ["required", "integer",'exists:users,id'],
            "Date" => ["required", "date_format:Y-m-d"],
            "payment_type" => ["required",'regex:/^[0-9]$/'],
        ];
        return $validator;
    }
// ======================================================
// ======================= check_item_Validat ===================
// ======================================================
    public function check_item_Validat()
    {
        //  creat validation rules
        $validator = [
            "item_id" => ["required",'exists:items,id'],
            "quantity" => ["required", config("constant.qty")],

            //  "vat"=>[config("constant.DoubleNumRegex")],
        ];

        return $validator;
    }
    // ================================================================
    // ================ Store ===========================
    // =================================================================
    public function index()
    {

        // $suplier_data = suppliers::select("id", "name")->orderBy('id',"desc")->get();

        try {
            $purchas_invoie = purchas_return_invoice::with("items_invoice","get_user", "get_supplier")->orderBy('id')->paginate(config('constant.paginate_ten'));

            return response()->json($purchas_invoie);
        } catch (Exception $e) {
            return response()->json($e->getmessage());
        }
    }
    // ====================================================================
    // ========== Add ==========================================
    // ===========================================================
    public function add(Request $request)
    {

     return  parentController::add($request, "purchases_invoice",["items_invoice","get_supplier","get_user"],$this->invoice_table_forinKey);


    }
    // ============================================================
    // ===========  store ==================================
    // ============================================================
    public function store(Request $requests)
    {

        $invoice_rules = $this->check_invoice_Validat();

        $item_rules = $this->check_item_Validat();
        // $requests->except(["purchaseItems"]['id']);
        return parentController::store($requests, $invoice_rules, $item_rules, $this->invoice_table, $this->item_invoice_table, $this->invoice_table_forinKey);

    }
    // ========================================================
    // =========== edite  ==================================
    // ============================================================
    public function edite($id)
    {
        if ($id) {
            try {

                $suplier_data = suppliers::select("id", "name")->orderBy('id',"desc")->get();

                $purchas_return_invoice_data = purchas_return_invoice::find($id);

                $item_purchas_return_invoice_data = items_purchas_return_invoice::where("purchas_invoice_return_id", $id)->orderBy('id',"desc")->get();

                if ($purchas_return_invoice_data && $purchas_return_invoice_data && $suplier_data) {
                    return response()->json([
                        "purchas_return_invoice_data" => $purchas_return_invoice_data,
                        "item_purchas_return_invoice_data" => $item_purchas_return_invoice_data,
                        "suplier_data" => $suplier_data,
                    ]);
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

    public function update(Request $requests, $id)
    {
        $invoice_rules = $this->check_invoice_Validat();

        $item_rules = $this->check_item_Validat();

        return parentController::update($id, $requests, $invoice_rules, $item_rules, $this->invoice_table, $this->item_invoice_table, $this->invoice_table_forinKey);

    }
    // ============================================================
    // =========== Delete  ==================================
    // ============================================================

    public function Delete($id)
    {
        return parentController::delete($id, $this->invoice_table, $this->item_invoice_table, $this->invoice_table_forinKey);

    }

    //   ==============================================================
    //   ===== purchase invoice Details ======
// ===================================================================

    public function invoic_details($id)
    {
        $invoice = purchas_return_invoice::with('get_supplier', 'get_user')->find($id);
        return response()->json(["invoice" => $invoice]);

    }
    // =============================================================
    // invoice report
    // ================================================================
    public function Report(Request $request){
        return reportsController::reports($request,$this->invoice_table, $this->item_invoice_table,["purchas_return_invoice","items"]);
    }
}
