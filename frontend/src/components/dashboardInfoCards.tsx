
import { ReactNode } from "react"

type Props = {
    color: string
    emoji: ReactNode
    name: string
    data: number | null
}



export const DashboardInfoCards = ({ color, emoji, name, data }: Props) => {
    return (
        <div className={`flex flex-col py-5 px-8 w-72 h-40  rounded-2xl transition duration-300 ease-in-out hover:-translate-y-1   
            ${color === 'blue' ? ' bg-gradient-to-br from-blue-600 to-blue-700/5 hover:border-blue-600 hover:shadow-2xl transition-all duration-300' : ''} 
            ${color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-700/5 hover:shadow-2xl transition-all duration-300' : ''}
            ${color === 'orange' ? 'bg-gradient-to-br from-red-500 to-orange-500/5 hover:shadow-2xl transition-all duration-300' : ''}
              ${color === 'bluelight' ? 'bg-gradient-to-br from-blue-500 to-blue-600/5 hover:shadow-2xl transition-all duration-300' : ''}
            `
        }>
            <div className="flex items-center justify-between text-center">
                <div className={`flex items-center justify-center w-10 h-10 bg-white/20 rounded-full`}>
                    {emoji}
                </div>

            </div>
            <div className="flex flex-col text-3xl font-bold mt-6 gap-1.5">
                <p className="text-white">{data}</p>
                <p className="text-white font-normal text-sm ">{name}</p>
            </div>
        </div>
    )
}