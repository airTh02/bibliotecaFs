import { User } from "./user";

export type Book = {
    title: string;
    author: string
    genre: string
    year: number;
    synopsis?: string
}

export type DashBoardData = {
    user: User
    books: Book[]
}