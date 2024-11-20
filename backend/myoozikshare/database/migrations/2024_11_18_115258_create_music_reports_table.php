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
        Schema::create('music_reports', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignUuid('user_id');
            $table->foreignUuid('music_id');
            $table->string('subject')->nullable();
            $table->text('details');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_reports');
    }
};
