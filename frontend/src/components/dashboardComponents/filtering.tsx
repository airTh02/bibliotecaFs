import { ReactEventHandler, useEffect, useState } from "react";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Search, Funnel, ArrowDownNarrowWide, ArrowUpNarrowWide, Grid3x3, Menu } from 'lucide-react';
import { Filter, OrdenationFilter, ViewModel } from "@/types/books";

type Props = {
    totalLivros: number | null
    totalLidos: number | null
    totalLendo: number | null
    totalQuerLer: number | null
    totalFavoritos: number | null
}

type FilteringProps = {
    onChangeFilter: (filter: Filter) => void
    currentFilter: Filter
    onSearchChange: (value: string) => void
    onOrdenationChange: (filter: OrdenationFilter) => void
    onDownUpChange: (value: boolean) => void
    viewModelCards: (viewmodel: ViewModel) => void
}


export const Filtering = ({ totalLivros, totalLidos, totalLendo, totalQuerLer, totalFavoritos, onChangeFilter, currentFilter, onSearchChange, onOrdenationChange, onDownUpChange, viewModelCards }: Props & FilteringProps) => {

    // TODO: Terminar esses filtros, dar uma otimizada no código 
    // TODO: hover dos ultimos 2 botoes nao tá ficando branco

    const [filtrado, setFiltrado] = useState<boolean>(false)
    const [viewModel, setViewModel] = useState<ViewModel>('grid')
    const [search, setSearch] = useState<string>('')
    const [ordenationFilter, setOrdenationFilter] = useState<string | null>(null)
    const [upOrDownOrdering, setUpOrDownOrdering] = useState<boolean>(false)

    const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        onSearchChange(value)
    }

    const handleActiveFilter = (filter: Filter) => {
        const newFilter = currentFilter === filter ? "todos" : filter
        onChangeFilter(newFilter)
    }

    const handleOrdenationFilter = (filter: OrdenationFilter) => {
        setOrdenationFilter(filter)
        onOrdenationChange(filter)
    }

    const handleFilteringDowntoUp = () => {
        setFiltrado(prev => !prev)
        setUpOrDownOrdering(prev => !prev)
    }

    const handleViewModel = (model: ViewModel) => {
        setViewModel(i => i === model ? null : model)
        viewModelCards(viewModel)
    }

    useEffect(() => {
        onDownUpChange(upOrDownOrdering)
    }, [upOrDownOrdering])

    return (
        <div className=" bg-gray-800 border border-gray-600/18 rounded-md py-4 px-4">
            <div className="flex ">
                <div className="  relative w-[50%] mr-5 ">
                    <Search className=" absolute left-2 top-2 text-gray-500" size={18} />
                    <Input
                        value={search}
                        onChange={handleInputSearch}
                        className="pl-10 border-2 border-transparent  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                        type="text"
                        placeholder="Buscar por título, autor ou gênero..."
                    />
                </div>

                <div className="flex gap-1">
                    <Button onClick={() => handleActiveFilter('todos')} variant={"outline"} className={`rounded-full py-5 px-2 text-[12px] hover:bg-blue-500  hover:text-black  bg-transparent  border-1 border-gray-700 text-white cursor-pointer ${currentFilter === 'todos' ? 'bg-blue-500 text-black border-transparent ' : ''}`}> Todos ({totalLivros})</Button>

                    <Button onClick={() => handleActiveFilter('quer ler')} variant={"outline"} className={`rounded-full py-5 px-2 text-[12px] hover:bg-blue-500 hover:text-black bg-transparentborder-1 border-gray-700 text-white cursor-pointer ${currentFilter === 'quer ler' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Quero ler ({totalQuerLer})</Button>

                    <Button onClick={() => handleActiveFilter('lendo')} variant={"outline"} className={`rounded-full py-5 px-2 text-[12px] hover:bg-blue-500 hover:text-black bg-transparent border-1 border-gray-700 text-white cursor-pointer ${currentFilter === 'lendo' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Lendo ({totalLendo})</Button>

                    <Button onClick={() => handleActiveFilter('lidos')} variant={"outline"} className={`rounded-full py-5 px-2 text-[12px] hover:bg-blue-500 hover:text-black bg-transparent border-1 border-gray-700 text-white cursor-pointer  ${currentFilter === 'lidos' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Lido ({totalLidos})</Button>

                    <Button onClick={() => handleActiveFilter('favoritos')} variant={"outline"} className={`rounded-full py-5 px-2 text-[12px] hover:bg-blue-500 hover:text-black bg-transparent border-1 border-gray-700 text-white cursor-pointer ${currentFilter === 'favoritos' ? 'bg-blue-500 text-black border-transparent  ' : ''}`}>Favoritos ({totalFavoritos})</Button>


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

                        <DropdownMenuContent className="px-1 bg-black border-gray-500 rounded-2xl">
                            <DropdownMenuItem
                                onClick={() => handleOrdenationFilter('ano')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Ano de Publicação
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleOrdenationFilter('titulo')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Título
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleOrdenationFilter('autor')}
                                className=" text-white focus:text-black focus:bg-blue-500 rounded-xl"
                            >
                                Autor
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant={"outline"}
                        className=" group bg-gray-900 hover:bg-blue-500 border-0 cursor-pointer"
                        onClick={handleFilteringDowntoUp}
                    >
                        {filtrado && <ArrowUpNarrowWide className="text-white group-hover:text-white" />}
                        {!filtrado && <ArrowDownNarrowWide className="text-white group-hover:text-white" />}
                    </Button>
                </div>

                <div className="flex ml-3 gap-0">
                    <Button
                        size={"default"}
                        variant={"outline"}
                        onClick={() => handleViewModel('grid')} value={'grid'}
                        className={`group bg-gray-900 hover:bg-blue-500 cursor-pointer rounded-xl  rounded-r-none border-0 ${viewModel === 'grid' ? ' bg-blue-500 border-0 ' : ''} `}
                    >
                        <Grid3x3 className={`${viewModel === 'grid' ? 'text-black' : 'text-white'}`} />
                    </Button>
                    <Button
                        size={"default"}
                        variant={"outline"}
                        onClick={() => handleViewModel('list')} value={'list'}
                        className={`group bg-gray-900 hover:bg-blue-500 cursor-pointer rounded-xl rounded-l-none border-0 ${viewModel === 'list' ? ' bg-blue-500 border-0' : ''} `}
                    >
                        <Menu className={`${viewModel === 'list' ? 'text-black' : 'text-white'}`} />
                    </Button>
                </div>

            </div>

        </div>
    )
}
