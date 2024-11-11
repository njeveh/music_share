<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('music_group_admins', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('music_group_member_id')->unique()->constrained()->cascadeOnDelete();
            $table->boolean('is_super_admin')->default(false);
            $table->string('roles')->nullable();//manage_members? manage_music?
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_group_admins');
    }
};
