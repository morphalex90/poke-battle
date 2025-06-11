<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    $pokemon = $response->json();

    $pokemonList = collect($pokemon['results'])->map(function ($item) {
        return [
            'value' => $item['url'],
            'label' => ucfirst($item['name']),
        ];
    })->toArray();

    return Inertia::render('welcome', ['pokemon' => $pokemonList]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
