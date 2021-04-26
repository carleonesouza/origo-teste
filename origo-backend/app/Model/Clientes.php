<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{


    protected $fillable = [
        'nome', 'email', 'telefone','estado', 'cidade', 'nascimento'
    ];
}
