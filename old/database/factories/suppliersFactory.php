<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\suppliers>
 */
class suppliersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "name" => fake()->name(),
            "code"=>fake()->randomNumber(4),
            "adress" => fake()->address(),
            "city" => fake()->city(),
            "phone" => fake()->phoneNumber(),
            "mobile" => fake()->phoneNumber(),
            "remaining_debt" => fake()->randomFloat(),
        ];
    }
}
