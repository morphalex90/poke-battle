<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        $pokemon = $response->json();

        $pokemonList = collect($pokemon['results'])->map(function ($item) {
            return [
                'value' => $item['url'],
                'label' => ucfirst($item['name']),
            ];
        })->toArray();

        return Inertia::render('welcome', ['pokemon' => $pokemonList]);
    }

    public function fight(Request $request, $player1, $player2)
    {
        $response = Http::get('https://pokeapi.co/api/v2/pokemon/' . $player1);
        $data1 = $response->json();

        // dd($data1['stats']);

        $response = Http::get('https://pokeapi.co/api/v2/pokemon/' . $player2);
        $data2 = $response->json();

        $pokemon1 = $this->convertPokemon($data1);
        $pokemon2 = $this->convertPokemon($data2);

        return Inertia::render('fight', ['leftPokemon' => $pokemon1, 'rightPokemon' => $pokemon2]);
    }

    private function convertPokemon($data) {
        $tmp = [
            'id' => $data['id'],
            'name' => Str::title($data['name']),
        ];

        foreach($data['stats'] as $stat) {
            $tmp[str_replace('-', '_', $stat['stat']['name'])] = $stat['base_stat'];
        }

        $tmp['maxHp'] = $tmp['hp'];
        $tmp['image'] = $data['sprites']['front_default'];
        $tmp['shout'] = $data['cries']['latest'];

        return $tmp;
    }
}
