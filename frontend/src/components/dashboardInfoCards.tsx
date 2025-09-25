import { useDashboard } from "@/context/dashboardContext"
import Image, { StaticImageData } from "next/image"

type Props = {
    color: string
    emoji: string
    name: string
}



export const DashboardInfoCards = ({ color, emoji, name }: Props) => {
    const { data, loading } = useDashboard()
    return (
        <div className={`flex flex-col py-3 px-5 w-56 border-1 rounded-md transition duration-300 ease-in-out hover:-translate-y-1  hover:border-gray-900 hover:shadow-xl/20 
            ${color === 'blue' ? 'border-blue-600/40 bg-linear-to-r/srgb from-sky-500/10 to-sky-300/20' : '' } 
            ${color === 'green' ? 'border-green-600' : ''}
            ${color === 'yellow' ? 'border-yellow-500' : ''}
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
                {data?.totalBooks.count}
            </div>
        </div>
    )
}