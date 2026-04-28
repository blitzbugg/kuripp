import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore";
import { useSearchStore } from "../store/searchStore";
import AddTodo from "../components/todo/AddTodo";
import TodoList from "../components/todo/TodoList";

export default function TodoPage() {
  const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const { query } = useSearchStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
      <header className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Tasks</h2>
        <p className="text-text-muted">Stay organized and productive.</p>
      </header>

      <div className="space-y-8">
        <AddTodo onAdd={addTodo} />
        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
      </div>
    </div>
  );
}
