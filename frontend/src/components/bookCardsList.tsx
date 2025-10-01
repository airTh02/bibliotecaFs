import { useEffect, useState } from "react"
import { BookCard } from "./bookCards"
import { Book } from "@/types/books"
import { getBooks } from "@/api/dashboard"

// TODO: fazer contexto de livros do usuário





export const BookList = () => {
    const [data, setData] = useState<Book[]>([])

    const booksReq = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        const data = await getBooks(token)
        setData(data.books)
        console.log(data.books)
    }

    useEffect(() => {
        booksReq()
    }, [])
    
    return (
        <div className="grid grid-cols-3 gap-6">
            {data.map(book => (
                <BookCard key={book.id} book={book}/>
            ))}
        </div>
    )
}