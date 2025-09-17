import {  Book, DashBoardData } from "@/types/dashboard";
import { User } from "@/types/user";
import { createContext, ReactNode } from "react";

type DashboardContextType = {
    user: User | null
    books: Book[]
    loading: boolean
    refreshDashboard: () => void
}

const DashboardContext = createContext<DashboardContextType>({
   user: null,
   books: [],
   loading: false,
   refreshDashboard: () => {}
})

export const dashBoardProvicer = ({children}: {children: ReactNode}) => {

}