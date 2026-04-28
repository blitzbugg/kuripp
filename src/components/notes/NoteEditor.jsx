import { useState, useRef } from "react";

export default function NoteEditor({ note, onUpdate }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const autoSaveTimer = useRef(null);

  // Initial state is set via props. Component is remounted via 'key' in parent when note changes.

  const handleUpdate = (updates) => {
    if (updates.title !== undefined) setTitle(updates.title);
    if (updates.content !== undefined) setContent(updates.content);

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      onUpdate(note.id, updates);
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col glass-card rounded-[32px] overflow-hidden border border-white/5 animate-fade-in">
      <input
        type="text"
        value={title}
        onChange={(e) => handleUpdate({ title: e.target.value })}
        placeholder="Note Title"
        className="bg-transparent px-8 py-6 text-2xl font-bold border-b border-white/5 focus:outline-none placeholder:text-text-muted/30"
      />
      <textarea
        value={content}
        onChange={(e) => handleUpdate({ content: e.target.value })}
        placeholder="Start writing your thoughts..."
        className="flex-1 bg-transparent p-8 focus:outline-none resize-none leading-relaxed text-lg"
      />
      <div className="px-8 py-4 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-widest">
        <span>Auto-saved locally</span>
        <span>Last updated {note?.updatedAt ? new Date(note.updatedAt).toLocaleTimeString() : "Just now"}</span>
      </div>
    </div>
  );
}
