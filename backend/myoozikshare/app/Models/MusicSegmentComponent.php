<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MusicSegmentComponent extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'music_segment_id', 'title', 'audio',
        'is_myoozikshare_approved', 'is_myoozikshare_verified',
        'public_approvals', 'public_disapprovals',
    ];

    /**
     * get the music to which this segment belongs
     */
    public function musicSegment(): BelongsTo
    {
        return $this->belongsTo(MusicSegment::class);
    }
}
