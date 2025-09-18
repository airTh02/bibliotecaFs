import { getDashboard } from "@/api/dashboard";
import { DashboardData } from "@/types/dashboard";
import { User } from "@/types/user";
import axios from "axios";
import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";

type DashboardContextType = {
    data: DashboardData | null
    loading: boolean
    refreshLoading: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType>({
    data: null,
    loading: false,
    refreshLoading: async () => { }
})

export const dashBoardProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchDashboard = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            if (!token) return

            const res = await getDashboard(token)
            setData(res)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <DashboardContext.Provider value={{ data, loading, refreshLoading: fetchDashboard }}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = useContext(DashboardContext)