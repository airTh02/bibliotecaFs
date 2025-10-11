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
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Search, Funnel, ArrowDownNarrowWide, ArrowUpNarrowWide, Grid3x3, Menu } from 'lucide-react';



export const Filtering = () => {

    // TODO: Terminar esses filtros, dar uma otimizada no código 
    // TODO: hover dos ultimos 2 botoes nao tá ficando branco


    const [activeFilter, setActiveFilter] = useState<string | null>('todos')
    const [filtrado, setFiltrado] = useState<boolean>(false)
    const [viewModel, setViewModel] = useState<string | null>('grid')


    const handleActiveFilter = (filter: string) => {
        setActiveFilter(i => i === filter ? null : filter)

    }


    const handleFilteringByAddData = () => {
        if (!filtrado) {
            setFiltrado(true)
        } else {
            setFiltrado(false)
        }
    }

    const handleViewModel = (model: string) => {
        setViewModel(i => i === model ? null : model)

    }

    return (
        <div className=" bg-gray-800 border border-gray-600/18 rounded-md py-4 px-4">
            <div className="flex ">
                <div className="  relative w-[50%] mr-5 ">
                    <Search className=" absolute left-2 top-2 text-gray-500" size={18} />
                    <Input

                        className="pl-10 border-2 border-transparent  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                        type="text"
                        placeholder="Buscar por título, autor ou gênero..."
                    />
                </div>

                <div className="flex gap-1">
                    <Button onClick={() => handleActiveFilter('todos')} variant={"outline"} className={`rounded-full  hover:bg-blue-500 hover:text-black  bg-transparent  border-1 border-gray-500 text-white cursor-pointer ${activeFilter === 'todos' ? 'bg-blue-500 text-black border-transparent ' : ''}`}>Todos</Button>

                    <Button onClick={() => handleActiveFilter('queroler')} variant={"outline"} className={`rounded-full  hover:bg-blue-500 hover:text-black bg-transparentborder-1 border-gray-500 text-white cursor-pointer ${activeFilter === 'queroler' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Quero ler</Button>

                    <Button onClick={() => handleActiveFilter('lendo')} variant={"outline"} className={`rounded-full  hover:bg-blue-500 hover:text-black bg-transparent border-1 border-gray-500 text-white cursor-pointer ${activeFilter === 'lendo' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Lendo</Button>

                    <Button onClick={() => handleActiveFilter('lido')} variant={"outline"} className={`rounded-full  hover:bg-blue-500 hover:text-black bg-transparent border-1 border-gray-500 text-white cursor-pointer  ${activeFilter === 'lido' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Lido</Button>

                    <Button onClick={() => handleActiveFilter('favoritos')} variant={"outline"} className={`rounded-full  hover:bg-blue-500 hover:text-black bg-transparent border-1 border-gray-500 text-white cursor-pointer ${activeFilter === 'favoritos' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Favoritos</Button>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="bg-gray-900 cursor-pointer ml-2  text-gray-300 border-0 hover:text-white hover:bg-blue-500"
                            >
                                <Funnel className="w-4 h-4 text-white group-hover:text-white" />
                                <span className="font-medium group-hover:text-white">Ordenar</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="px-1 bg-black border-gray-500">
                            <DropdownMenuItem
                                onClick={() => alert('aa')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Data de Adição
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => alert('aa')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Título
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => alert('aa')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Autor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => alert('aa')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Páginas
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant={"outline"}
                        className=" group bg-gray-900 hover:bg-blue-500 border-0 cursor-pointer"
                        onClick={handleFilteringByAddData}
                    >
                        {filtrado && <ArrowUpNarrowWide className="text-white group-hover:text-white" />}
                        {!filtrado && <ArrowDownNarrowWide className="text-white group-hover:text-white" />}
                    </Button>
                </div>

                <div className="flex ml-3 gap-0">
                    <Button
                        size={"default"}
                        variant={"outline"}
                        onClick={() => handleViewModel('grid')} value={'grid'} className={`group hover:bg-gray-700 cursor-pointer rounded-r-none border-r-0 ${viewModel === 'grid' ? ' bg-gray-900 ' : ''} `}
                    >
                        <Grid3x3 className={`${viewModel === 'grid' ? 'text-white' : 'text-black'}`} />
                    </Button>
                    <Button
                        size={"default"}
                        variant={"outline"}
                        onClick={() => handleViewModel('list')} value={'list'} className={`group  hover:bg-gray-700 cursor-pointer rounded-l-none border-l-0 ${viewModel === 'list' ? ' bg-gray-900 ' : ''} `}
                    >
                        <Menu className={`${viewModel === 'list' ? 'text-white' : 'text-black'}`} />
                    </Button>
                </div>

            </div>

        </div>
    )
}
