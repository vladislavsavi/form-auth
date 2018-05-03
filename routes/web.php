<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('test');
});

Route::get('auth', function () {
    $request = request();
    $email = $request->get('email');
    $phone = $request->get('phone');
    $code = $request->get('code');
    $pass = $request->get('password');
    if ($email == 'qwe@qw.qw' && $phone && !$code) {
            return response()->json([
                'code' => true
            ]);
        }
    if ($email == 'qwe@qw.qw' && !$phone && !$code) {
        return response()->json([
            'registered' => false
        ]);
    }
    if ($email == 'qwe@qw.qw' && $phone && $code) {
        return response()->json([
            'auth' => true
        ]);
    }
    if ($email == 'asd@qw.qw' && $pass) {
        return response()->json([
            'auth' => true
        ]);
    }
    if ($email == 'asd@qw.qw' && !$pass) {
        return response()->json([
            'registered' => true
        ]);
    }

});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
