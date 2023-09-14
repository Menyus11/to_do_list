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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->string("task");
            $table->string("comment")->default("");
            $table->tinyText("priority")->default("Nem sürgős");
            $table->tinyText("category")->default("Családi");
            $table->boolean("task_completed")->default(false);
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")/* ->onDelete("cascade") */;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
