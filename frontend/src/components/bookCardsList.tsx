import { useEffect, useState } from "react"
import { BookCard } from "./bookCards"
import { Book, StatusType} from "@/types/books"
import { getBooks, putStatus } from "@/api/dashboard"
import { useDashboard } from "@/context/dashboardContext"

// TODO: sla




export const BookList = () => {

    const { refreshDashboard } = useDashboard()

    const [data, setData] = useState<Book[]>([])


    const booksReq = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        const data = await getBooks(token)
        setData(data.books)
        
    }

    const changeStatus = async (bookId:number, newStatus: StatusType ) => {
        const token = localStorage.getItem('token')
        if(!token) return
        const updatedStatus = await putStatus(bookId, token, newStatus)
        setData(prevData => prevData.map(book => 
            book.id === bookId ? {...book, userBooks: [{status: updatedStatus}]} : book
         ))

         await refreshDashboard()
    }

    useEffect(() => {
        booksReq()
    }, [])
    
    return (
        <div className="grid grid-cols-3 gap-6">
            {data.map((book) => (
                <BookCard key={book.id} book={book} onChangeStatus={changeStatus} />
            ))}
        </div>
    )
}