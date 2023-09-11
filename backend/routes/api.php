<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', function (Request $request) {
    try {
        $validated = $request->validate([
            'name' => 'required|min:3|max:35',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:25|confirmed',
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Sikertelen regisztráció!',
            'errors' => $e->errors(),
        ], 422);
    }
    $user = App\Models\User::create($validated);

    return response()->json([
        'status' => 'success',
        'message' => 'Sikeres regisztráció, beléphet!',
        'user' => $user,
    ], 201);
});

Route::post('/login', function (Request $request) {

    $user = App\Models\User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'status' => 'error',
            'message' => 'Sikertelen bejelentkezés!',
        ], 401);
    }

    $token = $user->createToken($user['name'] . ' device_token')->plainTextToken;

    return response()->json([
        'status' => 'success',
        'message' => 'Sikeres bejelentkezés!',
        'token' => $token,
    ], 201);
});

Route::middleware('auth:sanctum')->get('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'status' => 'success',
        'message' => 'Sikeres kijelentkezés!',
    ], 201);
});

Route::middleware('auth:sanctum')->post('/profileupdate', function (Request $request) {
    $user = $request->user();

    try {
        $validated = $request->validate([
            'name' => 'required|min:3|max:35',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8|max:25',
        ]);
    } catch (ValidationException $err) {
        return response()->json([
            'status' => 'error',
            'errors' => $err->errors(),
        ], 422);
    }

    if (!$request->password) {
        unset($validated['password']);
    }

    $user->update($validated);

    return response()->json([
        'status' => 'success',
        'message' => 'Sikeres adatmódosítás!',
        'user' => $user,
    ], 201);
});
