

export type Book = {
    id: number
    title: string
    author: string
    genre: string
    year: number
    synopsis: string
}

export type getBooksType = {
    page: number
    limit: number
    total: number
    totalPages: number
    books: Book[]
}