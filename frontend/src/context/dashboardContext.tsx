import { getDashboard } from "@/api/dashboard";
import { DashboardData } from "@/types/dashboard";

import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";

type DashboardContextType = {
    data: DashboardData | null
    loading: boolean
    refreshDashboard: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType>({
    data: null,
    loading: false,
    refreshDashboard: async () => { }
})

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchDashboard = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            if (!token) return
            const res = await getDashboard(token)
            setData(res)
        } catch (error){
            console.error("erro no fetchdashboard ", error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <DashboardContext.Provider value={{ data, loading, refreshDashboard: fetchDashboard }}>
            {children}
        </DashboardContext.Provider>
    )
    
}

export const useDashboard = () => useContext(DashboardContext)