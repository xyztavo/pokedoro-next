"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios, { AxiosError, AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { Loader2 } from "lucide-react"
import env from '@/lib/config.json'

const formSchema = z.object({
    name: z.string().min(5, {
        message: "username must have at least 5 characters."
    }).max(20, { message: "max username characters is 20" }).refine(s => !s.includes(' '), 'user shall contain no spaces.').refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""), 'must be only alphabetical.'),
    email: z.string().email({
        message: "Email not valid."
    }),
    password: z.string().min(5, {
        message: "Password must include at least 5 characters."
    }).max(30, { message: "max password characters is 30" })
})

export default function ProfileForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // username: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        await axios.post(`${env.API_BASE_URL}/user`, values).then((response: AxiosResponse) => {
            const data = response.data;
            const token = data.token;
            setCookie('auth', token, { httpOnly: false })
            toast.success('User created with ease.')
            router.push('/user')
            router.refresh()
            setIsLoading(false)
        }).catch((err: AxiosError) => {
            switch (err.response?.status) {
                case 500:
                    toast.error("user already exists")
                    setIsLoading(false)
                    break
                default:
                    toast.error("internal server error")
                    setIsLoading(false)
                    break
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-md my-4 p-4 space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="ustav" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your public username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@email.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    Choose an email from your provider.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Pick a strong password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="flex flex-row justify-center items-center gap-4">{isLoading ? <><Loader2 className="animate-spin" />Creating User</> : <>Create user</>}</Button>
                </form>
            </Form>
            <Button variant={'link'} asChild><Link href={'/login'}>already have an account? log in</Link></Button>
        </div>
    )
}
