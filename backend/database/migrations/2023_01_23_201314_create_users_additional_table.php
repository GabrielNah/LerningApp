<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(\App\Models\UserAdditional::TABLE, function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')->onDelete('cascade');
            $table->string('avatar');
            $table->string(\App\Models\UserAdditional::FB_LINK);
            $table->string(\App\Models\UserAdditional::IG_LINK);
            $table->string(\App\Models\UserAdditional::TW_LINK);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(\App\Models\UserAdditional::TABLE);
    }
};
