import { Trash2, FileText } from "lucide-react";

export default function NoteList({ notes, selectedId, onSelect, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="w-72 flex flex-col items-center justify-center py-10 glass-card rounded-[32px] border-dashed border-white/10 opacity-50">
        <FileText className="w-8 h-8 mb-2" />
        <p className="text-xs">No notes yet</p>
      </div>
    );
  }

  return (
    <div className="w-72 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
      {notes.map((note) => (
        <button
          key={note.id}
          onClick={() => onSelect(note.id)}
          className={`text-left p-5 rounded-2xl border transition-all group relative ${
            selectedId === note.id
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
              : "bg-white/5 border-white/5 text-text-muted hover:border-white/20 hover:text-text-main"
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <h4 className={`font-bold truncate text-sm ${selectedId === note.id ? "text-white" : "text-text-main"}`}>
              {note.title || "Untitled Note"}
            </h4>
            <Trash2
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className={`w-4 h-4 transition-all ${
                selectedId === note.id ? "text-white/60 hover:text-white" : "opacity-0 group-hover:opacity-100 hover:text-red-500"
              }`}
            />
          </div>
          <p className={`text-[11px] mt-2 line-clamp-2 leading-relaxed ${selectedId === note.id ? "text-white/80" : "text-text-muted"}`}>
            {note.content || "No additional text..."}
          </p>
          <div className={`mt-3 text-[9px] font-bold uppercase tracking-widest ${selectedId === note.id ? "text-white/40" : "text-text-muted/40"}`}>
            {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </button>
      ))}
    </div>
  );
}
