<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_purchas_invoice', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('purchas_invoice_id');
            $table->bigInteger('item_id');
            $table->integer('quantity')->unsigned();
            $table->double('total')->unsigned();
            $table->double('suplier_price')->unsigned();
            $table->double('sell_price')->unsigned();
            $table->double('discount')->unsigned();
            $table->date('expire_date');
            $table->date('created_at')->default(date("Y-m-d"));
            $table->date('updated_at')->default(date("Y-m-d"));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_purchas_invoice');
    }
};
