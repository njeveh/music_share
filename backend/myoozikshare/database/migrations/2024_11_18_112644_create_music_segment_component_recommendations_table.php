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
        Schema::create('music_segment_component_recommendations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignUuid('user_id');
            $table->foreignId('music_segment_component_id');
            $table->text('recommendation')->nullable();
            $table->string('audio')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_segment_component_recommendations');
    }
};
