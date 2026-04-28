import { create } from "zustand";
import { storageService } from "../services/storageService";

export const useNoteStore = create((set, get) => ({
  notes: [],
  isLoading: true,

  fetchNotes: async () => {
    const notes = await storageService.loadNotes();
    set({ notes: Array.isArray(notes) ? notes : [], isLoading: false });
  },

  addNote: async (title, content) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: title || "",
      content: content || "",
      updatedAt: new Date().toISOString(),
    };
    const newNotes = [newNote, ...get().notes];
    set({ notes: newNotes });
    await storageService.saveNotes(newNotes);
    return newNote;
  },

  updateNote: async (id, updates) => {
    const newNotes = get().notes.map((note) =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    );
    set({ notes: newNotes });
    await storageService.saveNotes(newNotes);
  },

  deleteNote: async (id) => {
    const newNotes = get().notes.filter((note) => note.id !== id);
    set({ notes: newNotes });
    await storageService.saveNotes(newNotes);
  },
}));
