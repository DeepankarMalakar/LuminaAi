import React from "react";
import { Protect, useUser, useClerk } from '@clerk/clerk-react';
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House, color: "#7C3AED" },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen, color: "#3B82F6" },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash, color: "#06B6D4" },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image, color: "#8B5CF6" },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser, color: "#EC4899" },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors, color: "#F59E0B" },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText, color: "#10B981" },
  { to: "/ai/community", label: "Community", Icon: Users, color: "#6366F1" },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-bg-surface border-r border-border flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 z-40 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      {/* User Profile Header */}
      <div className="my-7 w-full px-4">
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mx-auto border-2 border-primary/30"
        />
        <h1 className="mt-3 text-center text-text-primary font-medium">
          {user.fullName}
        </h1>

        {/* Navigation Items */}
        <div className="px-4 mt-6 text-sm font-medium space-y-1">
          {navItems.map(({ to, label, Icon, color }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "gradient-primary text-white"
                    : "text-text-secondary hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="w-4 h-4"
                    style={{ color: isActive ? "#FFFFFF" : color }}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="w-full border-t border-border p-4 px-6 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer hover:opacity-80 transition"
        >
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium text-text-primary">
              {user.fullName}
            </h1>
            <p className="text-xs text-text-secondary">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
              {" "}Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 h-5 text-text-secondary hover:text-primary transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
