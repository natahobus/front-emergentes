import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    try {
      const resp = await api.post('/login', { email, senha })
      const { token } = resp.data
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err: any) {
      setErro(err?.response?.data?.erro || 'Erro ao fazer login')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {erro && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{erro}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Senha</label>
          <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
      </form>
    </div>
  )
}
