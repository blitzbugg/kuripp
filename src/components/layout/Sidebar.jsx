import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Calendar, 
  PlusCircle, 
  Settings, 
  Info 
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const navItems = [
    { path: "/", name: "Today", icon: LayoutDashboard },
    { path: "/todos", name: "Tasks", icon: CheckSquare },
    { path: "/notes", name: "Notes", icon: FileText },
    { path: "/calendar", name: "Calendar", icon: Calendar },
  ];

  const actionItems = [
    { name: "New Task", icon: PlusCircle, path: "/todos" },
    { name: "New Note", icon: PlusCircle, path: "/notes" },
  ];

  const footerItems = [
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "About Kuripp", icon: Info, path: "/about" },
  ];

  return (
    <aside className="w-[240px] h-screen glass-sidebar border-r border-white/5 flex flex-col py-8">
      <div className="px-8 mb-10">
        <h1 className="text-3xl font-bold tracking-tighter flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xl italic">k</span>
          kuripp
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-8">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-text-muted hover:bg-white/5 hover:text-text-main"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Actions</p>
          {actionItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-text-muted hover:bg-white/5 hover:text-text-main transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-4 space-y-1 mt-auto">
        {footerItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-text-muted hover:bg-white/5 hover:text-text-main"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
