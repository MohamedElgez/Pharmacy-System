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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string("name", 32)->unique();
            $table->string("code", 255)->unique();
            $table->double('price', 8, 2);
            $table->double('unit_price', 8, 2);
            $table->foreignId('category_id');
            $table->foreignId('type_id');
            $table->foreignId('unit_id');
            $table->foreignId('supplier_id');
            $table->date("expiration");
            $table->integer("quantity")->unsigned();
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
        Schema::dropIfExists('items');
    }
};
