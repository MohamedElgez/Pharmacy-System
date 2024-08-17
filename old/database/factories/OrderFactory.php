<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
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
            "supplier_id" => fake()->randomNumber(1),
            "needed_date" => fake()->date(),
            "status" => fake()->randomElement([0, 1, 2]),
            "created_by" => fake()->randomNumber(1),
        ];
    }
}
