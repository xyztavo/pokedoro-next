import axios from 'axios'

// todo: try to fix ENV because its not working for some reason ,
const API_BASE_URL = "http://127.0.0.1:8787"

export const baseUrl = axios.create({ 
    baseURL: API_BASE_URL
})

export const meRoute = axios.create({
    baseURL: `${API_BASE_URL}/me`
})

export const usersRoute = axios.create({
    baseURL: `${API_BASE_URL}/users`
})

export const pokeApiRoute = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})
