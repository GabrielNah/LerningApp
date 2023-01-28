<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Requests extends Model
{
    use HasFactory;
    const TABLE='requests';
    protected $table=self::TABLE;
    protected $guarded=[];
    const SENT='sent';
    const ACCEPTED='accepted';
    const REJECTED='rejected';
    const STATES=[
        self::ACCEPTED,
        self::SENT,
        self::REJECTED,
    ];

    public function sender():BelongsTo
    {
        return $this->belongsTo(User::class,'from','id');
    }

    public function receiver():BelongsTo
    {
        return $this->belongsTo(User::class,'to','id');
    }
}
