import { Volume2Icon, VolumeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import PokemonInfo from '@/components/pokemon/pokemon-info'
import Pokemon3DModel from '@/components/pokemon/pokemon-model';

export default function PokemonSelector({ pokemonList }: { pokemonList: any }) {
	const [leftPokemon, setLeftPokemon] = useState({})
	const [rightPokemon, setRightPokemon] = useState({})
	const [isVolumeEnabled, setIsVolumeEnabled] = useState<boolean>(false)

	const [leftSelectedPokemon, setLeftSelectedPokemon] = useState({})
	const [rightSelectedPokemon, setRightSelectedPokemon] = useState({})

	useEffect(() => {
		async function getData() {
			if (leftPokemon.value) {
				setLeftSelectedPokemon(await getSelectedPokemon(leftPokemon.value))
			}
		}

		getData()
	}, [leftPokemon]);

	useEffect(() => {
		async function getData() {
			if (rightPokemon.value) {
				setRightSelectedPokemon(await getSelectedPokemon(rightPokemon.value))
			}
		}
		getData()
	}, [rightPokemon]);

	const getSelectedPokemon = async (pokemonUrl: string) => {
		const response = await fetch(pokemonUrl);
		const json = await response.json();

		if (isVolumeEnabled) {
			new Audio(json.cries.latest).play()
		}

		return json
	}

	const isEmptyObject = (obj: any) => Object.keys(obj).length === 0;

	return (
		<div className="min-h-screen bg-black relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50"></div>

			<div className="absolute top-5 right-5 z-20 text-red-500 cursor-pointer" onClick={() => setIsVolumeEnabled(!isVolumeEnabled)}>{isVolumeEnabled ? <Volume2Icon /> : <VolumeOff />}</div>

			<div className="relative z-10 min-h-screen flex flex-col">
				<div className="text-center py-6">
					<h1 className="text-5xl font-extrabold text-yellow-400 tracking-wider uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]">
						Poké Battle
					</h1>
				</div>

				<div className="flex-1 md:flex">
					<div className="md:w-1/2 relative flex flex-col items-center justify-center p-8">
						<div
							className="absolute inset-0 transition-all duration-500 ease-in-out"
							style={{
								backgroundImage: !isEmptyObject(leftSelectedPokemon)
									? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${leftSelectedPokemon.sprites.front_default})`
									: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
								backgroundSize: "cover",
								backgroundPosition: "center",
								clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
							}}
						>
							<div className="absolute inset-0 bg-blue-600/20"></div>
						</div>

						<div className="relative z-10 text-center space-y-6 mr-12">
							<div className="bg-gradient-to-r from-blue-700 to-blue-900 p-3 rounded-lg inline-block mb-6 transform -skew-x-12">
								<h2 className="text-4xl font-bold text-white tracking-wider uppercase">Player 1</h2>
							</div>

							<div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 shadow-xl border-2 border-blue-500">
								<label className="block text-lg font-semibold text-blue-300 mb-4">Choose your Pokémon</label>
								<Select
									value={leftPokemon ? leftPokemon : null}
									onChange={(selectedOption) => setLeftPokemon(selectedOption || "")}
									// options={pokemonList
									// 	.filter((pokemon) => pokemon.label !== rightPokemon.label)
									// 	.map((pokemon) => ({ value: pokemon.value, label: pokemon.label }))}
									options={pokemonList}
									placeholder="Select a Pokémon"
									className="w-64"
									styles={{
										control: (provided) => ({
											...provided,
											backgroundColor: "#1e1b4b",
											borderColor: "#3b82f6",
											borderWidth: "2px",
											minHeight: "48px",
											fontSize: "18px",
											color: "white",
											// zIndex: "100",
											"&:hover": {
												borderColor: "#60a5fa",
											},
										}),
										singleValue: (provided) => ({
											...provided,
											color: "white",
										}),
										placeholder: (provided) => ({
											...provided,
											color: "#93c5fd",
										}),
										menu: (provided) => ({
											...provided,
											backgroundColor: "#1e1b4b",
											border: "2px solid #3b82f6",
											zIndex: "100",
										}),
										option: (provided, state) => ({
											...provided,
											backgroundColor: state.isFocused ? "#3b82f6" : "#1e1b4b",
											color: "white",
											"&:hover": {
												backgroundColor: "#3b82f6",
											},
										}),
									}}
								/>
							</div>

							{!isEmptyObject(leftSelectedPokemon) && (
								<>
									<Pokemon3DModel height={leftSelectedPokemon.height} modelPath={'/storage/3d-models/' + leftSelectedPokemon.name + '/anim.dae'} />
									<PokemonInfo pokemon={leftSelectedPokemon} color="blue" />
								</>
							)}
						</div>
					</div>

					<div className="md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-30">
						<div className="relative">
							<div className="absolute -inset-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full opacity-50 animate-pulse"></div>
							<div className="bg-gradient-to-br from-yellow-400 to-red-600 text-white text-7xl font-extrabold py-6 px-8 rounded-full border-4 border-white shadow-[0_0_20px_rgba(255,165,0,0.8)] relative">
								VS
							</div>
						</div>
					</div>

					<div className="md:w-1/2 relative flex flex-col items-center justify-center p-8">
						<div
							className="absolute inset-0 transition-all duration-500 ease-in-out"
							style={{
								backgroundImage: !isEmptyObject(rightSelectedPokemon)
									? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${rightSelectedPokemon.sprites.front_default})`
									: "linear-gradient(135deg, #9d174d 0%, #831843 100%)",
								backgroundSize: "cover",
								backgroundPosition: "center",
								clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
							}}
						>
							<div className="absolute inset-0 bg-red-600/20"></div>
						</div>

						<div className="relative z-10 text-center space-y-6 ml-12">
							<div className="bg-gradient-to-r from-red-900 to-red-700 p-3 rounded-lg inline-block mb-6 transform -skew-x-12">
								<h2 className="text-4xl font-bold text-white tracking-wider uppercase">Player 2</h2>
							</div>

							<div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 shadow-xl border-2 border-red-500">
								<label className="block text-lg font-semibold text-red-300 mb-4">Choose your Pokémon</label>
								<Select
									value={rightPokemon ? rightPokemon : null}
									onChange={(selectedOption) => setRightPokemon(selectedOption || "")}
									// options={pokemonList
									// 	.filter((pokemon) => pokemon.label !== leftPokemon.label)
									// 	.map((pokemon) => ({ value: pokemon.value, label: pokemon.label }))}
									options={pokemonList}
									placeholder="Select a Pokémon"
									className="w-64"
									styles={{
										control: (provided) => ({
											...provided,
											backgroundColor: "#7f1d1d",
											borderColor: "#ef4444",
											borderWidth: "2px",
											minHeight: "48px",
											fontSize: "18px",
											color: "white",
											"&:hover": {
												borderColor: "#f87171",
											},
										}),
										singleValue: (provided) => ({
											...provided,
											color: "white",
										}),
										placeholder: (provided) => ({
											...provided,
											color: "#fca5a5",
										}),
										menu: (provided) => ({
											...provided,
											backgroundColor: "#7f1d1d",
											border: "2px solid #ef4444",
										}),
										option: (provided, state) => ({
											...provided,
											backgroundColor: state.isFocused ? "#ef4444" : "#7f1d1d",
											color: "white",
											"&:hover": {
												backgroundColor: "#ef4444",
											},
										}),
									}}
								/>
							</div>

							{!isEmptyObject(rightSelectedPokemon) && (
								<>
									<Pokemon3DModel height={rightSelectedPokemon.height} modelPath={'/storage/3d-models/' + rightSelectedPokemon.name + '/anim.dae'} />
									<PokemonInfo pokemon={rightSelectedPokemon} color="red" />
								</>
							)}
						</div>
					</div>
				</div>

				<div className="relative pb-8 pt-4 text-center">
					<button
						className={`font-bold py-4 px-16 text-3xl shadow-2xl transition-all duration-300 border-4 uppercase tracking-wider ${!isEmptyObject(leftSelectedPokemon) && !isEmptyObject(rightSelectedPokemon)
							? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-yellow-300 hover:scale-105 cursor-pointer animate-pulse"
							: "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
							}`}
						style={{
							clipPath: "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
						}}
						disabled={isEmptyObject(leftSelectedPokemon) || isEmptyObject(rightSelectedPokemon)}
						onClick={() => {
							if (leftSelectedPokemon && rightSelectedPokemon) {
								window.location.href = route('fight', { player1: leftSelectedPokemon.name, player2: rightSelectedPokemon.name })
							}
						}}
					>
						FIGHT!
					</button>
				</div>
			</div>
		</div>
	)
}
