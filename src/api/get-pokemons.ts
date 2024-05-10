import env from '@/lib/config.json'
async function getPokemons(pageIndex: number) {
    const results = await fetch(`${env.API_BASE_URL}/pokemon?pageIndex=${pageIndex ? pageIndex : 0}`)
    const data = await results.json()
    return data
}

export default getPokemons