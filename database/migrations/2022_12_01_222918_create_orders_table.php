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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer("code");
            $table->foreignId("supplier_id");
            $table->date("needed_date");
            $table->enum("status", ["0", "1", "2"])->comment('0=>pendding,1=>ordeded,2=>delivered');
            $table->foreignId("created_by");
            $table->date("delivered_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
