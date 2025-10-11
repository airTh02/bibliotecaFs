import { useEffect, useState } from "react"
import { BookCard } from "./bookCards"
import { Book, StatusType } from "@/types/books"
import { deleteBookFromUser, favoriteUserBook, getBooks, getUserBooks, putStatus } from "@/api/dashboard"
import { useDashboard } from "@/context/dashboardContext"
import { Toaster } from "sonner"


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

    const favoriteBook = async (bookId: number) => {
        const token = localStorage.getItem('token')
        if(!token) return 
        const favoritedBook = await favoriteUserBook(bookId, token)
        setData(prev => prev.map(book => book.id === bookId ? {...book, Users: [{...book.Users[0], UserBook: {...book.Users[0].UserBook, favorite: favoritedBook.favorite}}]}: book))
        await refreshDashboard()
        return favoritedBook
    }

    useEffect(() => {
        userbooksReq()
    }, [])

    return (
        <div className="grid grid-cols-3 gap-7">
            {data.map((book) => (
                <BookCard key={book.id} book={book} onChangeStatus={changeStatus} onDeleteUserBook={deleteUserBook} onFavoriteBook={favoriteBook} />
            ))}
            <Toaster closeButton/>
        </div>
        
    )
}