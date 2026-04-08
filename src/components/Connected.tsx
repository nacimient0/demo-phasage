import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserCheck, LogIn, LogOut } from "lucide-react";

export default function Connected() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/eiffage/login");
    };

    return (
        <div className="absolute top-0 right-0 z-[9999] flex items-center bg-white border-l border-b border-black pl-4 pr-1.5 py-1.5 hover:bg-gray-50 transition-colors shadow-sm">
            {token ? (
                <button
                    onClick={handleLogout}
                    className="group flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                    <UserCheck className="text-green-600 w-5 h-5 group-hover:hidden" />
                    <LogOut className="text-red-600 w-5 h-5 hidden group-hover:block" />
                    
                    <span className="w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 text-sm font-bold text-red-600 whitespace-nowrap ml-1">
                        Déconnexion
                    </span>
                </button>
            ) : (
                <Link to="/eiffage/login" className="hover:text-blue-500 transition cursor-pointer flex items-center gap-2" title="Se connecter">
                    <LogIn className="w-5 h-5" />
                    <span className="text-sm font-semibold hidden md:block">Se connecter</span>
                </Link>
            )}
        </div>
    );
}


