import { useAuth } from "@/context/authContext";
import Image from "next/image";
import logo from "../../public/assets/logo.png"
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import {Columns2, Menu} from 'lucide-react'

type Props = {
    handleOpeningSidebar: () => void
}

export const Header = ({handleOpeningSidebar}: Props) => {
    const { user, logout } = useAuth()

    return (

        <div className="flex w-full h-16 items-center justify-between px-4 border-b border-gray-600 bg-gray-900 ">
            <div className="flex items-center justify-start gap-3 ">
                            <Button variant={'outline'} className="bg-gray-900 border-0 hover:bg-blue-800 rounded-full cursor-pointer" size={"sm"} onClick={handleOpeningSidebar}><Columns2 className="text-white " /></Button>
                            <Menu className="text-white" size={16}/>
                            <h1 className="text-[24px] font-bold text-white">Dashboard</h1>
                        </div>
            <div className="flex items-center gap-5 ">
                <span className="text-lg font-normal text-gray-300">{user?.name ? user?.name.charAt(0).toUpperCase() + user?.name.slice(1) : "usuário"}</span>
                <Modal onConfirm={logout}></Modal>
            </div>
        </div>

    );
};
