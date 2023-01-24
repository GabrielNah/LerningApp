<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAdditional extends Model
{
    use HasFactory;
    const TABLE='users_additional';
    protected $table=self::TABLE;
    const FB_LINK='fb';
    const IG_LINK='it';
    const TW_LINK='tw';
    protected $guarded=[];
}
