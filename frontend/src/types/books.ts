
export type UserBook = {
    status: StatusType
    favorite: boolean
}


export type User = {
    id: number
    name: string
    UserBook: UserBook
}

export type Book = {
    id: number
    title: string
    author: string
    genre: string
    year: number
    synopsis: string
    Users: User[]
}

export type getBooksType = {
    page: number
    limit: number
    total: number
    totalPages: number
    books: Book[]
}

export type StatusType = 'lido' | 'lendo' | 'quer ler' | 'nenhum'