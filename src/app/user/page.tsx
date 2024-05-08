'use client'
import useSWR from 'swr'
import { getCookie } from "cookies-next"
import { Loader2, Search } from 'lucide-react'
import { pokemonList } from '@/components/pokemons-list'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { returnTypeIcon } from '@/lib/utils/returnTypeIcon'


export default function Page() {
    // pagination and query stuff
    const [pokemonQuery, setPokemonQuery] = useState('')
    const searchParams = useSearchParams()
    const pageIndex = Number(searchParams.get('pageIndex'))
    const query = searchParams.get('query')
    const router = useRouter()
    const currentPage = pageIndex ? pageIndex : 0

    const authToken = getCookie('auth')

    const [isNewPokeLoading, setIsNewPokeLoading] = useState(false)
    const [newPokeData, setNewPokeData] = useState()


    const { mutate, data, error, isLoading, isValidating } = useSWR(['b', pageIndex, query], async () => {
        const results = await fetch(`http://localhost:8787/user/pokemon?pageIndex=${pageIndex ? pageIndex : 0}${query ? `&query=${query}` : ''}`, {
            headers: new Headers({
                'Authorization': `Beaerer ${authToken}`
            })
        })
        return await results.json()
    }, { shouldRetryOnError: false, revalidateOnFocus: false })

    async function getRandomPoke() {
        const randomId = Math.floor(Math.random() * 650)
        try {
            setIsNewPokeLoading(true)
            const res = await axios.put(`http://localhost:8787/user/pokemon`, { pokemonId: randomId }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            setNewPokeData(res.data)
            mutate('b')
        } catch (error) {
            toast.error('could not add pokemon to user.')
        } finally {
            setIsNewPokeLoading(false)
        }

    }

    if (error) return (
        <div className='text-center gap-4'>
            <p>User got no pokemons.</p>
            <Button onClick={() => getRandomPoke()}>Get me my first pokemon</Button>
        </div>
    )

    if (isLoading || isValidating) return (
        <div className='flex flex-row gap-4 justify-center items-center my-4'><Loader2 className='animate-spin' />Loading...</div>
    )


    return (
        data &&
        <div className='flex flex-col justify-center items-center my-4 space-y-4'>
            {newPokeData && <Dialog  defaultOpen>
                <DialogContent className='flex flex-col justify-center items-center '>
                    <div className='flex flex-row gap-4 items-center'>
                        {newPokeData.pokemon.typeList.map((type) => returnTypeIcon(type))}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://raw.githubusercontent.com/gustafer/pokedata/main/pokemon-gifs/poke_${newPokeData.pokemon.id}.gif`} />
                    <div>{newPokeData.pokemon.name}</div>
                </DialogContent>
            </Dialog>}
            <h1>{data.user}</h1>
            <Button disabled={isNewPokeLoading} className='flex flex-row justify-center items-center gap-4' onClick={() => getRandomPoke()}>
                {/* change button to loading */}
                {isNewPokeLoading ? <><Loader2 className='animate-spin' />Getting a random pokemon...</> : <>Get me a random pokemon</>}
            </Button>
            <form className="flex flex-row items-center justify-center" onSubmit={(e) => {
                e.preventDefault()
                router.push(`/user?query=${pokemonQuery}`)
            }}>
                <div className="flex flex-row gap-4 max-w-[1/2]">
                    <Input value={pokemonQuery} onChange={(e) => setPokemonQuery(e.target.value)} placeholder="search for a pokemon" />
                    <Button type="submit"><Search /></Button>
                </div>
            </form>
            <div className="flex flex-col space-y-8 my-4 items-center justify-center">
                <div className="flex flex-row flex-wrap justify-center gap-4 p-4">{data && pokemonList(data.pokemons)}</div>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => router.push(`/user?pageIndex=${currentPage > 0 ? currentPage - 1 : currentPage}${pokemonQuery ? '&query=' + pokemonQuery : ''}`)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{currentPage - 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{currentPage + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => {
                            if (currentPage >= data.maxPages) return
                            router.push(`/user?pageIndex=${currentPage + 1}${pokemonQuery ? '&query=' + pokemonQuery : ''}`)
                        }
                        } />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}