import React, { useEffect, useState } from 'react'
import api from '../services/api'

type Instrutor = { id: number; nome: string; email: string }

export default function Instrutores() {
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  async function load() {
    try {
      const resp = await api.get('/instrutores')
      setInstrutores(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{ load() },[])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    try {
      await api.post('/instrutores', { nome, email, senha })
      setNome(''); setEmail(''); setSenha('')
      load()
    } catch (err: any) {
      setErro(err?.response?.data?.erro || 'Erro')
    }
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Instrutores</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleCreate} className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold">Novo Instrutor</h2>
            {erro && <div className="text-red-600">{String(erro)}</div>}
            <div>
              <label className="text-sm">Nome</label>
              <input value={nome} onChange={e=>setNome(e.target.value)} className="w-full border px-2 py-1 rounded" />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border px-2 py-1 rounded" />
            </div>
            <div>
              <label className="text-sm">Senha</label>
              <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} className="w-full border px-2 py-1 rounded" />
            </div>
            <button className="bg-green-600 text-white px-3 py-1 rounded">Criar</button>
          </form>
        </div>
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Lista</h2>
            <table className="w-full text-left">
              <thead>
                <tr><th className="pb-2">#</th><th className="pb-2">Nome</th><th className="pb-2">Email</th></tr>
              </thead>
              <tbody>
                {instrutores.map(i=>(
                  <tr key={i.id}><td className="py-1">{i.id}</td><td className="py-1">{i.nome}</td><td className="py-1">{i.email}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
