<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order_Detail>
 */
class item_orderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "order_id" => fake()->randomNumber(1),
            "item_id" => fake()->randomNumber(1),
            "quantity" => fake()->numberBetween(1, 15),
        ];
    }
}
