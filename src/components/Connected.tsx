import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Connected() {
    const { token, userName, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/eiffage/login");
    };

    return (
        <div className="absolute top-0 right-0 z-[9999] flex items-center gap-2 md:gap-6 bg-gray-800 text-white p-4 rounded-bl-lg text-xs md:text-lg">
            {/* Ton bloc login / connecté */}
            {token ? (
                <div className="flex items-center gap-4">
                    <span>
                        Connecté en tant que <b>{userName}</b>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="btn-disconnect"
                    >
                        Déconnexion
                    </button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link to="/eiffage/login" className="font-bold hover:text-blue-500 transition">
                        SE CONNECTER
                    </Link>
                </div>
            )}
        </div>
    );
}
