<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Clientes;
use App\Model\PlanoCliente;
use App\Model\Planos;
use Illuminate\Support\Facades\DB;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Clientes::all();
    }

 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'nome' =>  'required|max:255',
            'email' => 'required',
            'telefone' => 'required',
            'estado' => 'required',
            'cidade' => 'required',
            'nascimento' => 'required'
        ]);
       
        if($validated){
            return Clientes::create([
                'nome' => $request->nome,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'estado' => $request->estado,
                'cidade' => $request->cidade,
                'nascimento' => $request->nascimento
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Clientes::findOrFail($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $cliente = Clientes::findOrFail($id);
        $cliente->update($request->all());
        return $cliente;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cliente = Clientes::findOrFail($id);
                
        $planocliente = DB::table('plano_clientes')->where('clienteID', $cliente->id)->get();
           
        if(!$planocliente){
            $plano = Planos::findOrFail($planocliente->planoID);
            $estado = strtolower($plano->estado);

            if(!$plano->plano === 'free' && !str_contains($estado,'são paulo')){
                $cliente->delete();
                return [
                    'message' => 'User Successfully Deleted!'
                ];
            }else{
                return [
                    'message' => 'User cannot be deleted or don\'t have a plan yet!'
                ];
            }

        }else{
            $cliente->delete();

        }
        return [
            'message' => 'User cannot be founded!'
        ];
       
      
    }
}
