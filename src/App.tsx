import React, { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Instrutores from "./pages/Instrutores";
import Treinos from "./pages/Treinos";
import Exercicios from "./pages/Exercicios";

// Componente para proteger rotas privadas
function PrivateRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto p-4">
        <Routes>
          {/* Sempre inicia no login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas privadas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/alunos"
            element={
              <PrivateRoute>
                <Alunos />
              </PrivateRoute>
            }
          />
          <Route
            path="/instrutores"
            element={
              <PrivateRoute>
                <Instrutores />
              </PrivateRoute>
            }
          />
          <Route
            path="/treinos"
            element={
              <PrivateRoute>
                <Treinos />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercicios"
            element={
              <PrivateRoute>
                <Exercicios />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
