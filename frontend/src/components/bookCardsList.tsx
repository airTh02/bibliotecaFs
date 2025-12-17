import { useEffect, useMemo, useState } from "react"
import { BookCard } from "./bookCards"
import { Book, Filter, OrdenationFilter, StatusType, ViewModel } from "@/types/books"
import { deleteBookFromUser, favoriteUserBook, getBooks, getUserBooks, putStatus } from "@/api/dashboard"
import { useDashboard } from "@/context/dashboardContext"
import { Toaster } from "sonner"


// TODO: sla

type UserBookResponse = {
    status: StatusType;
    favorite: boolean;
    Book: Book;
};
type BookListProps = { filter: Filter, search: string, ordenationFilter: OrdenationFilter | null, downOrUpValue: boolean, viewModelValue: ViewModel }



export const BookList = ({ filter, search, ordenationFilter, downOrUpValue, viewModelValue}: BookListProps) => {

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
        await refreshDashboard()
    }

    const changeStatus = async (bookId: number, newStatus: StatusType) => {
        const token = localStorage.getItem('token')
        if (!token) return
        const updatedBook = await putStatus(bookId, token, newStatus)
        setData(prevData => prevData.map(book =>
            book.id === updatedBook.id
                ? {
                    ...book,
                    Users: [{
                        ...book.Users[0],
                        UserBook: {
                            ...book.Users[0].UserBook,
                            status: newStatus
                        }
                    }]
                } : book
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
        if (!token) return
        const favoritedBook = await favoriteUserBook(bookId, token)
        setData(prev => prev.map(book => book.id === bookId ? { ...book, Users: [{ ...book.Users[0], UserBook: { ...book.Users[0].UserBook, favorite: favoritedBook.favorite } }] } : book))
        await refreshDashboard()
        return favoritedBook
    }


    const orderedBooks = useMemo(() => {
        const sorters: Record<
            Exclude<OrdenationFilter, null>,
            (a: Book, b: Book) => number
        > = {
            ano: (a, b) => a.year - b.year,
            titulo: (a, b) => a.title.localeCompare(b.title),
            autor: (a, b) => a.author.localeCompare(b.author),
        }

        const filteredBooks = data.filter(book => {
            const userBook = book.Users?.[0]?.UserBook
            if (!userBook) return false

            if (search) {
                const query = search.toLowerCase()
                const matchQuery =
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query) ||
                    book.genre.toLowerCase().includes(query)

                if (!matchQuery) return false
            }

            if (filter === 'todos') return true
            if (filter === 'lidos') return userBook.status === 'lido'
            if (filter === 'lendo') return userBook.status === 'lendo'
            if (filter === 'quer ler') return userBook.status === 'quer ler'
            if (filter === 'favoritos') return userBook.favorite === true

            return true
        })
        if (!ordenationFilter) return filteredBooks

        const sorter = sorters[ordenationFilter]

        const sortedBooks = [...filteredBooks].sort((a,b) => {
            const result = sorter(a, b)
            return downOrUpValue ? result : -result 
        })

        return sortedBooks
    }, [data, filter, search, ordenationFilter, downOrUpValue ])


    useEffect(() => {
        userbooksReq()
    }, [])


    return (
        <div className="grid grid-cols-3 gap-7">
            {orderedBooks.map((book) => (
                <BookCard key={book.id} book={book} onChangeStatus={changeStatus} onDeleteUserBook={deleteUserBook} onFavoriteBook={favoriteBook}  />
            ))}
            <Toaster closeButton />
        </div>

    )
}