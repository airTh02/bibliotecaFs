import { User } from "./user";

export type BookRow = {
    title: string
}

export type TotalBooks = {
    count: number
    rows: BookRow[]
}

export type DashboardData = {
    totalBooks: TotalBooks
    totalLidos: number
    totalLendo: number
    totalQuerLer: number
    totalFavoritos: number
}