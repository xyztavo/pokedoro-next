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
import { pokeApi } from "@/types/poke-api"
import { SpriteGallery } from "@/components/pokemon/sprite-gallery"


export default function Page() {
    const params = useParams<{ pokemonId: string }>()

    const { data, error, isLoading, isValidating } = useSWR<pokeApi>('pokemon', async () => {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
        return results.data
    }, { shouldRetryOnError: false })

    if (error) return <div className="text-center my-4">No Pokemons found. <Button variant={'outline'} asChild><Link href={'/'}>Go back</Link></Button></div>
    if (isLoading || isValidating) return <div className="text-center my-4">loading...</div>

    return (
        data &&
        <div className="flex flex-col justify-between items-center my-4 space-y-4">
            <div className="flex flex-col items-center gap-4 border rounded-md p-4">
                <div className="flex flex-row items-center gap-4">
                    <p>{String(data.name).charAt(0).toUpperCase() + String(data.name).slice(1)}</p>
                    <p className="border p-1 rounded-md"> ID:{params.pokemonId}</p>
                </div>
                <div className="flex flex-row gap-4">
                    {data.types.map((t, idx) => {
                        const semiTypeId = String(t.type.url).split("https://pokeapi.co/api/v2/type/")
                        const typeId = semiTypeId.map((u) => u.split("/"))
                        const typeIdActual = String(typeId[1]).replace(',', '')

                        return (
                            <img key={idx} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/x-y/${typeIdActual}.png`}></img>
                        )
                    })}
                </div>
                <Carousel opts={{
                    loop: true,
                }}>
                    <CarouselContent className="max-w-56">
                        {Object.values(data.sprites.versions['generation-v']['black-white'].animated).sort().map((sUrl, idx) => {
                            if (typeof sUrl == 'string') {
                                return (
                                    <CarouselItem key={idx}>
                                        <img className="w-full" src={sUrl} />
                                    </CarouselItem>
                                )
                            }
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
           <SpriteGallery pokeApiData={data} />
        </div>
    )
}