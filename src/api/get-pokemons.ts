import { pokemonsRoute } from "./lib/axios"

async function getPokemons() {
    const results = await pokemonsRoute.get('')
    return results.data
}

export default getPokemons