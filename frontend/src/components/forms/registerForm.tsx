"use client"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '../dark-light'
import { useAuth } from '@/context/authContext'


const registerSchema = z.object({
    name: z.string().min(1, "Digite seu nome completo"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

type RegisterFormType = z.infer<typeof registerSchema>

export const RegisterForm = () => {

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const router = useRouter()
    const { setUser } = useAuth()

    const onSubmit = async (values: RegisterFormType) => {
        try {
            const { data } = await axios.post("http://localhost:5000/auth/register", values)

            localStorage.setItem("token", data.token)
            setUser(data.user)

            router.push("/dashboard")
        } catch (error: any) {
            alert(error.response?.data?.message || "erro ao se cadastrar")
        }

    }

    return (

        <div className='flex min-h-screen items-center justify-center'>
            <div className='absolute top-5 right-5 cursor-pointer'>
                <ModeToggle />
            </div>
            <div className='w-full max-w-md space-y-6 rounded-lg border p-6 shadow'>
                <h1 className=''>Cadastre-se</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Digite seu nome' {...field} />
                                    </FormControl>
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
                                        <Input placeholder='Digite sua senha' type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full cursor-pointer'>
                            Cadastrar-se
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}