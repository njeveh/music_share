<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MusicGroupMembershipRequest extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id', 'music_group_id', 'status' //pending | cancelled | rejected
    ];

    /**
     * get the user related to this music group membership request
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * get the music group related to this music group membership request
     */
    public function musicGroup(): BelongsTo
    {
        return $this->belongsTo(MusicGroup::class);
    }
}
