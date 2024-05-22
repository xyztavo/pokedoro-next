import getPokemons from "@/api/get-pokemons";
import { pokemonList } from "@/components/pokemon/pokemons-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const data = await getPokemons()
  return (
    <div className="flex flex-col items-center justify-center space-y-8 m-2 rounded-md">
      <h1 className="text-xl text-center">Lots of pokemons to choose from!</h1>
      <div className="flex flex-row justify-center items-center flex-wrap gap-4">
        {pokemonList(data.pokemons)}
      </div>
      <Button asChild><Link href={'/pokedex'}>Full Pokédex</Link></Button>
    </div>
  );
}