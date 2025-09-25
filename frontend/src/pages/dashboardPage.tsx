import { DashboardInfoCards } from "@/components/dashboardInfoCards";
import livros from "../../public/assets/livros.svg"
import { useContext } from "react";


export const Dashboard = () => {
  



  return (
    <div className="flex gap-8">
      <DashboardInfoCards
        name={'Total de Livros'}
        emoji={livros}
        color={'blue'}
      />
      <DashboardInfoCards
        name={'Total de Livros'}
        emoji={livros}
        color={'red'}
      />
      <DashboardInfoCards
        name={'Total de Livros'}
        emoji={livros}
        color={'red'}
      />
      <DashboardInfoCards
        name={'Total de Livros'}
        emoji={livros}
        color={'red'}
      />
      <DashboardInfoCards
        name={'Total de Livros'}
        emoji={livros}
        color={'red'}
      />
    </div>
  );
};
