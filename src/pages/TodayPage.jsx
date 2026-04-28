import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore";
import { useNoteStore } from "../store/noteStore";
import { useUserStore } from "../store/userStore";
import { useSearchStore } from "../store/searchStore";
import { FileText, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function TodayPage() {
  const { todos, fetchTodos, toggleTodo } = useTodoStore();
  const { notes, fetchNotes } = useNoteStore();
  const { settings, fetchSettings } = useUserStore();
  const { query } = useSearchStore();

  useEffect(() => {
    fetchTodos();
    fetchNotes();
    fetchSettings();
  }, [fetchTodos, fetchNotes, fetchSettings]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const filteredTodos = todos.filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));
  const filteredNotes = notes.filter((n) => 
    n.title.toLowerCase().includes(query.toLowerCase()) || 
    n.content.toLowerCase().includes(query.toLowerCase())
  );

  const todayTasks = filteredTodos.slice(0, 4);
  const latestNote = filteredNotes[0];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-48 rounded-[32px] overflow-hidden group">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="absolute bottom-8 left-10">
          <h2 className="text-4xl font-bold tracking-tight text-white">{greeting}, {settings.name}</h2>
          <p className="text-text-muted mt-2 italic">"Small steps every day."</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks Card */}
        <section className="glass-card rounded-[32px] p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Today's Tasks</h3>
            <Link to="/todos">
              <Button variant="primary" className="py-1.5 px-4 text-xs rounded-full">
                <Plus className="w-3.5 h-3.5" />
                Add Task
              </Button>
            </Link>
          </div>

          <div className="space-y-1">
            {todayTasks.length === 0 ? (
              <p className="text-text-muted text-sm py-4">No tasks for today.</p>
            ) : (
              todayTasks.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        todo.completed ? "bg-primary border-primary" : "border-white/10 hover:border-primary/50"
                      )}
                    >
                      {todo.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                    </button>
                    <span className={cn("text-sm font-medium transition-all", todo.completed && "text-text-muted line-through")}>
                      {todo.text}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Today</span>
                </div>
              ))
            )}
          </div>

          <Link to="/todos" className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all pt-2">
            View all tasks <ChevronRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Daily Note Card */}
        <section className="glass-card rounded-[32px] p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Daily Note</h3>
            <Link to="/notes">
              <Button variant="secondary" className="py-1.5 px-4 text-xs rounded-full">New Note</Button>
            </Link>
          </div>

          {latestNote ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{latestNote.title || "May 24, 2025"}</h4>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Today</p>
                </div>
              </div>
              <p className="text-sm text-text-muted line-clamp-4 leading-relaxed">
                {latestNote.content || "A calm day with focused work. Grateful for the progress. Tomorrow is another opportunity."}
              </p>
            </div>
          ) : (
            <div className="py-10 text-center space-y-2">
              <FileText className="w-8 h-8 text-white/5 mx-auto" />
              <p className="text-text-muted text-sm">No notes recorded today.</p>
            </div>
          )}

          <Link to="/notes" className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all pt-2">
            Open Note <ChevronRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
