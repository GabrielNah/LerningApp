<?php

namespace App\Models;

use App\Traits\HasAccessRelatedChecking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable
{
    use HasFactory,HasApiTokens,HasAccessRelatedChecking;
    const TABLE='admins';
    protected $guarded=[];
    protected $table=self::TABLE;
    protected $hidden = [
        'password',
    ];
}
