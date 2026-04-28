import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" disabled={!text.trim()}>
        <Plus className="w-5 h-5" />
        <span>Add</span>
      </Button>
    </form>
  );
}
