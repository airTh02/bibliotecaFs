import { useRouter } from "next/navigation"
import { useState } from "react"
import { Library, BookOpen, Heart, User, LayoutDashboard  } from 'lucide-react';




export const SidebarDashboard = () => {

    const [checked, setChecked] = useState<boolean>(false)
    const route = useRouter()

    return (
        <div className="flex flex-col h-full w-full border-r border-gray-600 pt-5 ">
            <div className="flex items-center gap-2 px-7 mb-5">
                <div className=" flex items-center justify-center w-10 h-10 rounded-full bg-black">
                    <Library className="text-white" size={20} />

                </div>
                <h1 className="text-white font-bold text-2xl">Rezende</h1>
            </div>
            <ul className="flex flex-col gap-3 px-5">
                <li className="cursor-pointer hover:bg-gray-800 text-white rounded-xl  px-4 py-1 flex items-center gap-2"> <LayoutDashboard size={16}/>Dashboard</li>
                <li className="cursor-pointer hover:bg-gray-800 text-white rounded-xl  px-4 py-1 flex items-center gap-2"> <BookOpen size={16} />Meus livros</li>
                <li className="cursor-pointer hover:bg-gray-800 text-white rounded-xl  px-4 py-1 flex items-center gap-2"><Heart size={16} />Favoritos</li>
                <li className="cursor-pointer hover:bg-gray-800 text-white rounded-xl  px-4 py-1 flex items-center gap-2"><User size={16} />Perfil</li>
            </ul>
        </div>
    )
}