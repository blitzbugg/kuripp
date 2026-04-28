import { useState, useEffect } from "react";
import { useNoteStore } from "../store/noteStore";
import { useSearchStore } from "../store/searchStore";
import NoteList from "../components/notes/NoteList";
import NoteEditor from "../components/notes/NoteEditor";
import Button from "../components/common/Button";
import { Plus, FileText } from "lucide-react";

export default function NotesPage() {
  const { notes, fetchNotes, addNote, updateNote, deleteNote } = useNoteStore();
  const { query } = useSearchStore();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.content.toLowerCase().includes(query.toLowerCase())
  );

  const selectedNote = notes.find((n) => n.id === selectedId);

  const handleAddNote = async () => {
    const newNote = await addNote("Untitled Note", "");
    setSelectedId(newNote.id);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-10 animate-fade-in">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold tracking-tight">Notes</h2>
          <p className="text-text-muted">Capture your ideas and memories.</p>
        </div>
        <Button onClick={handleAddNote} className="rounded-full px-6">
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </Button>
      </header>

      <div className="flex-1 flex gap-10 overflow-hidden">
        <NoteList
          notes={filteredNotes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onDelete={(id) => {
            deleteNote(id);
            if (selectedId === id) setSelectedId(null);
          }}
        />

        <div className="flex-1 flex overflow-hidden">
          {selectedNote ? (
            <NoteEditor 
              key={selectedNote.id} 
              note={selectedNote} 
              onUpdate={updateNote} 
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center glass-card rounded-[32px] border-dashed border-white/10 opacity-30 gap-4">
              <FileText className="w-16 h-16" />
              <p className="text-lg font-medium">Select a note to start writing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
