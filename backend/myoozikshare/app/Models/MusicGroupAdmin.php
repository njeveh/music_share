<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MusicGroupAdmin extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'music_group_member_id', 'is_super_admin',
        'roles',//manage_members? manage_music?
    ];

    /**
     * get the music group member related to this music group admin
     */
    public function MusicGroupMember(): BelongsTo
    {
        return $this->belongsTo(MusicGroupMember::class);
    }
}
