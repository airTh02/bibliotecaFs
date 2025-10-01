import { useAuth } from "@/context/authContext";
import Image from "next/image";
import logo from "../../public/assets/logo.png"
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

export const Header = () => {
    const { user, logout } = useAuth()

    return (

        <div className="flex w-full h-2 items-center justify-between px-10 mt-10">
            <Image alt="logo" src={logo} className="w-10 h-10 " />
            <div className="flex flex-1 justify-end items-center ">
                <span className="text-2xl mr-5">{user?.name ? user?.name.charAt(0).toUpperCase() + user?.name.slice(1) : "usuário"}</span>
                <Modal onConfirm={logout}></Modal>
            </div>
        </div>

    );
};
