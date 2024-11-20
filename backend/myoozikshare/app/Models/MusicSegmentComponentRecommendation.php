<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MusicSegmentComponentRecommendation extends Model
{
    /**
     * properties that are mass assignable
     */
    protected $fillable = [
        'user_id', 'music_segment_component_id', 'recommendation', 'audio',
    ];

    /**
     * get the music segment component to which an instance of this model belongs
     */
    public function musicSegmentComponent(): BelongsTo
    {
        return $this->belongsTo(MusicSegmentComponent::class);
    }

    /**
     * get the user to which an instance of this model belongs
     */
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
