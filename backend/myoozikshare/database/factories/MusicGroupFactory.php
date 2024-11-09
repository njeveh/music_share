<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MusicGroup>
 */
class MusicGroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'group_name' => ucwords($this->faker->word . ' ' . $this->faker->word . ' Music Group'),
        'group_description' => fake()->text(),
        'creator_name' => null,
        'group_contact' => fake()->phoneNumber(),
        'is_active' => true,
        ];
    }
}
