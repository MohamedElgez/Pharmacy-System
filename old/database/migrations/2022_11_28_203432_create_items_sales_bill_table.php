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
        Schema::create('items_sales_bill', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sales_bill_id');
            $table->bigInteger('item_id');
            $table->double('price')->unsigned();
            $table->integer('quantity')->unsigned();
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
        Schema::dropIfExists('items_sales_bill');
    }
};
