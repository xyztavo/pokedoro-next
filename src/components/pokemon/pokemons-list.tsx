import { returnTypeIcon } from "@/components/pokemon/return-type-icon"
import { TPokemons } from "@/types/pokemons"
import Link from "next/link"

export function pokemonList(pokemons: TPokemons) {
    return pokemons.map((poke) => (
        <div
            key={poke.id}
        >
        <div className="border rounded-md bg-background hover:scale-[1.15] transition-transform" >
                <Link href={`/pokedex/${poke.id}`}>
                    <div className="flex items-center justify-center gap-4 border-b">
                        <div className="flex  items-center justify-center gap-4">
                            {poke.types.map((type: string, index: number) => {
                                return <span key={index}>{returnTypeIcon(type)}</span>
                            })}
                        </div>
                    </div>
                    <div className="flex rounded-md w-40 h-40 items-center justify-center box-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="max-w-full max-h-full" alt={poke.name} src={`https://raw.githubusercontent.com/gustafer/pokedata/main/pokemon-gifs/poke_${poke.id}.gif`} />
                    </div>
                    <h1 className="border-t text-sm whitespace-nowrap text-ellipsis overflow-clip m-auto text-center my-1">{poke.name}</h1>
                </Link>
        </div>
        </div>
    ))
}