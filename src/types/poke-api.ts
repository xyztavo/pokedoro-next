export type pokeApi = {
    pokemonId: number,
    name: string,
    sprites: pokeApiSpritesUrls,
    height: number,
    weight: number, 
    types: any[],
}

export type pokeApiSpritesUrls = {
    versions: any,
    other: any,
    front_default: string,
}
