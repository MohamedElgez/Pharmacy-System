<?php

namespace App\Http\Controllers\Api;

use App\Models\Item;
use App\Models\sales_bill;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\items_sales_bill;
use App\Models\suppliers;
use App\Models\clientes;
use App\Models\purchases_invoice;
use App\Models\purchas_return_invoice;
use App\Models\sales_return_bill;
use App\Http\Controllers\Controller;
use App\Models\item_purchas_invoice;
use Illuminate\Support\Facades\Validator;
use TheSeer\Tokenizer\Exception;

class reportsController extends Controller
{
    private const Model_path = "App\Models\\";

    // ==================================================================
    // Sales Reports
    // ==================================================================

    public static function reports($request,$invoice,$invoice_item,$relation=["items"])
    {
        $rules = [
            "from" => ["required", config("constant.DateFormat")],
            "to" => config("constant.DateFormat") | '',
        ];

        $validator = parentController::check_Validation($request->all(), $rules);
        if ($validator->fails()) {return response()->json($validator->errors(), 422);}

        try{
            $model = self::Model_path . $invoice;
            $model_item = self::Model_path . $invoice_item;

             $date=$request->to?[$request->from,$request->to]:$request->from;

            $date_col=$invoice=='purchases_invoice'?'Date':'created_at';
            $report_data = $model_item::with($relation)->whereBetween('created_at',  $date)->orderBy('id',"desc")->paginate(config("constant.paginate_ten"));//get sum

            $qty = $model_item::whereBetween('created_at', $date)->groupBy("item_id")->sum("quantity");// sum quntity of every item of invoice_items
            $total =$model::whereBetween($date_col, $date)->sum("total");// sum total of invoice
            $remaind=$model::whereBetween($date_col, $date)->sum("remaind");// sum remaind of invoice

            if($invoice!=="sales_return_bill"){
                $paied =$model::whereBetween('created_at', $date)->sum("paid");// sum paid of invoice
            }else{
                $paied=0;
            }

        return response()->json([
            "total" => $total,
            "remaind" => $remaind,
            "paied" => $paied,
            "quntity" => $qty,
            // "quntity" => $quntity,
            "report_data" => $report_data,
            ]);
        }catch(Exception $e){
            return response()->json($e->getMessage());
        }
}
// ==============================================================
        //Expire
// =================================================================
public function expire(Request $request)
{
    $rules = [
        "before_date" => [config("constant.DateFormat")],
        "after_days" => "integer",
    ];
    $validator = parentController::check_Validation($request->all(), $rules);
    if ($validator->fails()) {return response()->json($validator->errors(), 422);}
    try{
        $days=$request->after_days||30;
        // $date=$request->before_date?$request->before_date:$request->after_days;
        if($request->before_date){
            $data= item_purchas_invoice::with("items")->where('expire_date','<=',$request->before_date)->orderBy('expire_date')->paginate(config("constant.paginate_ten"));
        }else{
            $Next_date=Carbon::now()->addDays($days)->format('Y-m-d');
            $data= item_purchas_invoice::with("items")->where('expire_date','<',$Next_date)->orderBy('expire_date','desc')->paginate(config("constant.paginate_ten"));
        }
        return response()->json(["Expire_item"=>$data]);
    }catch(Exception $e){
        return response()->json($e->getMessage());
    }
}
// ==============================================================================
        //Stock out
// ==============================================================================
public function item_stock_out(){
    try{
        $stockout_item= Item::where("quantity",'=',1)->orderBy('quantity',"desc")->paginate(config("constant.paginate_ten"));
        return response()->json(["stockout" => $stockout_item]);
    }catch(Exception $e){
        return response()->json($e->getMessage());
    }
}
// =====================================================================================
// profit
// =====================================================================================
public function profit(Request $request){

    $days=$request->days?$request->days:90;

    $since_date=Carbon::now()->subDays($days)->format('Y-m-d');
    $curent_date=Carbon::now()->format('Y-m-d');

    $purchae_invoice=purchases_invoice::where("Date", "<",[$curent_date,$since_date])->sum("total");
    $purchae_return_invoice=purchas_return_invoice::where("Date", "<",[$curent_date,$since_date])->sum("total");

    $sales_invoice=sales_bill::where("created_at","<" ,[$curent_date,$since_date])->sum("total");
    $sales_return_invoice=sales_return_bill::where("created_at","<" ,[$curent_date,$since_date])->sum("total");

    $profit=($sales_return_invoice+$purchae_invoice)-($sales_invoice+$purchae_return_invoice);

    return response()->json([
        "profit"=>$profit,
        "purchae_invoice"=>$purchae_invoice,
        "purchae_return_invoice"=>$purchae_return_invoice,
        "sales_invoice"=>$sales_invoice,
        "sales_return_invoice"=>$sales_return_invoice,

    ]);
}
// ==============================================================================
//Debts for suplier
// ============================================================================
public function debt(){

     $suplier = suppliers::orderBy("remaining_debt","desc")->paginate(config("constant.paginate_ten"));
     $total=$suplier->sum('remaining_debt');

     return response()->json(["$suplier",$suplier,"total"=>$total]);
}
// ==============================================================================
//Debts for owner
// ============================================================================
public function Dues(){

    $client = clientes::orderBy("remaining_debt","desc")->paginate(config("constant.paginate_ten"));
    $total=$client->sum("remaining_debt");

    return response()->json(["$client",$client,"total"=>$total]);
}
}//end class
