"use client"

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function Page() {
    const [username, setUsername] = useState('')
    return (
        <div className='flex flex-col items-center my-4 space-y-4'>
            <form onSubmit={(e) => {
                e.preventDefault()
                redirect(`/users/${username}`)
            }} className='flex flex-row items-center'>
                <Input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Button variant={'outline'} type='submit' size={'icon'}>
                    <Search />
                </Button>
            </form>
        </div>
    )
}