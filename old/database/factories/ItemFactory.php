<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "type_id" => fake()->randomNumber(1),
            "unit_id" => fake()->randomNumber(1),
            "price" => fake()->randomFloat(2),
            "unit_price" => fake()->randomFloat(2),
            "code" => fake()->unique()->numberBetween(1, 10000),
            "category_id" => fake()->randomNumber(1),
            "supplier_id" => fake()->randomNumber(1),
            "expiration" => fake()->date(),
            "quantity" => fake()->numberBetween(0, 50),
            'name' => fake()->name()
        ];
    }
}
