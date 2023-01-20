<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory,Authenticatable,HasApiTokens;
    const TABLE='admins';
    protected $guarded=[];
    protected $table=self::TABLE;
}
