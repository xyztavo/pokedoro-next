"use client"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from 'swr'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { stringify } from "querystring"


export default function Page() {
    const params = useParams<{ pokemonId: string }>()

    type pokeApi = {
        pokemonId: number,
        name: string,
        sprites: pokeApiSpritesUrls
    }

    type pokeApiSpritesUrls = {
        front_default: string
    }

    const { data, error, isLoading, isValidating } = useSWR<pokeApi>('pokemon', async () => {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
        return results.data
    }, { shouldRetryOnError: false })

    if (error) return <div className="text-center my-4">No Pokemons found. <Button variant={'outline'} asChild><Link href={'/'}>Go back</Link></Button></div>
    if (isLoading || isValidating) return <div className="text-center my-4">loading...</div>

    return (
        data &&
        <div className="flex flex-col justify-between items-center my-4 space-y-4">
            <div className="flex flex-row items-center gap-4">
                <p>{String(data.name).charAt(0).toUpperCase() + String(data.name).slice(1)}</p>
                <p className="border p-1 rounded-md"> ID:{params.pokemonId}</p>
            </div>

            <div className="flex flex-col rounded-md bg-foreground/3 p-2">
                <h1 className="text-center">Sprites gallery:</h1>
                <Carousel opts={{
                    loop: true,
                }}>
                    <div className="border rounded-md">
                        <CarouselContent className="max-w-56">
                            {Object.values(data.sprites).map((sUrl, idx) => {
                                if (typeof sUrl == 'string') {
                                    return (
                                        <CarouselItem key={idx}>
                                            <img className="w-full" src={sUrl} />
                                        </CarouselItem>
                                    )
                                }
                            })
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}