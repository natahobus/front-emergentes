import { Link, useNavigate } from "react-router-dom";
import { useClienteStore } from "../pages/context/ClienteContext";
import { Dumbbell } from "lucide-react"; // ícone de academia

export default function NavBar() {
  const navigate = useNavigate();
  const { cliente, deslogaCliente } = useClienteStore();

  function logout() {
    try {
      localStorage.removeItem("cliente");
      localStorage.removeItem("token");
    } catch (e) {}
    deslogaCliente();
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xl">
          <Dumbbell className="w-6 h-6" />
          <span>Academia</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {cliente?.id ? (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/treinos"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Meus Treinos
              </Link>
              <button
                onClick={logout}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
