import { DashboardInfoCards } from "@/components/dashboardInfoCards";
import livros from "../../public/assets/livros.svg"
import lendo from "../../public/assets/lendo.svg"
import lidos from "../../public/assets/lidos.svg"
import favorito from "../../public/assets/favorite.svg"
import { useDashboard } from "@/context/dashboardContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Filtering } from "@/components/filtering";
import { BookList } from "@/components/bookCardsList";




export const Dashboard = () => {

    const { data, loading } = useDashboard()


    return (
        <div className="container flex flex-col w-full h-screen max-w-6xl m-auto gap-6">
            <div className="flex items-center justify-start gap-3 ">
                <Image src={lidos} alt="lidos" width={32} height={32} />
                <h1 className="text-[24px] font-bold">Dashboard</h1>
            </div>
            <div className="flex  items-center w-full gap-8 ">
                <DashboardInfoCards
                    data={data?.totalBooks.count ?? 0}
                    name={'Total de Livros'}
                    emoji={livros}
                    color={'yellow'}
                />
                <DashboardInfoCards
                    data={data?.totalLidos ?? 0}
                    name={'Total lidos'}
                    emoji={lidos}
                    color={'yellow'}
                />
                <DashboardInfoCards
                    data={data?.totalLendo ?? 0}
                    name={'Total lendo'}
                    emoji={lendo}
                    color={'blue'}
                />
                <DashboardInfoCards
                    data={data?.totalQuerLer ?? 0}
                    name={'Total quero ler'}
                    emoji={livros}
                    color={'green'}
                />
                <DashboardInfoCards
                    data={data?.totalFavoritos ?? 0}
                    name={'Total favoritos'}
                    emoji={favorito}
                    color={'red'}
                />
            </div>
            <div className="flex items-center justify-start gap-3 mt-10">
                <Image src={lidos} alt="lidos" width={32} height={32} />

                <div className="flex items-center justify-between w-full">
                    <h1 className="text-[24px] font-bold">Minha estante</h1>
                </div>
            </div>
            <Filtering/>
            <BookList />
        </div>
    );
};
