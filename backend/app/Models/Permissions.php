<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    use HasFactory;
    const TABLE='permissions';
    protected $table=self::TABLE;
    protected $guarded=[];
}
