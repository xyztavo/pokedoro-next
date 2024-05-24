import axios from 'axios'

// todo: try to fix ENV because its not working for some reason ,
const API_BASE_URL = "https://pokedoro.gustavocluna81.workers.dev"

export const baseUrl = axios.create({ 
    baseURL: API_BASE_URL
})

export const pokemonsRoute = axios.create({
    baseURL: `${API_BASE_URL}/pokemons`
})

export const meRoute = axios.create({
    baseURL: `${API_BASE_URL}/me`
})

export const mePokemonsRoute = axios.create({
    baseURL: `${API_BASE_URL}/me/pokemons`
})

export const userRoute = axios.create({
    baseURL: `${API_BASE_URL}/users`
})

export const pokeApiRoute = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})
