"use client"
import axios from "axios"
import { useParams } from "next/navigation"
import useSWR from 'swr'
export default function Page() {
    const params = useParams<{ pokemonId: string }>()

    const { data, error, isLoading } = useSWR('pokemon', async () => {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
        return results.data
    }, { shouldRetryOnError: false })

    
    if (isLoading) return <div>loading...</div>
    return (
        <div>{String(data.name).charAt(0).toUpperCase() + String(data.name).slice(1)} {params.pokemonId}</div>
    )
}