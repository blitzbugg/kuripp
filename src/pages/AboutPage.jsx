import { Info, Globe, Heart, Code } from "lucide-react";
import Button from "../components/common/Button";

export default function AboutPage() {
  console.log("AboutPage rendering");
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fade-in pb-20">
      <header className="space-y-4 text-center">
        <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center text-white text-5xl italic font-black mx-auto mb-6 shadow-2xl shadow-primary/30">
          k
        </div>
        <div className="space-y-2">
          <h2 className="text-5xl font-black tracking-tighter">Kuripp</h2>
          <p className="text-text-muted font-medium tracking-widest uppercase text-xs">Version 1.0.0 (MVP)</p>
        </div>
      </header>

      <div className="space-y-8">
        <section className="glass-card rounded-[32px] p-10 space-y-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="flex items-center gap-3 text-primary">
            <Info className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-text-main tracking-tight">Your Thoughts, Your Space.</h3>
          </div>
          <p className="text-text-muted leading-relaxed text-lg">
            Kuripp is a minimal, privacy-first desktop application designed for daily productivity. 
            It combines simple task management with structured note-taking, all while keeping your 
            data exactly where it belongs: on your own computer.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-[32px] p-8 space-y-4 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl tracking-tight text-text-main">Offline First</h4>
            <p className="text-sm text-text-muted leading-relaxed">No cloud, no sync, no accounts. Just your thoughts and tasks, available anytime, even without internet.</p>
          </div>
          
          <div className="glass-card rounded-[32px] p-8 space-y-4 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 bg-text-main/5 rounded-2xl flex items-center justify-center text-text-main group-hover:scale-110 transition-transform">
              <Code className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl tracking-tight text-text-main">Local Storage</h4>
            <p className="text-sm text-text-muted leading-relaxed">Everything is stored as simple JSON files on your machine. You have full control over your data.</p>
          </div>
        </section>

        <footer className="text-center space-y-8 pt-12 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-text-muted font-medium italic">
            Made with <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" /> for deep work.
          </div>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100">Changelog</Button>
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100">License</Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
