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
        <div className="flex flex-col items-center gap-4 border rounded-md p-4">
            <Tabs defaultValue="artwork">
                <h1>Sprites gallery:</h1>
                <TabsList >
                    <TabsTrigger value="artwork">ofc-art</TabsTrigger>
                    <TabsTrigger value="blacknwhite">
                        b&w
                    </TabsTrigger>
                    <TabsTrigger value="xy">x-y</TabsTrigger>
                </TabsList>
                <TabsContent value="artwork">
                    <Carousel opts={{
                        loop: true,
                    }}>
                        <CarouselContent className="w-56">
                            {Object.values(pokeApiData.sprites.other['official-artwork']).sort().map((sUrl, idx) => {
                                if (typeof sUrl == 'string') {
                                    return (
                                        <CarouselItem key={idx}>
                                            <img className="w-56" src={sUrl} />
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
                <TabsContent value="blacknwhite">
                    <Carousel opts={{
                        loop: true,
                    }}>
                        <CarouselContent className="max-w-56">
                            {Object.values(pokeApiData.sprites).sort().map((sUrl, idx) => {
                                if (typeof sUrl == 'string') {
                                    return (
                                        <CarouselItem key={idx}>
                                            <img className="w-56" src={sUrl} />
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
                <TabsContent value="xy">
                    <Carousel opts={{
                        loop: true,
                    }}>
                        <CarouselContent className="max-w-56">
                            {Object.values(pokeApiData.sprites.versions['generation-vi']['x-y']).sort().map((sUrl, idx) => {
                                if (typeof sUrl == 'string') {
                                    return (
                                        <CarouselItem key={idx}>
                                            <img className="w-56" src={sUrl} />
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
            </Tabs>

        </div>)
}