<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    const TABLE='posts';
    protected $table=self::TABLE;
    protected $guarded=[];

    public function comments():HasMany
    {
        return  $this->hasMany(Comment::class,'post_id','id');
    }
}
