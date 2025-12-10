import { User } from "./user";

export type BookRow = {
    title: string
}

export type TotalBooks = {
    count: number
    rows: BookRow[]
}

export type DashboardData = {
    totalBooks: number
    totalLidos: number
    totalLendo: number
    totalQuerLer: number
    totalFavoritos: number
}