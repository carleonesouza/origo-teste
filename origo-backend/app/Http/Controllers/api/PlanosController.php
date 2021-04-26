<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Planos;

class PlanosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Planos::all();
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
            'plano' => 'required|max:255',
            'mensalidade' => 'required',
        ]);
        
        if($validated){
    
            return Planos::create([
                'plano' => $request->plano,
                'mensalidade' => $request->mensalidade
            ]);
        }else{
            return response()->json(['error' => 'Bad Request'],400);
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
        return Planos::findOrFail($id);
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
        $plano = Planos::findOrFail($id);
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
        $plano = Planos::findOrFail($id);
        if($plano){
            $plano->delete();
            return [
                'message' => 'Plano successfully deleted!'
            ];
        }else{
            return [
                'message' => 'Plano cannot be founded!'
            ];  
        }
       
    }
}
