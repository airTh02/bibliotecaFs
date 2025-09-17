
"use client"
import { User } from "@/types/user";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from 'axios'


type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    logout: () => { }
})


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {

            axios.get("http://localhost:5000/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setUser(res.data.user))
                .catch((err) => {
                    console.error("Erro ao buscar usuário", err)
                    localStorage.removeItem("token")
                    setUser(null)
                    router.push("/login")
                })
        }
    }, [])


    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        router.push("/login")
    }


    return (
        <AuthContext.Provider value={{ user, setUser, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)