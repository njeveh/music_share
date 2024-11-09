<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class MusicGroup extends Model
{
    use HasFactory, HasUuids;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'group_name', 'group_description', 'creator_name',
        'cover_photo', 'group_icon',
        'group_contact', 'is_active',
    ];

    /**
     * get music group members
     */
    public function musicGroupMembers(): HasMany
    {
        return $this->hasMany(MusicGroupMember::class);
    }

    /**
     * get music group admins
     */
    public function musicGroupAdmins(): HasManyThrough
    {
        return $this->hasManyThrough(MusicGroupAdmin::class, MusicGroupMember::class);
    }

    /**
     * get users related to this music group
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'music_group_members');
    }
}
