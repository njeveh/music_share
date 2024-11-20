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
        Schema::create('music', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->foreignUuid('user_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('composer');
            $table->string('score');
            $table->string('audio');
            $table->text('lyrics')->nullable();
            $table->boolean('is_myoozikshare_approved')->default(true);
            $table->boolean('is_myoozikshare_verified')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->boolean('is_published')->default(false);
            $table->unsignedBigInteger('public_approvals')->default(0);
            $table->unsignedBigInteger('public_disapprovals')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music');
    }
};
