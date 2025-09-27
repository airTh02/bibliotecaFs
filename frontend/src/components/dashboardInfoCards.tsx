import { useDashboard } from "@/context/dashboardContext"
import { DashboardData } from "@/types/dashboard"
import Image, { StaticImageData } from "next/image"

type Props = {
    color: string
    emoji: string
    name: string
    data: number | null
}



export const DashboardInfoCards = ({ color, emoji, name, data}: Props) => {
    return (
        <div className={`flex flex-col py-3 px-5 w-56 border-1 rounded-md transition duration-300 ease-in-out hover:-translate-y-1   
            ${color === 'blue' ? 'border-blue-600/18 bg-linear-to-r/srgb from-sky-100/10 to-sky-300/20 hover:border-blue-900/60 hover:shadow-lg/20' : '' } 
            ${color === 'green' ? 'border-emerald-600/18 bg-linear-to-r/srgb from-emerald-400-100/10 to-emerald-300/20 hover:border-emerald-900/60 hover:shadow-lg/20' : ''}
            ${color === 'yellow' ? 'border-amber-600/18 bg-linear-to-r/srgb from-amber-400-100/10 to-amber-300/20 hover:border-amber-900/60 hover:shadow-lg/20' : ''}
            ${color === 'red' ? 'border-red-600/18 bg-linear-to-r/srgb from-red-400-100/10 to-red-400/20 hover:border-red-900/60 hover:shadow-lg/20' : ''}
            `
        }>
            <div className="flex items-center justify-between text-center">
                <p className="text-gray-400 font-bold text-sm">{name}</p>
                <Image
                    src={emoji}
                    alt="emoji"
                    width={30}
                    height={30}
                />
            </div>
            <div className="text-3xl font-bold mt-3">
                {data}
            </div>
        </div>
    )
}