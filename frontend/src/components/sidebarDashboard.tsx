import { useRouter } from "next/navigation"
import { useState } from "react"




export const SidebarDashboard = () => {

    const [checked, setChecked] = useState<boolean>(false)
    const route = useRouter()

    return (
        <div className="flex flex-col w-54 border-r-2 mt-5">
            <ul className="flex flex-col gap-6 px-5">
                <li className="cursor-pointer bg-gray-900 text-white rounded-md block px-4">Dashboard</li>
                <li className="cursor-pointer hover:bg-gray-800 hover:text-white rounded-md  block px-4">Meus livros</li>
                <li className="cursor-pointer hover:bg-gray-800 hover:text-white rounded-md  block px-4">Favoritos</li>
                <li className="cursor-pointer hover:bg-gray-800 hover:text-white rounded-md  block px-4">Perfil</li>
            </ul>
        </div>
    )
}