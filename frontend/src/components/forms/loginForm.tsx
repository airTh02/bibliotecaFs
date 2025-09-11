"use client"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {  z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'


const loginSchema = z.object({
    email: z.email("E-mail válido"),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

type LoginFormType = z.infer<typeof loginSchema>

export const LoginForm = () => {

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const router = useRouter()

    const onSubmit = async (values: LoginFormType) => {
        try {
            const { data } = await axios.post("http://localhost:5000/auth/login", values)

            localStorage.setItem("token", data.token)
            router.push("/dashboard")
        } catch (error: any) {
            alert(error.response?.data?.message || "erro no login")
        }
        
    }

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <div className='w-full max-w-md space-y-6 rounded-lg border p-6 shadow'>
                <h1 className=''>Login</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Digite seu e-mail' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Digite sua senha' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full'>
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}