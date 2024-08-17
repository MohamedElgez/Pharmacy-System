<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\client_payment>
 */
class client_paymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [  
            "code" => fake()->randomNumber(4),
            "client_id" => fake()->randomNumber(1),
            "remaining_debt" => fake()->randomFloat(2),
            "paid" => fake()->randomFloat(2),
            "past_remaining_debt" => fake()->randomFloat(2),
            "created_by" => fake()->randomNumber(1),
       
        ];
    }
}
