"use client"

import { ModeToggle } from "@/components/dark-light"
import { Button } from "@/components/ui/button"
import logo from "../../public/assets/logo.png"
import Image from "next/image"
import { useRouter } from "next/navigation"
export const InitialPage = () => {

    const router = useRouter()

    const handleLoginClick = () => {
        router.push('/login')
    }
    const handleSignupClick = () => {
        router.push('/signup')
    }

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="flex items-center justify-center">
                <Image
                    src={logo}
                    alt="logo"
                    className="w-32 h-32 sm:w-40 sm:h-40 md:h-60 md:w-60 object-contain "
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-10 px-6 md:px-10 relative">

                <div className="absolute top-5 right-5 cursor-pointer">
                    <ModeToggle />
                </div>

                <div className="">
                    <div className="text-4xl sm:text-5xl md:text-6xl items-center  md:items-baseline font-bold ">
                        <span>Biblioteca Rezende</span>
                    </div>


                    <div className="flex flex-col text-xl sm:text-2xl gap-4 mt-10 items-center md:items-baseline">
                        <span>Já tem uma conta?</span>
                        <Button onClick={handleLoginClick} size={"lg"} className="cursor-pointer w-52 rounded-lg">Login</Button>
                    </div>

                    <div className="flex items-center max-w-xs gap-2 my-6 ">
                        <hr className="flex-1 w-20 mt-5 md:flex-none"></hr>
                        <span className="mt-5">OU</span>
                        <hr className="flex-1 w-20 mt-5 md:flex-none" ></hr>
                    </div>


                    <div className="flex flex-col text-xl sm:text-2xl gap-4 items-center md:items-baseline">
                        <span>Inscreva-se hoje</span>
                        <Button onClick={handleSignupClick} size={"lg"} className="cursor-pointer w-52 rounded-lg">Cadastrar-se</Button>
                    </div>

                </div>
            </div>
        </div >
    )
}