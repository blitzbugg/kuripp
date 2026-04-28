import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Search, Sun, Moon, X } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useSearchStore } from "../../store/searchStore";

export default function Layout() {
  const { settings, updateSettings, fetchSettings } = useUserStore();
  const { query, setQuery, clearSearch } = useSearchStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme || "dark");
  }, [settings.theme]);

  const toggleTheme = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    updateSettings({ theme: newTheme });
  };

  return (
    <div className="flex w-full h-screen bg-background text-text-main overflow-hidden font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-border custom-drag-region">
          <div className="flex-1 max-w-xl no-drag">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes or tasks..."
                className="w-full bg-surface-light border-none rounded-xl py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-text-muted/50"
              />
              {query && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-text-muted hover:text-text-main" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 no-drag">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-surface-light rounded-xl text-text-muted hover:text-text-main transition-all"
              title="Toggle Theme"
            >
              {settings.theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-12 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
