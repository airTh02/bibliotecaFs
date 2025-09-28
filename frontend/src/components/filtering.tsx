import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, Funnel, ArrowDownNarrowWide, ArrowUpNarrowWide, Grid3x3, Menu } from 'lucide-react';


export const Filtering = () => {

    // TODO: Terminar esses filtros, dar uma otimizada no código 


    const [activeFilter, setActiveFilter] = useState<string | null>(null)
    const [filtrado, setFiltrado] = useState<boolean>(false)


    const handleActiveFilter = (filter: string) => {
       setActiveFilter(prev => prev === filter ? null : filter)
    }


    const handleFilteringByAddData = () => {
        if (!filtrado) {
            setFiltrado(true)
        } else {
            setFiltrado(false)
        }
    }

    return (
        <div className="border border-gray-600/18 rounded-md py-4 px-4">
            <div className="flex">
                <div className="relative w-[50%] mr-5 ">
                    <Search className="absolute left-2 top-2 text-gray-500" size={18} />
                    <Input
                        className="pl-10"
                        type="text"
                        placeholder="Buscar por título, autor ou gênero..."
                    />
                </div>

                <div className="flex gap-1">
                    <Button onClick={() => handleActiveFilter('todos')} variant={"outline"} className={`rounded-full ${activeFilter === 'todos' ? 'bg-gray-900 text-white hover:bg-gray-900' : ''} hover:bg-gray-700 hover:text-white cursor-pointer`}>Todos</Button>
                    <Button onClick={() => handleActiveFilter('queroler')} variant={"outline"} className={`rounded-full ${activeFilter === 'queroler' ? 'bg-gray-900 text-white hover:bg-gray-900' : ''} hover:bg-gray-700 hover:text-white cursor-pointer`}>Quero ler</Button>
                    <Button onClick={() => handleActiveFilter('lendo')} variant={"outline"} className={`rounded-full ${activeFilter === 'lendo' ? 'bg-gray-900 text-white hover:bg-gray-900' : ''} hover:bg-gray-700 hover:text-white cursor-pointer`}>Lendo</Button>
                    <Button onClick={() => handleActiveFilter('lido')} variant={"outline"} className={`rounded-full ${activeFilter === 'lido' ? 'bg-gray-900 text-white hover:bg-gray-900' : ''} hover:bg-gray-700 hover:text-white cursor-pointer`}>Lido</Button>
                    <Button onClick={() => handleActiveFilter('favoritos')} variant={"outline"} className={`rounded-full ${activeFilter === 'favoritos' ? 'bg-gray-900 text-white hover:bg-gray-900' : ''} hover:bg-gray-700 hover:text-white cursor-pointer`}>Favoritos</Button>
                    
                  
                    <Select>
                        <SelectTrigger className=" group flex text-sm items-center gap-2 w-[130px] cursor-pointer data-[placeholder]:text-black data-[placeholder]:font-medium hover:bg-gray-700 hover:data-[placeholder]:text-white">
                            <Funnel className="w-4 h-4 text-black group-hover:text-white" />
                            <SelectValue placeholder="Ordenar" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem className="cursor-pointer" value="addition-data">Data de Adição</SelectItem>
                            <SelectItem className="cursor-pointer" value="title">Título</SelectItem>
                            <SelectItem className="cursor-pointer" value="author">Autor</SelectItem>
                            <SelectItem className="cursor-pointer" value="pages">Páginas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant={"outline"}
                        className=" group hover:bg-gray-700 cursor-pointer"
                        onClick={handleFilteringByAddData}
                    >
                        {filtrado && <ArrowUpNarrowWide className="group-hover:text-white" />}
                        {!filtrado && <ArrowDownNarrowWide className="group-hover:text-white" />}
                    </Button>
                </div>
                <div className="flex ml-3 gap-0">
                    <Button size={"default"} variant={"outline"} className="  bg-gray-900 hover:bg-gray-700 cursor-pointer rounded-r-none border-r-0">
                        <Grid3x3 className="text-white" />
                    </Button>
                    <Button size={"default"} variant={"outline"} className="group  hover:bg-gray-700 cursor-pointer rounded-l-none border-l-0">
                        <Menu className="group-hover:text-white " />
                    </Button>
                </div>

            </div>

        </div>
    )
}
