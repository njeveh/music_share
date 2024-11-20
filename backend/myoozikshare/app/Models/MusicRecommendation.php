<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MusicRecommendation extends Model
{
    /**
     * properties that are mass assignable
     */
    protected $fillable = [
        'user_id', 'music_id', 'recommendation', 'audio',
    ];

    /**
     * get the music to which an instance of this model belongs
     */
    public function music(): BelongsTo
    {
        return $this->belongsTo(Music::class);
    }

    /**
     * get the user to which an instance of this model belongs
     */
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
