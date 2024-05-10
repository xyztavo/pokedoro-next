"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation";


export function LoginCard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()
    const cookieValue = getCookie('auth')
    useEffect(() => {
        cookieValue ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, [cookieValue])

    if (isLoggedIn) return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant={'outline'}>Account</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={'/user'}>Pokemons</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    deleteCookie('auth')
                    router.push('/login')
                    router.refresh()
                    }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    if (!isLoggedIn) return <Button variant={'outline'} asChild><Link href={'/login'}>Log in</Link></Button>
}