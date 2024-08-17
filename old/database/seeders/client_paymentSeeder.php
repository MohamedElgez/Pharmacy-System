<?php

namespace Database\Seeders;

use App\Models\Client_payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class client_paymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client_payment::factory(5)->create();
    }
}
