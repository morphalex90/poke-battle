import PokemonBattle from '@/components/pokemon/pokemon-battle';
import { Head } from '@inertiajs/react'

export default function Fight({ leftPokemon, rightPokemon }: { leftPokemon: any, rightPokemon: any }) {

    return (
        <>
            <Head title="Fight" />

            <PokemonBattle leftPokemon={leftPokemon} rightPokemon={rightPokemon} />
        </>
    );
}
