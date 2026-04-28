import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-[32px] border-dashed border-white/10">
        <p className="text-text-muted">All clear! No tasks for now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
