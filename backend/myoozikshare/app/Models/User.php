<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'user_name',
        'email',
        'password',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function verificationCodes(): HasMany {
        return $this->hasMany(VerificationCode::class);
    }

    /**
     * get music group membership requests associated with this user
     */
    public function musicGroupMembershipRequests(): HasMany
    {
        return $this->hasMany(MusicGroupMembershipRequest::class);
    }    

    /**
     * get the music group members associated with this user
     */
    public function musicGroupMembers(): HasMany
    {
        return $this->hasMany(MusicGroupMember::class);
    }    

    /**
     * get music groups whose membership this user has requested
     */
    public function requestedMembershipMusicGroups(): BelongsToMany
    {
        return $this->belongsToMany(MusicGroup::class, 'music_group_membership_requests');
    }

    /**
     * get music groups related to this user
     */
    public function musicGroups(): BelongsToMany
    {
        return $this->belongsToMany(MusicGroup::class, 'music_group_members');
    }

    /**
     * get the music uploaded by this user
     */
    public function music(): HasMany
    {
        return $this->hasMany(Music::class);
    }    
}
