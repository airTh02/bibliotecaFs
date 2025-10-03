import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


// TODO: finalizar isso usando children e retornando algum skeleton, e redirecionando com setitmout, deixar bonitin

export const RequireAuth = () => {
    const { user } = useAuth()
    const router = useRouter()

    return (
        useEffect(() => {
            if (user === null) return router.push('/login')
        }, [user])
    )
}