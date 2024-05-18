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
import { ArrowUp, Weight } from "lucide-react"


export default function Page() {
    const params = useParams<{ pokemonId: string }>()

    const { data, error, isLoading, isValidating } = useSWR<pokeApi>('pokemon', async () => {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
        return results.data
    }, { shouldRetryOnError: false })

    const { data: aditionalData, error: aditionalError, isLoading: isAditionalLoading, isValidating: isAditionalValidating } = useSWR('species', async () => {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${params.pokemonId}/`)
        return results.data
    }, { shouldRetryOnError: false })




    if (error) return <div className="text-center my-4">No Pokemons found. <Button variant={'outline'} asChild><Link href={'/'}>Go back</Link></Button></div>
    if (isLoading || isValidating || isAditionalLoading || isAditionalValidating) return <div className="text-center my-4">loading...</div>


    const quotesEntries = [0, 3, 4]
    return (
        data &&
        aditionalData &&
        <div className="flex flex-col justify-center gap-4 ">
            <div className="flex flex-col md:flex-row justify-center md:gap-28 items-center p-4 space-y-4">
                <div className="flex flex-col items-center gap-4 border rounded-md p-4 w-[350px]">
                    <div className="flex flex-row items-center gap-4">
                        <p>{String(data.name).charAt(0).toUpperCase() + String(data.name).slice(1)}</p>
                        <p className="border p-1 rounded-md"> ID:{params.pokemonId}</p>
                    </div>
                    {aditionalData.is_legendary ? <div className="text-xs">Legendary!</div> : <></>}

                    <div className="flex flex-row gap-4">
                        {data.types.map((t, idx) => {
                            const semiTypeId = String(t.type.url).split("https://pokeapi.co/api/v2/type/")
                            const typeId = semiTypeId.map((u) => u.split("/"))
                            const typeIdActual = String(typeId[1]).replace(',', '')

                            return (
                                <img key={idx} className="disable-blur" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/x-y/${typeIdActual}.png`}></img>
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
                                            <img className="w-full disable-blur" src={sUrl} />
                                        </CarouselItem>
                                    )
                                }
                            })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className="flex flex-col md:flex-row gap-4 justify-center border rounded-md p-2 text-xs md:max-w-[300px]">
                        <p className="flex flex-row gap-4 justify-center items-center"><ArrowUp />Height: {data.height / 10}m</p>
                        <p className="flex flex-row gap-4 justify-center  items-center"><Weight />Weight: {data.weight}kg</p>
                    </div>
                </div>
                <SpriteGallery pokeApiData={data} />
            </div>
            {aditionalData.flavor_text_entries &&
                <div className="flex flex-col">
                    <div className="flex flex-col justify-center items-center gap-4 p-2">
                        <h1>Quotes:</h1>
                        <div className="flex flex-col md:flex-row border rounded-md ">
                            {quotesEntries.map((e, idx) => {
                                return <p key={idx} className="border-y md:border-x p-4 max-w-[400px] text-[10px] leading-5 font-thin text-center">{aditionalData.flavor_text_entries[e].flavor_text}</p>
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}