<?php

namespace App\Models;

use App\Traits\HasAccessRelatedChecking;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory,Authenticatable,HasApiTokens,HasAccessRelatedChecking;
    const TABLE='admins';
    protected $guarded=[];
    protected $table=self::TABLE;
    protected $hidden = [
        'password',
    ];
}
