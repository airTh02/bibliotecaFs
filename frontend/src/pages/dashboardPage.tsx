import { DashboardInfoCards } from "@/components/dashboardInfoCards";
import { useDashboard } from "@/context/dashboardContext";
import { Filtering } from "@/components/filtering";
import { BookList } from "@/components/bookCardsList";
import { BookOpen, Book, Eye, List, Heart } from 'lucide-react';
import { useState } from "react";
import { Filter } from "@/types/books";

type Filtros = Filter

export const Dashboard = () => {

    const { data } = useDashboard()
    const [filter, setFilter] = useState<Filtros>("todos")
    const [searchResult, setSearchResult] = useState<string>('')

    return (
        <div className="container flex flex-col w-full h-screen max-w-7xl m-auto gap-6">

            <div className="flex  items-center w-full gap-5 mt-2">
                <DashboardInfoCards
                    data={data?.totalBooks.count ?? 0}
                    name={'Total de Livros'}
                    emoji={<Book size={20} className="text-white" />}
                    color={'blue'}
                />
                <DashboardInfoCards
                    data={data?.totalLidos ?? 0}
                    name={'Total lidos'}
                    emoji={<BookOpen size={20} className="text-white" />}
                    color={'blue'}
                />
                <DashboardInfoCards
                    data={data?.totalLendo ?? 0}
                    name={'Total lendo'}
                    emoji={<Eye size={20} className="text-white" />}
                    color={'bluelight'}
                />
                <DashboardInfoCards
                    data={data?.totalQuerLer ?? 0}
                    name={'Total quero ler'}
                    emoji={<List  size={20} className="text-white" />}
                    color={'purple'}
                />
                <DashboardInfoCards
                    data={data?.totalFavoritos ?? 0}
                    name={'Total favoritos'}
                    emoji={<Heart size={20} className="text-white" />}
                    color={'orange'}
                />
            </div>
            <div className="flex items-center justify-start gap-3 mt-10">
                <BookOpen size={25} className="text-blue-500" />

                <div className="flex items-center justify-between w-full">
                    <h1 className="text-[24px] text-white font-bold">Minha Estante</h1>
                </div>
            </div>
            <Filtering  
                totalLivros={data?.totalBooks.count ?? 0}
                totalFavoritos={data?.totalFavoritos ?? 0}
                totalLendo={data?.totalLendo ?? 0}
                totalQuerLer={data?.totalQuerLer ?? 0}
                totalLidos={data?.totalLidos ?? 0}
                onChangeFilter={setFilter} 
                currentFilter={filter}
                onSearchChange={setSearchResult}
            />
            <BookList 
                filter={filter}
                search={searchResult}
            />
        </div>
    );
};
