import { create } from "zustand";
import { storageService } from "../services/storageService";

export const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: true,

  fetchTodos: async () => {
    const todos = await storageService.loadTodos();
    set({ todos: Array.isArray(todos) ? todos : [], isLoading: false });
  },

  addTodo: async (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const newTodos = [newTodo, ...get().todos];
    set({ todos: newTodos });
    await storageService.saveTodos(newTodos);
  },

  toggleTodo: async (id) => {
    const newTodos = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: newTodos });
    await storageService.saveTodos(newTodos);
  },

  deleteTodo: async (id) => {
    const newTodos = get().todos.filter((todo) => todo.id !== id);
    set({ todos: newTodos });
    await storageService.saveTodos(newTodos);
  },
}));
