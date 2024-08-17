<?php

namespace Database\Seeders;

use App\Models\supplier_due;
use App\Models\supplier_payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class supplier_paymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        supplier_payment::factory(5)->create();
    }
}
