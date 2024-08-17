<?php

namespace App\Http\Controllers;

use App\Traits\ApiTrait;
use App\Models\suppliers;
use Illuminate\Http\Request;
use App\Http\Requests\supplierDuesRequest;
use App\Models\supplier_payment;

class SupplierPaymentController extends Controller
{
    use ApiTrait;
    //get all supplier payment invoices
    public function index(Request $request)
    {
        $supplierPaymentInvoices = supplier_payment::with('supplier')->Paginate(10);
        return $this->dataResponse(compact("supplierPaymentInvoices"), "get all supplier Payment Invoices successfully");
    }

    public function getOne(Request $request, $id)
    {
        $supplierPaymentInvoice = supplier_payment::find($id);
        if (!$supplierPaymentInvoice) {
            return $this->ErrorResponse(["supplierPaymentInvoice" => "this supplier Payment Invoice id dosen't exist in database"], "supplier Payment Invoice not exist", 404);
        } else {
            return $this->dataResponse(compact("supplierPaymentInvoice"));
        }
    }
    // add
    public function add()
    {
        $suppliers = suppliers::where("remaining_debt", ">", "0")->select("id", "name", "remaining_debt")->get();
        return $this->DataResponse(["suppliers" => $suppliers], "get suppliers successfully");
    }
    // create

    public function create(supplierDuesRequest $request)
    {
        $data = $request->validated();
        $supplier = suppliers::where("id", "=", $data["supplier_id"])->first();
        $supplier->remaining_debt = $request->remaining_debt;
        $supplier->save();
        $supplierDue = new supplier_payment();
        $supplierDue->create($data);
        return $this->successResponse("remaining dept and supplier payment invoice updated successfully", compact("data"));
    }
    //  delete
    public function destory($id)
    {
        $supplierPaymentInvoice = supplier_payment::find($id);
        if (!$supplierPaymentInvoice) {
            return $this->ErrorResponse(["supplier payment invoice" => "this supplier payment invoice id dosen't exist in database"], "supplier payment invoice not exist", 404);
        } else {
            $data = $supplierPaymentInvoice;
            $supplierPaymentInvoice->delete();
            return $this->successResponse("supplier payment invoice delete successfully", ["supplierPaymentInvoice" => $supplierPaymentInvoice]);
        }
    }
}
