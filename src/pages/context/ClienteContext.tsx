import { create } from 'zustand'

// Tipagem do cliente
export type ClienteType = {
  id: number;
  nome: string;
  email: string;
}

// Store do cliente
type ClienteStore = {
  cliente: ClienteType | null;
  logaCliente: (clienteLogado: ClienteType) => void;
  deslogaCliente: () => void;
}

// Recupera cliente salvo no localStorage (executa só no browser)
let clienteInicial: ClienteType | null = null;
try {
  const raw = localStorage.getItem('cliente')
  if (raw) clienteInicial = JSON.parse(raw)
} catch (err) {
  clienteInicial = null
}

export const useClienteStore = create<ClienteStore>((set) => ({
  cliente: clienteInicial,
  logaCliente: (clienteLogado) => {
    try {
      localStorage.setItem('cliente', JSON.stringify(clienteLogado))
    } catch (err) {}
    set({ cliente: clienteLogado })
  },
  deslogaCliente: () => {
    try {
      localStorage.removeItem('cliente')
      localStorage.removeItem('token')
    } catch (err) {}
    set({ cliente: null })
  },
}))
