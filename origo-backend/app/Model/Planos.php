<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Planos extends Model
{
    protected $fillable = [
        'plano', 'mensalidade'
    ];
}
