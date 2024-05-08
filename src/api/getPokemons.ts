 async function getPokemons(pageIndex : number) {
    const baseUrl = 'http://localhost:8787'
    const results = await fetch(`${baseUrl}/pokemon?pageIndex=${pageIndex ? pageIndex : 0}`)
    const data = await results.json()
    return data
}

export default getPokemons