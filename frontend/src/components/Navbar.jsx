import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-slate-800">
          Retail Portal
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm ${isActive ? "text-blue-600" : "text-slate-600"}`
            }
          >
            Products
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-blue-600" : "text-slate-600"}`
              }
            >
              My Orders
            </NavLink>
          )}

          {role === "ADMIN" && (
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-blue-600" : "text-slate-600"}`
              }
            >
              Admin
            </NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="text-sm text-slate-600 hover:text-blue-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm text-slate-600 hover:text-blue-600"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}