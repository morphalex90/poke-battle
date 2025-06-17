import { useState, useEffect } from "react"

interface Pokemon {
    id: number
    name: string
    image: string
    shout: string
    hp: number
    maxHp: number
    attack: number
    difense: number
    special_attack: number
    special_defense: number
}

interface PokemonBattleProps {
    leftPokemon: Pokemon
    rightPokemon: Pokemon
}

export default function PokemonBattle({ leftPokemon, rightPokemon }: PokemonBattleProps) {
    console.log(leftPokemon, rightPokemon)
    const [player1Pokemon, setPlayer1Pokemon] = useState<Pokemon>({ ...leftPokemon })
    const [player2Pokemon, setPlayer2Pokemon] = useState<Pokemon>({ ...rightPokemon })
    const [battleText, setBattleText] = useState(`${leftPokemon.name} vs ${rightPokemon.name}!`)
    const [isPlayerTurn, setIsPlayerTurn] = useState(true)
    const [battlePhase, setBattlePhase] = useState<'intro' | 'battle' | 'victory'>('intro')
    const [winner, setWinner] = useState<string>('')

    useEffect(() => {
        const timer = setTimeout(() => {
            if (battlePhase === 'intro') {
                setBattleText(`${leftPokemon.name}, I choose you!`)
                setBattlePhase('battle')
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [battlePhase, leftPokemon.name])

    const attack = (attacker: Pokemon, defender: Pokemon, isPlayer1Attack: boolean) => {
        const damage = Math.floor(Math.random() * 30) + 10
        const newHp = Math.max(0, defender.hp - damage)

        if (isPlayer1Attack) {
            setPlayer2Pokemon((prev) => ({ ...prev, hp: newHp }))
            setBattleText(`${attacker.name} attacks ${defender.name} for ${damage} damage!`)
        } else {
            setPlayer1Pokemon((prev) => ({ ...prev, hp: newHp }))
            setBattleText(`${attacker.name} attacks ${defender.name} for ${damage} damage!`)
        }

        if (newHp <= 0) {
            setTimeout(() => {
                setBattleText(`${defender.name} fainted! ${attacker.name} wins!`)
                setWinner(attacker.name)
                setBattlePhase('victory')
            }, 1500)
        } else {
            setTimeout(() => {
                setIsPlayerTurn(!isPlayerTurn)
            }, 2000)
        }
    }

    const handleAttack = () => {
        if (battlePhase !== 'battle') return

        if (isPlayerTurn) {
            attack(player1Pokemon, player2Pokemon, true)
        } else {
            attack(player2Pokemon, player1Pokemon, false)
        }
    }

    // Auto-attack for AI
    useEffect(() => {
        if (!isPlayerTurn && battlePhase === 'battle' && player2Pokemon.hp > 0) {
            const timer = setTimeout(() => {
                handleAttack()
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [isPlayerTurn, battlePhase, player2Pokemon.hp])

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 relative overflow-hidden font-mono">
            <div className="absolute inset-40 bg-white border-8 border-gray-800 rounded-lg shadow-2xl">
                <div className="h-full flex flex-col bg-gradient-to-b from-blue-100 to-green-100">
                    <div className="flex-1 relative p-4">
                        <div className="absolute top-4 right-4 bg-white border-2 border-black p-2 rounded">
                            <div className="text-xs font-bold mb-1">{player2Pokemon.name}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs">HP</span>
                                <div className="w-24 h-2 bg-gray-300 border border-black">
                                    <div
                                        className={`h-full transition-all duration-500 ${player2Pokemon.hp > player2Pokemon.maxHp * 0.5
                                            ? "bg-green-500"
                                            : player2Pokemon.hp > player2Pokemon.maxHp * 0.2
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                        style={{ width: `${(player2Pokemon.hp / player2Pokemon.maxHp) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="text-xs">
                                {player2Pokemon.hp}/{player2Pokemon.maxHp}
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-8">
                            <div className="relative">
                                <img
                                    src={player2Pokemon.image || "/placeholder.svg"}
                                    alt={player2Pokemon.name}
                                    className="w-32 h-32 pixelated"
                                    style={{ imageRendering: "pixelated" }}
                                />
                                {player2Pokemon.hp <= 0 && <div className="absolute inset-0 bg-red-500 opacity-50 animate-pulse" />}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative p-4">
                        <div className="absolute top-4 left-4 bg-white border-2 border-black p-2 rounded">
                            <div className="text-xs font-bold mb-1">{player1Pokemon.name}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs">HP</span>
                                <div className="w-24 h-2 bg-gray-300 border border-black">
                                    <div
                                        className={`h-full transition-all duration-500 ${player1Pokemon.hp > player1Pokemon.maxHp * 0.5
                                            ? "bg-green-500"
                                            : player1Pokemon.hp > player1Pokemon.maxHp * 0.2
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                        style={{ width: `${(player1Pokemon.hp / player1Pokemon.maxHp) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="text-xs">
                                {player1Pokemon.hp}/{player1Pokemon.maxHp}
                            </div>
                        </div>

                        <div className="absolute bottom-8 right-8">
                            <div className="relative">
                                <img
                                    src={player1Pokemon.image || "/placeholder.svg"}
                                    alt={player1Pokemon.name}
                                    className="w-32 h-32 pixelated transform scale-x-[-1]"
                                    style={{ imageRendering: "pixelated" }}
                                />
                                {player1Pokemon.hp <= 0 && <div className="absolute inset-0 bg-red-500 opacity-50 animate-pulse" />}
                            </div>
                        </div>
                    </div>

                    <div className="h-32 bg-white border-t-4 border-black p-4">
                        <div className="h-full bg-gray-100 border-2 border-gray-400 p-3 relative">
                            <div className="text-sm leading-relaxed">{battleText}</div>

                            {battlePhase === "battle" && isPlayerTurn && player1Pokemon.hp > 0 && (
                                <div className="absolute bottom-2 right-2">
                                    <button
                                        onClick={handleAttack}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs border-2 border-blue-700 rounded cursor-pointer"
                                    >
                                        ATTACK
                                    </button>
                                </div>
                            )}

                            {battlePhase === "victory" && (
                                <div className="absolute bottom-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => window.location.href = route('home')}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs border-2 border-green-700 rounded cursor-pointer"
                                    >
                                        NEW BATTLE
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-2 left-2 w-4 h-4 bg-red-500 rounded-full border-2 border-red-700"></div>
            <div className="absolute top-2 left-8 w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="absolute top-2 left-12 w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
    )
}
