import { Heart, EllipsisVertical, UserRound, Calendar, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react';
import { Book, StatusType } from '@/types/books';
import { Modal2 } from './ui/modal2';
import { toast, } from 'sonner';


//TODO: arrumar esse status aqui logica de merda

type Props = {
    book: Book
    onChangeStatus: (bookId: number, newStatus: StatusType) => void
    onDeleteUserBook: (bookId: number) => void
    onFavoriteBook: (bookId: number) => void
}

export const BookCard = ({ book, onChangeStatus, onDeleteUserBook, onFavoriteBook }: Props) => {


    const initialStatus = book.Users?.[0]?.UserBook?.status || 'nenhum';
    const initalFavorite = book.Users?.[0].UserBook.favorite || false
    const [status, setStatus] = useState<StatusType>(initialStatus)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [bookToDelete, setBookToDelete] = useState<number | null>(null)
    const [isFavorited, setIsFavorited] = useState<boolean>(initalFavorite)


    const handleStatus = async (newStatus: StatusType) => {
        setStatus(newStatus)
        onChangeStatus(book.id, newStatus)
    }

    const firstLetterUppercase = (title: string) => {
        return title
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")

    }
    const handleOpenModalRemove = () => {
        setBookToDelete(book.id)
        setIsModalOpen(true)
    }
    const handleConfirmRemovalFromBookCase = () => {
        if (bookToDelete) {
            onDeleteUserBook(bookToDelete)
            setIsModalOpen(false)
            setBookToDelete(null)
        }
    }
    const handleFavoritedBook = () => {
        setIsFavorited(!isFavorited)
        onFavoriteBook(book.id)
    }



    return (
        <div className='h-[260px] w-[410px] flex flex-col justify-between'>
            <div className={`w-full  min-h-[255px]  bg-gray-800 py-6 px-5 border border-gray-900/20 rounded-2xl transition duration-500 ease-in-out hover:shadow-2xl hover:border hover:border-gray-500 `}>
                <div className="flex justify-between ">
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-medium text-xl text-white'>{firstLetterUppercase(book.title)}</h1>
                        <p className='text-sm text-gray-300 flex items-center gap-2 '><UserRound size={16} />{firstLetterUppercase(book.author)}</p>
                    </div>
                    <div className='flex gap-3 '>

                        <Button
                            variant="outline"
                            className="bg-gray-800 cursor-pointer text-gray-300 border-0 hover:text-red-600 hover:bg-blue-500"
                            onClick={() => {
                                handleFavoritedBook()
                                toast.custom(() => (
                                    <div className="flex flex-col gap-2 bg-gray-900 border-1 border-gray-600 text-white px-5 text-sm py-5 rounded-xl shadow-lg ">
                                        {isFavorited ? <p className='font-bold'>Removido dos Favoritos</p> : <p className='font-bold'>Adicionado aos Favoritos</p>}
                                        {isFavorited ? <p>"{firstLetterUppercase(book.title)}" foi removido dos Favoritos</p> : <p>"{firstLetterUppercase(book.title)}" foi adicionado aos Favoritos</p>}
                                    </div>
                                ), {
                                    action: "undo"
                                }
                                )
                            }}
                        >
                            <Heart
                                size={16}
                                className={`${isFavorited ? 'text-red-500 ' : 'text-white'}`}
                                fill={`${isFavorited ? 'currentColor' : 'none'}`}

                            />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-gray-800 cursor-pointer text-gray-300 border-0 hover:text-white hover:bg-blue-500"
                                >
                                    <EllipsisVertical size={16} />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="px-1 bg-black border-gray-500 rounded-2xl">
                                <DropdownMenuItem
                                    onClick={handleOpenModalRemove}
                                    className="group text-white focus:text-black focus:bg-blue-500 rounded-xl"
                                >
                                    <Trash2 className="text-white group-focus:text-black" /> Remover da Estante
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {isModalOpen &&
                            <Modal2
                                open={isModalOpen}
                                setModal={setIsModalOpen}
                                onConfirm={handleConfirmRemovalFromBookCase}
                                title='Remover da estante?'
                                description={`Tem certeza que deseja remover "${firstLetterUppercase(book.title)}" da sua estante? Você pode adicioná-lo novamente depois.`}
                                toastDescription={firstLetterUppercase(book.title)}
                                button1='Cancelar'
                                button2='Remover'
                            />
                        }
                    </div>
                </div>
                <div className='flex justify-between mt-4 items-center'>
                    <div className={`flex items-center px-4 py-[2px]  text-[11px] h-fit text-center font-bold rounded-full 
                        ${status === 'quer ler' ? 'bg-gradient-to-br from-purple-600 to-purple-700/5  text-white ' : ''}
                        ${status === 'lendo' ? 'bg-gradient-to-br from-blue-600 to-blue-700/5  text-white' : ''}
                        ${status === 'lido' ? ' bg-gradient-to-br from-emerald-600 to-emerald-700/5  text-white' : ''}
                        `}>{status}
                    </div>
                    <div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer text-sm border-0 rounded-2xl text-white bg-gray-900 hover:bg-blue-500 hover:text-black"
                                >
                                    Alterar Status
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="px-1 bg-black border-gray-500 rounded-2xl">
                                <DropdownMenuItem
                                    onClick={() => handleStatus(`quer ler`)}
                                    className="text-white focus:text-black focus:bg-blue-500 rounded-xl"
                                >
                                    Quero ler
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleStatus("lendo")}
                                    className="text-white focus:text-black focus:bg-blue-500 rounded-xl"
                                >
                                    Lendo
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleStatus("lido")}
                                    className="text-white focus:text-black focus:bg-blue-500 rounded-xl"
                                >
                                    Lido
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='mt-6'>
                    <p className=' text-sm text-gray-300 break-all line-clamp-2 overflow-hidden text-ellipsis'>{book.synopsis}</p>
                </div>
                <div className='flex items-center gap-6 mt-4'>
                    <p className='text-[11px] text-gray-300 flex  gap-1'># {book.genre} </p>
                    <p className='text-[11px] text-gray-300 flex  gap-1'><Calendar size={16} /> {book.year} </p>
                </div>
            </div>
        </div >
    )
}