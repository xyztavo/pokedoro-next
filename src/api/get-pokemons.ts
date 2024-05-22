import { baseUrl } from "./lib/axios"

async function getPokemons() {
    const results = await baseUrl.get(`/pokemon`)
    return results.data
}

export default getPokemons