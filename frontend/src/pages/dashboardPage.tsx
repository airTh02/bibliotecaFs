import { useDashboard } from "@/context/dashboardContext";
import { useContext } from "react";


export const Dashboard = () => {
  const { data, loading } = useDashboard()

  if (loading) return <p>Carregando...</p>;
  if (!data) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total de livros: {data.totalBooks.count}</p>
      <p>Total lidos: {data.totalLidos}</p>
      <p>Total lendo: {data.totalLendo}</p>
      <p>Total quero ler: {data.totalQuerLer}</p>
      <p>Total favoritos: {data.totalFavoritos}</p>

      <h2>Livros</h2>
      <ul>
        {data.totalBooks.rows.map((book, i) => (
          <li key={i}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};
