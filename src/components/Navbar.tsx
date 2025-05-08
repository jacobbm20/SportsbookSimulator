import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Home, BarChart3, User, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-950 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-green-500">BetSim</div>
          <span className="rounded-md bg-gray-800 px-2 py-1 text-xs">
            SIMULATOR
          </span>
        </div>

        {user && (
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${isActive("/") ? "bg-gray-800" : ""}`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>

            <Link to="/odds">
              <Button
                variant={isActive("/odds") ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${isActive("/odds") ? "bg-gray-800" : ""}`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Live Odds</span>
              </Button>
            </Link>

            <Link to="/account">
              <Button
                variant={isActive("/account") ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${isActive("/account") ? "bg-gray-800" : ""}`}
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 border-gray-700"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
