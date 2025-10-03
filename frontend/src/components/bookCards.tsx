import { Heart, EllipsisVertical, UserRound, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select"
import { useEffect, useState } from 'react';
import { Book, StatusType } from '@/types/books';
import { putStatus } from '@/api/dashboard';

//TODO: arrumar esse status aqui logica de merda

type Props = {
    book: Book
    onChangeStatus: (bookId: number, newStatus: StatusType) => void
}


export const BookCard = ({ book, onChangeStatus }: Props) => {


    const initialStatus = book.Users?.[0]?.UserBook?.status || 'nenhum';
    const [status, setStatus] = useState<StatusType>(initialStatus)

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

    useEffect(() => {
        const newStatus = book.Users?.[0]?.UserBook?.status || 'nenhum';
        setStatus(newStatus);
    }, [book.Users?.[0]?.UserBook?.status]);

    return (
        <div>
            <div className={`w-full ${book.synopsis.length > 82 ? 'min-h-[220px]' : 'min-h-[200px]'} py-8 px-5 border border-gray-600/10 rounded-md transition duration-500 ease-in-out hover:border-gray-600/20 hover:shadow-xl/10 `}>
                <div className="flex justify-between ">
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-medium text-xl'>{firstLetterUppercase(book.title)}</h1>
                        <p className='text-sm text-gray-400 flex items-center gap-2 '><UserRound size={16} />{book.author}</p>
                    </div>
                    <div className='flex gap-3 '>
                        <Button variant={"outline"} className='cursor-pointer text-gray-400 border-0 hover:text-red-600 hover:bg-gray-900'><Heart size={16} /></Button>
                        <Button variant={"outline"} className='cursor-pointer text-gray-400 border-0 hover:text-white hover:bg-gray-900 '><EllipsisVertical size={16} /></Button>
                    </div>
                </div>
                <div className='flex justify-between mt-2 items-center'>
                    <div className={`flex items-center px-4 py-[2px]  text-[11px] h-fit text-center font-bold rounded-full 
                        ${status === 'quer ler' ? 'bg-sky-400/30 text-sky-950 hover:bg-gray-200' : ''}
                        ${status === 'lendo' ? 'bg-amber-600/30 text-amber-900 hover:bg-gray-200' : ''}
                        ${status === 'lido' ? 'bg-emerald-600/30 text-emerald-950 hover:bg-gray-200' : ''}
                        `}>{status}</div>
                    <div>
                        <Select value={status} onValueChange={(value) => handleStatus(value as StatusType)}>
                            <SelectTrigger className="group flex text-sm w-[125px] cursor-pointer hover:bg-gray-700">
                                <span className="font-medium text-black group-hover:text-white">Alterar Status</span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="quer ler">Quero ler</SelectItem>
                                <SelectItem value="lendo">Lendo</SelectItem>
                                <SelectItem value="lido">Lido</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    <p className='mt-4 text-sm text-gray-400 break-all '>{book.synopsis}</p>
                </div>
                <div className='flex items-center gap-6 '>
                    <p className='mt-4 text-[11px] text-gray-400 flex  gap-1'># {book.genre} </p>
                    <p className='mt-4 text-[11px] text-gray-400 flex  gap-1'><Calendar size={16} /> {book.year} </p>
                </div>
            </div>
        </div>
    )
}