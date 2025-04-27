import { Fan, LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {

  const {authUser, logOut} = useAuthStore();

  return (
    <header
    className="border-b border-base-300 fixed w-screen top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
  >
    <div className="mx-auto px-6 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Fan className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Nexa Chat</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={"/settings"}
            className={`
            flex items-center justify-center gap-1 text-primary transition-colors ease-in hover:text-primary/80
            `}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to={"/profile"} className={`flex items-center justify-center gap-1 text-primary transition-colors ease-in hover:text-primary/80`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button className="flex items-center justify-center gap-1 text-primary transition-colors ease-in hover:text-primary/80" onClick={logOut}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>

  );
};

export default Navbar;
