import PokemonSelector from '@/components/pokemon/pokemon-selector';
import { Head } from '@inertiajs/react'

export default function Welcome({ pokemon }: { pokemon: any }) {

    return (
        <>
            <Head title="Homepage" />

            <PokemonSelector pokemonList={pokemon} />
        </>
    );
}
