<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MusicGroupMusic extends Model
{
    /**
     * properties that are mass assignable
     */
    protected $fillable = [
        'music_id', 'music_group_id',
    ];
    //
    protected $table = 'music_group_music';

    /**
     * get the music to which an instance of this model belongs
     */
    public function music(): BelongsTo
    {
        return $this->belongsTo(Music::class);
    }

    /**
     * get the music group to which an instance of this model belongs
     */
    public function musicGroup(): BelongsTo
    {
        return $this->belongsTo(MusicGroup::class);
    }
}
