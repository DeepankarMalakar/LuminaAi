import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser, SignIn } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen bg-bg-base">
      {/* AppNav */}
      <nav className="w-full px-8 min-h-14 flex items-center justify-between bg-bg-surface border-b border-border">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary group-hover:gradient-text transition-all duration-300">
            LuminaAI
          </span>
        </div>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-text-secondary hover:text-text-primary transition cursor-pointer sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-text-secondary hover:text-text-primary transition cursor-pointer sm:hidden"
          />
        )}
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-bg-base overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-bg-base">
      <SignIn />
    </div>
  );
};

export default Layout;
