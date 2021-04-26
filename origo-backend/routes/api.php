<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', 'api\AuthController@login');

Route::post('register', 'api\AuthController@register');

Route::group(['middleware' => ['apiJWT']], function () {
    
    Route::post('logout', 'api\AuthController@logout');

    //Clientes Routes
    Route::apiResource('clientes', 'api\ClientesController');

    //Planos Routes
    Route::apiResource('planos', 'api\PlanosController');

    //PlanosClientes Routes
    Route::apiResource('clientes-planos', 'api\PlanosClientesController');

    
});

