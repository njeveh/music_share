<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Music extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id', 'title', 'description', 'composer', 'score',
        'score_public_id', 'audio', 'audio_public_id', 'lyrics',
        'is_myoozikshare_approved', 'is_myoozikshare_verified',
        'is_visible', //target group (music group / public) can view
        'is_published', // shared with the public domain
        'public_approvals', 'public_disapprovals',
    ];

    protected $table = 'music';

    /**
     * get the author of this music
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * get the music group music instances associated with this music
     */
    public function musicGroupMusic(): HasMany
    {
        return $this->hasMany(MusicGroupMusic::class);
    }

    /**
     * get the music groups that this music has been shared with
     */
    public function musicGroups(): BelongsToMany
    {
        return $this->belongsToMany(MusicGroup::class, 'music_group_music');
    }

    /**
     * get the music segments related to this music
     */
    public function musicSegments(): HasMany
    {
        return $this->hasMany(MusicSegment::class);
    }

    /**
     * get the music segment components related to this music
     */
    public function musicSegmentComponents(): HasManyThrough
    {
        return $this->hasManyThrough(MusicSegmentComponent::class, MusicSegment::class);
    }
    
}
