<?php

namespace App\Http\Controllers;

use App\Http\Requests\clientDuesRequest;
use App\Http\Requests\getPurchasesRequest;
use App\Models\Client_payment;
use App\Models\clientes;
use App\Models\purchases_invoice;
use App\Traits\ApiTrait;
use App\Models\suppliers;
use Illuminate\Http\Request;

class ClientPaymentController extends Controller
{
    use ApiTrait;
    //get all client payment invoices
    public function index(Request $request)
    {
        $clientPaymentInvoices = Client_payment::with('client')->Paginate(10);
        return $this->dataResponse(compact("clientPaymentInvoices"), "get all client Payment Invoices successfully");
    }
    // get specific client payment invoice
    public function getOne(Request $request, $id)
    {
        $clientPaymentInvoice = Client_payment::find($id);
        if (!$clientPaymentInvoice) {
            return $this->ErrorResponse(["clientPaymentInvoice" => "this client Payment Invoice id dosen't exist in database"], "client Payment Invoice not exist", 404);
        } else {
            return $this->dataResponse(compact("clientPaymentInvoice"));
        }
    }
    // add
    public function add()
    {
        $clients = clientes::where("remaining_debt", ">", "0")->select("id", "name", "remaining_debt")->get();
        return $this->DataResponse(["clients" => $clients], "get clients successfully");
    }
    // create
    public function create(clientDuesRequest $request)
    {
        $data = $request->validated();
        // return $data;
        $supplier = suppliers::where("id", "=", $data["client_id"])->first();
        $supplier->remaining_debt = $request->remaining_debt;
        $supplier->save();
        $clientPayment = new Client_payment();
        $clientPayment->create($data);
        return $this->successResponse("remaining dept and client payment invoice updated successfully", compact("data"));
    }
    //  delete
    public function destory($id)
    {
        $ClientPaymentInvoice = Client_payment::find($id);
        if (!$ClientPaymentInvoice) {
            return $this->ErrorResponse(["client payment invoice" => "this client payment invoice id dosen't exist in database"], "client payment invoice not exist", 404);
        } else {
            $data = $ClientPaymentInvoice;
            $ClientPaymentInvoice->delete();
            return $this->successResponse("client payment invoice delete successfully", ["ClientPaymentInvoice" => $ClientPaymentInvoice]);
        }
    }
}
