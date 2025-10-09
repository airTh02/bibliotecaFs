import { useEffect, useState } from "react"
import { BookCard } from "./bookCards"
import { Book, StatusType } from "@/types/books"
import { deleteBookFromUser, getBooks, getUserBooks, putStatus } from "@/api/dashboard"
import { useDashboard } from "@/context/dashboardContext"


// TODO: sla

type UserBookResponse = {
    status: StatusType;
    favorite: boolean;
    Book: Book;
};


export const BookList = () => {

    const { refreshDashboard } = useDashboard()

    const [data, setData] = useState<Book[]>([])


    const userbooksReq = async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        const userBook = await getUserBooks(token)

        const formatedData = userBook.map((ub: UserBookResponse) => ({
            ...ub.Book,
            Users: [{
                UserBook: {
                    status: ub.status,
                    favorite: ub.favorite
                }
            }]
        }))
        setData(formatedData)

    }

    /*const getBooksReq = async () => {
        const token = localStorage.getItem('token')
        if (!token) return

        const {data} = await getBooks(token)
        setData(data)
    }*/

    const changeStatus = async (bookId: number, newStatus: StatusType) => {
        const token = localStorage.getItem('token')
        if (!token) return
        const updatedBook = await putStatus(bookId, token, newStatus)
        setData(prevData => prevData.map(book =>
            book.id === updatedBook.id ? updatedBook : book
        ))

        await refreshDashboard()
    }

    const deleteUserBook = async (bookId: number) => {
        const token = localStorage.getItem('token')
        if (!token) return
        const remove = await deleteBookFromUser(bookId, token)
        if (remove) setData(prev => prev.filter(book => book.id !== bookId))
        await refreshDashboard()
        return remove
    }

    useEffect(() => {
        userbooksReq()
    }, [])

    return (
        <div className="grid grid-cols-3 gap-6">
            {data.map((book) => (
                <BookCard key={book.id} book={book} onChangeStatus={changeStatus} onDeleteUserBook={deleteUserBook} />
            ))}
        </div>
    )
}