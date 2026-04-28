import { Trash2 } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all animate-fade-in">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed ? "bg-primary border-primary" : "border-white/10 hover:border-primary/50"
        }`}
      >
        {todo.completed && <div className="w-2 h-2 bg-white rounded-full" />}
      </button>
      
      <span
        className={`flex-1 text-sm font-medium transition-all ${
          todo.completed ? "text-text-muted line-through" : "text-text-main"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
