import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Dumbbell, Loader2, AlertCircle, Search } from "lucide-react";

type Exercicio = {
  id: number;
  nome: string;
  series: number;
  repeticoes: number;
};

type Treino = {
  id: number;
  nome: string;
  descricao?: string;
  instrutor?: { nome: string };
  exercicios?: Exercicio[];
};

export default function Treinos() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [filtered, setFiltered] = useState<Treino[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function loadTreinos() {
      try {
        const user = localStorage.getItem("usuario");
        if (!user) {
          setErro("Usuário não autenticado");
          return;
        }

        const aluno = JSON.parse(user);
        const resp = await api.get(`/treinos/${aluno.id}`);
        setTreinos(resp.data);
        setFiltered(resp.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar treinos");
      } finally {
        setLoading(false);
      }
    }

    loadTreinos();
  }, []);

  // Sempre que search mudar, aplica filtro
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(treinos);
    } else {
      const termo = search.toLowerCase();
      setFiltered(
        treinos.filter(
          (t) =>
            t.nome.toLowerCase().includes(termo) ||
            t.descricao?.toLowerCase().includes(termo) ||
            t.instrutor?.nome.toLowerCase().includes(termo)
        )
      );
    }
  }, [search, treinos]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <Loader2 className="animate-spin w-8 h-8" />
        <span className="ml-2">Carregando treinos...</span>
      </div>
    );

  if (erro)
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        {erro}
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Meus Treinos</h1>

      {/* Campo de busca */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Buscar treino por nome, descrição ou instrutor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 pl-10 focus:ring focus:ring-blue-300"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">Nenhum treino encontrado.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-lg p-5 border hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" /> {t.nome}
                </h2>
                <span className="text-sm text-gray-500"></span>
              </div>

              {t.descricao && (
                <p className="text-gray-600 text-sm mb-2">{t.descricao}</p>
              )}

              <p className="text-xs text-gray-500 mb-3">
                Instrutor:{" "}
                <span className="font-medium">
                  {t.instrutor?.nome || "Não atribuído"}
                </span>
              </p>

              <div>
                <p className="font-semibold text-gray-700 mb-1">Exercícios:</p>
                <ul className="space-y-1">
                  {t.exercicios?.map((ex) => (
                    <li
                      key={ex.id}
                      className="flex justify-between bg-gray-50 p-2 rounded-md text-sm"
                    >
                      <span>{ex.nome}</span>
                      <span className="text-gray-600">
                        {ex.series}x{ex.repeticoes}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
