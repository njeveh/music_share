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
        Schema::create('music_groups', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->string('creator_name');
            $table->string('group_name')->unique();
            $table->string('group_description')->nullable();
            $table->string('cover_photo')->nullable();
            $table->string('group_icon')->nullable();
            $table->string('group_contact')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_groups');
    }
};
