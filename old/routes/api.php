<?php








































































































































































































































































































































































































































































































use App\Models\items;
use Illuminate\Http\Request;
use App\Http\Requests\LeafRequest;
use Illuminate\Support\Facades\Route;



use App\Http\Controllers\ItemController;
use App\Http\Controllers\LeafController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\userController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\clientController;

// ======  Controller   ==================
use App\Http\Controllers\Api\reportsController;
use App\Http\Controllers\Api\suplierController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\sales_billController;



use App\Http\Controllers\Api\Auth\LogoutController;

use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\purchasInvoiceController;
// use App\Http\Controllers\CategoryController;

// use App\Http\Controllers\Api\clientController;
// use App\Http\Controllers\Api\suplierController;

// ======  Controller   ==================
use App\Http\Controllers\Api\item_sales_billController;
// use App\Http\Controllers\Api\sales_billController;
use App\Http\Controllers\Api\sales_return_billController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
// use App\Http\Controllers\Api\purchasInvoiceController;
// use App\Http\Controllers\Api\item_sales_billController;
// use App\Http\Controllers\Api\sales_return_billController;
use App\Http\Controllers\Api\item_purchase_invoiceCotroller;
// use App\Http\Controllers\Api\item_purchase_invoiceCotroller;
// use App\Http\Controllers\Api\item_sales_return_billController;
// use App\Http\Controllers\Api\purchase_return__invoiceCotroller;
// use App\Http\Controllers\Api\item_purchase_return_invoiceCotroller;
use App\Http\Controllers\Api\item_sales_return_billController;
use App\Http\Controllers\Api\purchase_return__invoiceCotroller;
use App\Http\Controllers\Api\item_purchase_return_invoiceCotroller;
use App\Http\Controllers\Api\item_purchase_return__invoiceCotroller;
use App\Http\Controllers\ClientPaymentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SupplierPaymentController;

// use Illuminate\Support\Facades\Route;
// ===================== Supllier Routes =-===============


Route::group(["prefix" => 'supplier', "controller" => suplierController::class], function () {

    Route::get("/", "index");
    Route::post("store", "store");
    Route::get("edit/{id}", "edite");
    Route::put("update/{id}", "update");
    Route::delete("delete/{id}", "Delete");
});

// ===================== clients Routes =-===============

Route::group(["prefix" => 'client', "controller" => clientController::class], function () {

    Route::get("/", "index");
    Route::post("store", "store");
    Route::get("edit/{id}", "edite");
    Route::put("update/{id}", "update");
    Route::delete("delete/{id}", "Delete");
});

// ===================== purchasInvoice Routes =-===============

Route::group(["prefix" => 'purchas-Invoice', "controller" => purchasInvoiceController::class], function () {

    Route::get("/", "index");
    Route::get("add", "add");
    Route::get("edit/{id}", "edite");
    Route::get("Report", "Report");
    Route::put("update/{id}", "update");
    Route::post("store", "store");
    Route::delete("delete/{id}", "Delete");
    // ======= relation

    Route::post("purchase-invoice-details/{id}", "purchase_invoice_details");
});


// =====================  purchas return Invoice Routes =-===============

Route::group(["prefix" => 'purchas-return-invoice', "controller" => purchase_return__invoiceCotroller::class], function () {

    Route::get("/", "index");
    Route::get("add", "add");
    Route::get("edit/{id}", "edite");
    Route::get("Report", "Report");
    Route::put("update/{id}", "update");
    Route::post("store", "store");
    Route::delete("delete/{id}", "Delete");

    Route::get("item-purchase-return-invoice-details/{id}", "invoic_details");
});


// ===================== sales bill Routes =-===============

Route::group(["prefix" => 'sales-bill', "controller" => sales_billController::class], function () {

    Route::get("/", "index");
    Route::get("add", "add");
    Route::get("edit/{id}", "edite");
    Route::get("Report", "Report");
    Route::put("update/{id}", "update");
    Route::post("store", "store");
    Route::delete("delete/{id}", "Delete");
    Route::post("sales-bill/{id}", "invoic_details");
});


// ===================== sales-return-bill Routes =-===============

Route::group(["prefix" => 'sales-return-bill', "controller" => sales_return_billController::class], function () {

    Route::get("/", "index");
    Route::get("add", "add");
    Route::get("edit/{id}", "edite");
    Route::get("Report", "Report");
    Route::put("update/{id}", "update");
    Route::post("store", "store");
    Route::delete("delete/{id}", "Delete");
});
// ================= Reports Controller =====================
Route::group(["prefix" => 'reports', "controller" => reportsController::class], function () {

    Route::post("expire", "expire");
    Route::get("item-stockout", "item_stock_out");
    Route::get("profit", "profit");
    Route::get("debt", "debt");
    Route::get("Dues", "Dues");


});

// =================== run if route not found   ==============================
Route::fallback(function () {
    return response()->json(['message' => 'Route | method action Not Found '], 404);
});



// Category
Route::prefix('/categories')->controller(CategoryController::class)->group(function () {
    Route::get('/all', 'index');
    Route::post('/add', 'store');
    Route::get('/{id}', 'getOne');
    Route::put('/edit/{id}', 'update');
    Route::get('/{id}/items', 'CountItemsBelongs');
    Route::delete('/delete/{id}', 'destoryWithDeleteItems');
});
// unit
Route::prefix('/units')->controller(UnitController::class)->group(function () {
    Route::get('/all', 'index');
    Route::post('/add', 'store');
    Route::get('/{id}', 'getOne');
    Route::put('/edit/{id}', 'update');
    Route::get('/{id}/items', 'CountItemsBelongs');
    Route::delete('/delete/{id}', 'destoryWithDeleteItems');
});
// type
Route::prefix('/types')->controller(TypeController::class)->group(function () {
    Route::get('/all', 'index');
    Route::post('/add', 'store');
    Route::get('/{id}', 'getOne');
    Route::put('/edit/{id}', 'update');
    Route::delete('/delete/{id}', 'destory');
    Route::get('/{id}/items', 'CountItemsBelongs');
    Route::delete('/delete/{id}', 'destoryWithDeleteItems');
});
// leaf
Route::prefix('/leafs')->controller(LeafController::class)->group(function () {
    Route::get('/all', 'index');
    Route::post('/add', 'store');
    Route::get('/{id}', 'getOne');
    Route::put('/edit/{id}', 'update');
    Route::delete('/delete/{id}', 'destory');
});
// item
Route::prefix('/items')->controller(ItemController::class)->group(function () {
    Route::get('/all', 'index');
    Route::get('/add', 'add');
    Route::post('/create', 'store');
    Route::get('/{id}', 'getOne');
    Route::get('/edit/{id}', 'edit');
    Route::put('/update/{id}', 'update');
    Route::delete('/delete/{id}', 'destory');
    Route::post('/edit-category', "editCategory");
    Route::post('/edit-unit', "editUnit");
    Route::post('/edit-type', "editType");
    Route::get("/category/{id}", 'filterItemByCategory');

});
// user
Route::post('user/login', LoginController::class);
Route::post('user/logout', LogoutController::class);
Route::post('user/register', RegisterController::class);
Route::post('/user/ensure-email', [ResetPasswordController::class, 'ensureEmail']);
Route::middleware(['auth:sanctum', 'admin'])->prefix('/user')->controller(ResetPasswordController::class)->group(function () {
    Route::post('/reset-password', 'resetPassword');
});
Route::middleware('auth:sanctum')->get("/user",[userController::class, 'getUserByToken']);
Route::prefix('/user')->controller(userController::class)->group(function () {
    Route::get('/all', 'index');
    Route::post('/create', 'store');
    Route::get('/{id}', 'getOne');
    Route::get('/edit/{id}', 'edit');
    Route::post('/update/{id}', 'update');
    Route::delete('/delete/{id}', 'destory');
    
});


// supplier payment
Route::prefix('/supplier/payment')->controller(SupplierPaymentController::class)->group(function () {
    Route::get('/add', 'add');
    Route::post('/create', 'create');
    Route::get('/{id}', 'getOne');
    Route::delete('/delete/{id}', 'destory');
});
// client payment
Route::prefix('/client/payment')->controller(ClientPaymentController::class)->group(function () {
    Route::get('/add', 'add');
    Route::post('/create', 'create');
    Route::get('/{id}', 'getOne');
    Route::delete('/delete/{id}', 'destory');
});
// order
Route::prefix('/orders')->controller(OrderController::class)->group(function () {
    Route::get('/all', 'index');
    Route::post('/add', 'store');
    Route::get('/{id}', 'getOne');
    Route::put('/edit/{id}', 'update');
    Route::put('/{id}/changeStatus', 'changeStatus');
    Route::delete('/delete/{id}', 'destory');
});