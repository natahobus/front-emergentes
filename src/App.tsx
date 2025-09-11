import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Alunos from './pages/Alunos'
import Instrutores from './pages/Instrutores'
import Treinos from './pages/Treinos'
import Exercicios from './pages/Exercicios'

export default function App() {
  const token = localStorage.getItem('token')
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/alunos" element={token ? <Alunos /> : <Navigate to="/login" replace />} />
          <Route path="/instrutores" element={token ? <Instrutores /> : <Navigate to="/login" replace />} />
          <Route path="/treinos" element={token ? <Treinos /> : <Navigate to="/login" replace />} />
          <Route path="/exercicios" element={token ? <Exercicios /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  )
}
  