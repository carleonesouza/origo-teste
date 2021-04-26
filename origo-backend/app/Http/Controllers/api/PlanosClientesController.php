<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\PlanoCliente;

class PlanosClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PlanoCliente::all();
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
            'clienteID' => 'required|max:255',
            'planoID' => 'required',
        ]);

        if ($validated) {

            return PlanoCliente::create([
                'clienteID' => $request->clienteID,
                'planoID' => $request->planoID
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
        return PlanoCliente::findOrFail($id);
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
        $plano = PlanoCliente::findOrFail($id);
        $plano->update($request->all());
        return $plano;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $plano = PlanoCliente::findOrFail($id);
        if ($plano) {
            $plano->delete();
            return [
                'message' => 'Plano successfully deleted!'
            ];
        } else {
            return [
                'message' => 'Plano cannot be founded!'
            ];
        }
    }
}
