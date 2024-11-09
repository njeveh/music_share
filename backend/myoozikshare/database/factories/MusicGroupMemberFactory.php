<?php

namespace Database\Factories;

use App\Models\MusicGroupAdmin;
use App\Models\MusicGroupMember;
use Illuminate\Database\Eloquent\Factories\Factory;
use Symfony\Component\Uid\Factory\UuidFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MusicGroupMember>
 */
class MusicGroupMemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        //    'user_id',
        //    'music_group_id',
            'is_creator' => false,
        ];
    }

    // /**
    //  * Configure the model factory.
    //  */
    // public function configure(): static
    // {
    //     return $this->afterMaking(function (MusicGroupMember $music_group_member) {
    //         // ...
    //     })->afterCreating(function (MusicGroupMember $music_group_member) {
    //         MusicGroupAdmin::factory()->create([
    //             'music_group_member_id' => $music_group_member->id,
    //             'is_super_admin' => true,
    //             'roles' => json_encode(['manage_members','manage_music'])
    //         ]);
    //     });
    // }
}
