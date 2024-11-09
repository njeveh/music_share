<?php

namespace Database\Seeders;

use App\Models\MusicGroup;
use App\Models\MusicGroupAdmin;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->count(20)->create([
        //     'password' => 'Test@123',
        // ]);

        $user = User::factory(20)
            ->hasAttached(
                MusicGroup::factory()
                    ->state(function (array $attributes, User $user) {
                        return ['creator_name' => $user->first_name.' '.$user->last_name];
                    }),
                    [
                        'is_creator' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
            )
            ->create(['password' => 'Test@123',]);
    }
}
