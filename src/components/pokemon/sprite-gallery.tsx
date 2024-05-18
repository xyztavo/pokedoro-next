"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { pokeApi } from "@/types/poke-api"

export function SpriteGallery({ pokeApiData }: { pokeApiData: pokeApi }) {
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[350px] border rounded-md p-4">
            <Tabs defaultValue="artwork" className="flex flex-col justify-center items-center">
                <h1>Sprites gallery:</h1>
                <TabsList >
                    {pokeApiData.sprites.other['official-artwork'] &&
                        <TabsTrigger value="artwork"> ofc-art </TabsTrigger>
                    }
                    {pokeApiData.sprites &&
                        <TabsTrigger value="blacknwhite"> b&w</TabsTrigger>
                    }
                    {pokeApiData.sprites.versions['generation-vi']['x-y'] &&
                        <TabsTrigger value="xy"> x-y</TabsTrigger>
                    }
                </TabsList>
                {pokeApiData.sprites.other['official-artwork'] &&
                    <TabsContent value="artwork">
                        <Carousel opts={{
                            loop: true,
                        }}>
                            <CarouselContent className="w-64">
                                {Object.values(pokeApiData.sprites.other['official-artwork']).sort().map((sUrl, idx) => {
                                    if (typeof sUrl == 'string') {
                                        return (
                                            <CarouselItem key={idx} className="h-[250px] flex justify-center items-center">
                                                <img className="h-full" src={sUrl} />
                                            </CarouselItem>
                                        )
                                    }
                                })
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </TabsContent>
                }
                {pokeApiData.sprites &&
                    <TabsContent value="blacknwhite">
                        <Carousel opts={{
                            loop: true,
                        }}>
                            <CarouselContent className="w-64">
                                {Object.values(pokeApiData.sprites).sort().map((sUrl, idx) => {
                                    if (typeof sUrl == 'string') {
                                        return (
                                            <CarouselItem key={idx} className="h-[250px] flex justify-center items-center">
                                                <img className="w-full disable-blur" src={sUrl} />
                                            </CarouselItem>
                                        )
                                    }
                                })
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </TabsContent>
                }
                {pokeApiData.sprites.versions['generation-vi']['x-y'] &&
                    <TabsContent value="xy">
                        <Carousel opts={{
                            loop: true,
                        }}>
                            <CarouselContent className="w-64">
                                {Object.values(pokeApiData.sprites.versions['generation-vi']['x-y']).sort().map((sUrl, idx) => {
                                    if (typeof sUrl == 'string') {
                                        return (
                                            <CarouselItem className="h-[250px] flex justify-center items-center" key={idx}>
                                                <img className="h-full disable-blur" src={sUrl} />
                                            </CarouselItem>
                                        )
                                    }
                                })
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </TabsContent>
                }
            </Tabs>
        </div>)
}