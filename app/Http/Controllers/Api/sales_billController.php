<?php

namespace App\Http\Controllers\Api;

use App\Models\Item;
use App\Models\clientes;
use App\Models\suppliers;
use App\Models\sales_bill;
use Illuminate\Http\Request;
use App\Models\items_sales_bill;
use App\Http\Controllers\Controller;
use App\Http\Requests\sales_billRequest;
use Illuminate\Support\Facades\Validator;

class sales_billController extends Controller
{

    private $invoice_table="sales_bill";
    private $item_invoice_table="items_sales_bill";
    private $invoice_table_forinKey="sales_bill_id";
        // ======================================================
// ======================= check_purchas_Validat ===================
// ======================================================
public function check_invoice_Validat()
{
    //  creat validation rules

    $validator =[
        "code" => ["required","unique:sales_bill,code"],
        "total" => ["required", config("constant.DoubleNumRegex")],
        "sale"=>[config("constant.DoubleNumRegex")],
        // "total_after_sale" => ["required", "integer"],
        "paid" => ["required", config("constant.DoubleNumRegex")],
        "remaind" => [config("constant.DoubleNumRegex")],
        "client_id" => ["integer"],
        "user_id" => ["required", "integer",'exists:users,id'],
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
    $validator =[

        "item_code" => ["required", 'exists:items,code'],
        "quantity" => ["required",config("constant.qty")],
        "price" => ["required", config("constant.DoubleNumRegex")],

    ];

    return $validator;
}
    public function index()
    {
        // TODO :  get join data from supllier table


        try {
            $sales_bill = sales_bill::with("items_invoice","get_user","client")->orderBy('id')->paginate(config('constant.paginate_ten'));
            return response()->json($sales_bill);
        } catch (Exception $e) {
            return response()->json($e->getmessage());
        }
    }
    // ====================================================================
    // ========== Add ==========================================
    // ===========================================================
    public function add()
    {
        $client = clientes::get();
        $supplier = suppliers::get();
        $items = Item::get();

        return response()->json(["client" => $client,
            "supplier" => $supplier,
            "items" => $items,
        ]);

    }
    // ============================================================
    // ===========  store ==================================
    // ============================================================

    public function store(Request $requests)
    {
        $invoice_rules=$this->check_invoice_Validat();

        $item_rules=$this->check_item_Validat();

       return parentController::store($requests,$invoice_rules,$item_rules,$this->invoice_table,$this->item_invoice_table,$this->invoice_table_forinKey);

    }
    // ========================================================
    // =========== edite  ==================================
    // ============================================================
    public function edite($id)
    {
        if ($id) {
            try {
                // $suplier_data = suppliers::select("id", "name")->get();

                $sales_bill = sales_bill::find($id);
                if ($sales_bill != null) {

                    return response()->json(["sales_bill" => $sales_bill]);
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

        $invoice_rules=$this->check_invoice_Validat();

        $item_rules=$this->check_item_Validat();

       return parentController::update($id,$requests,$invoice_rules,$item_rules,$this->invoice_table,$this->item_invoice_table,$this->invoice_table_forinKey);


    }
    // ============================================================
    // =========== Delete  ==================================
    // ============================================================
    public function Delete($id)
    {
        return parentController::delete($id,$this->invoice_table,$this->item_invoice_table,$this->invoice_table_forinKey);
    }
 // ============================================================
    // =========== invoic_details  ==================================
    // ============================================================
    public function invoic_details($id)
    {
        $invoice = sales_bill::find($id);
        $invoic_items = items_sales_bill::with("items")->where("sales_bill_id", $id)->orderBy('id',"desc")->get();
        return response()->json(["invoice" => $invoice, "invoic_items" => $invoic_items]);
    }
// =============================================================
    // invoice report
    // ================================================================
    public function Report(Request $request){
        return reportsController::reports($request,$this->invoice_table, $this->item_invoice_table,["sales_bill","items"]);
    }
}//end class
