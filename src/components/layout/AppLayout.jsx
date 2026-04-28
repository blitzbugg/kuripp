import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex w-full h-screen bg-slate-900 text-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* Custom title bar drag region for macOS/Windows title bars if needed */}
        <div className="absolute top-0 left-0 right-0 h-10 custom-drag-region pointer-events-none" />
        <div className="max-w-4xl mx-auto px-8 pt-16 pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
