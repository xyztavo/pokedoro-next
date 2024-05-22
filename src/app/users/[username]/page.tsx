"use client"
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from 'swr'
import { Loader2, Search } from "lucide-react";
import { pokemonList } from "@/components/pokemon/pokemons-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usersRoute } from "@/api/lib/axios";


export default function Page() {
    const [pokemonQuery, setPokemonQuery] = useState('')
    const searchParams = useSearchParams()
    const pageIndex = Number(searchParams.get('pageIndex'))
    const query = searchParams.get('query')
    const router = useRouter()
    const currentPage = pageIndex ? pageIndex : 0
    const params = useParams<{ username: string }>()

    const { data, isLoading, isValidating, error } = useSWR(['user/username', pageIndex, query], async () => {
        const res = await usersRoute
            .get(`/${params.username}/pokemon?pageIndex=${pageIndex ? pageIndex : 0}${query ? `&query=${query}` : ''}`)
        return res.data
    }, {
        shouldRetryOnError: false,
    })

    //  should fix the poor error handling. it works perfectly for now but not best practices. 
    //  should fix the inarray must have at least in backend

    // check if the url contains query and has error
    if (error && window.location.href.includes("query")) {
        return <div className="flex flex-col justify-center items-center gap-4 my-4">
            <form className="flex flex-row items-center justify-center" onSubmit={(e) => {
                e.preventDefault()
                router.push(`/users/${params.username}/?query=${pokemonQuery}`)
            }}>
                <div className="flex flex-row gap-4 max-w-[1/2]">
                    <Input value={pokemonQuery} onChange={(e) => setPokemonQuery(e.target.value)} placeholder="search for a pokemon" />
                    <Button type="submit" variant={'ghost'} size={'icon'}><Search /></Button>
                </div>
            </form>
            <p>
                No pokemons named {query} were found on {params.username} bag.
            </p>
        </div>
    } else if (error) {
        return <div>User not found</div>
    }

    return (
        isLoading || isValidating ? <div className="flex flex-row justify-center items-center gap-4 my-4"><Loader2 className="animate-spin" />Loading...</div> :
            <>{data &&
                <div className="flex flex-col items-center justify-center my-4 space-y-4">
                    <form className="flex flex-row items-center justify-center" onSubmit={(e) => {
                        e.preventDefault()
                        router.push(`/users/${params.username}/?query=${pokemonQuery}`)
                    }}>
                        <div className="flex flex-row gap-4 max-w-[1/2]">
                            <Input value={pokemonQuery} onChange={(e) => setPokemonQuery(e.target.value)} placeholder="search for a pokemon" />
                            <Button type="submit" variant={'ghost'} size={'icon'}><Search /></Button>
                        </div>
                    </form>
                    <h1>{data.user} Pokémons:</h1>
                    <div className="flex flex-row justify-center items-center flex-wrap gap-4">{pokemonList(data.pokemons)}</div>
                    <Pagination className='scale-75 md:scale-100'>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={() => router.push(`?pageIndex=${currentPage > 0 ? currentPage - 1 : currentPage}${pokemonQuery ? '&query=' + pokemonQuery : ''}`)} />
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
                                    router.push(`?pageIndex=${currentPage + 1}${pokemonQuery ? '&query=' + pokemonQuery : ''}`)
                                }
                                } />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            }</>
    )
}