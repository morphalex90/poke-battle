import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react';
import Select from 'react-select'

export default function Welcome({ pokemon }: { pokemon: any }) {

    const [first, setFirst] = useState()
    const [second, setSecond] = useState()

    const { data, setData } = useForm({
        pokemon_first: { value: '', label: '' },
        pokemon_second: { value: '', label: '' },
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        console.log(data)
    }

    useEffect(() => {
        async function getData() {
            console.log(data)

            if (data.pokemon_first.value !== '') {
                const response = await fetch(data.pokemon_first.value);
                const json = await response.json();
                // console.log(json.sprites.front_default);
                setFirst(json)
            }

            if (data.pokemon_second.value !== '') {
                const response = await fetch(data.pokemon_second.value);
                const json = await response.json();
                setSecond(json)
            }
        }

        getData()
    }, [data]);

    return (
        <>
            <Head title="Homepage" />

            <div>
                Poke-Battle

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-10 mb-5">
                        <div className="w-100">
                            <Select
                                options={pokemon}
                                name="pokemon_first"
                                value={{ value: (data.pokemon_first.value || ''), label: (data.pokemon_first.label || 'Select Pokemon') }}
                                onChange={(selectedOption) => setData('pokemon_first', selectedOption)}
                                required
                            />

                            {first &&
                                <img src={first.sprites.front_default} alt={first.name} />
                            }
                        </div>

                        <div className="w-100">
                            <Select
                                options={pokemon}
                                name="pokemon_second"
                                value={{ value: (data.pokemon_second.value || ''), label: (data.pokemon_second.label || 'Select Pokemon') }}
                                onChange={(selectedOption) => setData('pokemon_second', selectedOption)}
                                required
                            />

                            {second &&
                                <img src={second.sprites.front_default} alt={second.name} />
                            }
                        </div>
                    </div>

                    <Button>Let them fight!</Button>
                </form>
            </div>
        </>
    );
}
