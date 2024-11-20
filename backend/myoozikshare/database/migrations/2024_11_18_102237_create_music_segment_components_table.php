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
        Schema::create('music_segment_components', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('music_segment_id');
            $table->string('title');
            $table->string('audio');
            $table->string('audio_public_id');
            $table->boolean('is_myoozikshare_approved')->default(true);
            $table->boolean('is_myoozikshare_verified')->default(false);
            $table->unsignedBigInteger('public_approvals')->default(0);
            $table->unsignedBigInteger('public_disapprovals')->default(0);            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_segment_components');
    }
};
