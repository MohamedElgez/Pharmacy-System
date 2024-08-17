<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

// Models
// use App\Models\sales_man;
use App\Models\Item;

// =========== Resources ==================
use App\Models\item_purchas_invoice;
use App\Models\purchases_invoice;
use App\Models\suppliers;
use Illuminate\Http\Request;

// use
// use App\Http\Controllers\Api\parentController;

class purchasInvoiceController extends Controller
{
    private $invoice_table = "purchases_invoice";
    private $item_invoice_table = "item_purchas_invoice";
    private $invoice_table_forinKey = "purchases_invoice_id";

    // ======================================================
// ======================= check_Validat ===================
// ======================================================
    public function check_invoice_Validat()
    {
        //  creat validation rules

        $validator = [
            "code" => ["required", "unique:purchases_invoice,code"],
            "total" => ["required", config("constant.DoubleNumRegex")],
            "paid" => ["required", config("constant.DoubleNumRegex")],
            "remaind" => [config("constant.DoubleNumRegex")],
            "supplier_id" => ["required", "integer", 'exists:suppliers,id'],
            "user_id" => ["required", "integer", 'exists:users,id'],
            "details" => ["string"],
            "Date" => ["required", "date_format:Y-m-d"],
            "payment_type" => ["required", "regex:/^[0-9]$/"],
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
            "item_code" => ["required", 'exists:items,code'],
            "quantity" => ["required", config("constant.qty")],
            "suplier_price" => ["required", config("constant.DoubleNumRegex")],
            "sell_price" => ["required", config("constant.DoubleNumRegex")],
            "discount" => [config("constant.DoubleNumRegex")],
            "expire_date" => ["required", "date_format:Y-m-d"],
            "total" => ["required", config("constant.DoubleNumRegex")],
            "vat" => [config("constant.DoubleNumRegex")],
        ];

        return $validator;
    }
    // ===========================================================================
    // Store
    // ===========================================================================
    public function index()
    {
        // TODO :  get join data from supllier table
        try {
            $purchas_invoie = purchases_invoice::with("items_invoice", "get_user", "get_supplier")->orderBy('Date', "desc")->paginate(config('constant.paginate_ten'));

            return response()->json($purchas_invoie);

        } catch (Exception $e) {
            return response()->json($e->getmessage());
        }
    }
// ======================================================
// ======================= Add page ===================
// ======================================================
    public function add()
    {
        $suplier_data = suppliers::get();

        $items = Item::get();
        return response()->json(["items" => $items, "supplier" => $suplier_data]);
    }
    // ============================================================
    // ===========  store ==================================
    // ============================================================
    // purchasInvoiceRequest
    public function store(Request $requests)
    {
        $invoice_rules = $this->check_invoice_Validat();

        $item_rules = $this->check_item_Validat();

        return parentController::store($requests, $invoice_rules, $item_rules, "purchases_invoice", "item_purchas_invoice", "purchas_invoice_id");

    }
    // ========================================================
    // =========== edite  ==================================
    // ============================================================
    public function edite($id)
    {
        if ($id) {
            try {

                $suplier_data = suppliers::select("id", "name")->orderBy('id', "desc")->get();

                $purchas_invoice_data = purchases_invoice::where("id", $id)->first();

                $item_purchas_invoice_data = item_purchas_invoice::where("purchas_invoice_id", $id)->orderBy('id', "desc")->get();
                $item_purchas_invoice_data = item_purchas_invoice::where("purchas_invoice_id", $id)->orderBy('id', "desc")->get();

                if ($purchas_invoice_data && $suplier_data && $purchas_invoice_data) {

                    return response()->json(["purchas_invoice_data" => $purchas_invoice_data, "item_purchas_invoice_data" => $item_purchas_invoice_data, "suplier_data" => $suplier_data]);
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
    //   =====expir Dates ======
// ===================================================================

//   ==============================================================
    //   ===== purchase invoice Details ======
// ===================================================================

    public function invoic_details($id)
    {

        $invoice = purchases_invoice::find($id);
        $invoic_items = item_purchas_invoice::with("items")->where("purchas_invoice_id", $id)->orderBy('id', "desc")->get();

        return response()->json(["invoice" => $invoice, "invoic_items" => $invoic_items]);
    }
    // =============================================================
    // invoice report
    // ================================================================
    public function Report(Request $request)
    {
        return reportsController::reports($request, $this->invoice_table, $this->item_invoice_table, ["purchas_invoice", "items"]);
    }
} // end class
