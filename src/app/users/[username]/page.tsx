"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import useSWR from 'swr'
import env from '@/lib/config.json'
import { Loader2 } from "lucide-react";
import { pokemonListAnimated } from "@/components/pokemon/pokemons-list-with-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Page() {
    const params = useParams<{ username: string }>()
    const { data, isLoading, error } = useSWR(['user/username'], async () => {
        const response = await axios.get(`${env.API_BASE_URL}/user/${params.username}/pokemon`)
        return response.data
    })
    if (error) return (
        <div className="flex flex-col justify-center items-center my-4">
            <p>No user named {params.username} found</p>
            <Button asChild><Link href={'/users'}>Find another user</Link></Button>
        </div>
    )
    return (
        isLoading ? <div className="flex flex-row justify-center items-center gap-4 my-4"><Loader2 className="animate-spin" />Loading...</div> :
            <>{data &&
                <div className="flex flex-col items-center justify-center my-4 space-y-4">
                    <h1>{data.user} Pokémons:</h1>
                    <div className="flex flex-row justify-center items-center flex-wrap gap-4">{pokemonListAnimated(data.pokemons)}</div>
                </div>
            }</>
    )
}