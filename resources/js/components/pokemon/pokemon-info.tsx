
export default function PokemonInfo({ pokemon, color }: { pokemon: any, color: string }) {

    const capitalize = (s: string) => s && String(s[0]).toUpperCase() + String(s).slice(1)

    return (
        <div className={'bg-black/70 backdrop-blur-sm rounded-lg p-4 shadow-xl border-2 border-' + color + '-500 overflow-y-scroll h-60'}>
            <h3 className={'text-2xl font-bold text-' + color + '-300'}>{capitalize(pokemon.name)}</h3>
            <p className={'text-' + color + '-300'}>Ready for battle!</p>
            <p className={'text-' + color + '-300'}>Weight: {pokemon.weight / 10}kg</p>
            <p className={'text-' + color + '-300'}>Height: {pokemon.height * 10}cm</p>
            <br />
            <p className={'text-' + color + '-300'}>Stats</p>
            <ul className={'text-' + color + '-300'}>
                {pokemon.stats.map((stat, id) =>
                    <li key={id}>{stat.stat.name} : {stat.base_stat}</li>
                )}
            </ul>
        </div>
    );
}
