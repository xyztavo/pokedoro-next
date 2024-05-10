"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Loader2 } from "lucide-react"
import Link from "next/link"
import axios from 'axios'
import { setCookie } from "cookies-next"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
    email: z.string().email({
        message: "Email not valid."
    }),
    password: z.string().min(6, {
        message: "Password not valid."
    })
})

import env from '@/lib/config.json'

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

        try {
            const res = await axios.post(`${env.API_BASE_URL}/user/login`, values);
            const data = res.data;
            const token = data.token;

            const oneDayInSeconds = 24 * 60 * 60 * 1000

            setCookie('auth', token, { httpOnly: false })
            toast.success('logged in')
            router.push('/user')
            router.refresh()
        } catch (error) {
            // todo: validate better each error using res.status = 4xx 
            toast.error('password / user does not match')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-md my-4 p-4 space-y-8">
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
                                    The email you've signed up with.
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
                                    <Input placeholder="password" type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The account password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="flex flex-row justify-center items-center gap-4" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : <></>}Log In</Button>
                </form>
            </Form>
            <Button variant={'link'} asChild><Link href={'/register'}>no account? register now</Link></Button>
        </div>
    )
}
