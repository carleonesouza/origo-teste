<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class PlanoCliente extends Model
{
    protected $fillable = [
        'clienteID', 'planoID',
    ];
}
