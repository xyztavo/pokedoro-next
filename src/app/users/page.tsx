"use client"

import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [username, setUsername] = useState('')
    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/users/${username}`)
    }

    return (
        <div className='flex flex-col items-center my-4 space-y-4'>
            <h1>Find a user by username:</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-row items-center gap-4'>
                <Input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type='submit' className=' p-2 border rounded-md bg-background hover:bg-muted transition-colors'>
                    <Search />
                </button>
            </form>
        </div>
    )
}