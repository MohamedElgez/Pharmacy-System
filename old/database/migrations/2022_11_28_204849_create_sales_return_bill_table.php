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
        Schema::create('sales_return_bill', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->double('total')->unsigned();
            $table->double('sale')->unsigned()->default(0);
            $table->double('paid')->unsigned();
            $table->double('net')->unsigned()->default(0);
            $table->double('remaind')->unsigned()->default(0);
            $table->bigInteger('client_id');
            $table->bigInteger('user_id');
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
        Schema::dropIfExists('sales_return_bill');
    }
};
