<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    const TABLE='posts';
    protected $table=self::TABLE;
    protected $guarded=[];
}
