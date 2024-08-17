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
        Schema::create('purchases_invoice', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->autoIncrement();
            $table->double('total')->unsigned();
            $table->double('paid')->unsigned();
            $table->double('remaind')->default(0);
            $table->double('vat')->unsigned()->default(0);
            $table->integer('payment_type')->unsigned()->default(0);
            $table->date('Date');
            $table->string('details')->nullable();
            $table->bigInteger('supplier_id');
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
        Schema::dropIfExists('purchases_invoice');
    }
};
