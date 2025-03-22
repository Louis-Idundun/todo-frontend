import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`flex justify-between p-2 border rounded-md ${todo.completed ? "bg-gray-200 line-through" : ""}`}>
      <span onClick={() => onToggle(todo.id)} className="cursor-pointer flex-1">
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700">
        ✕
      </button>
    </li>
  );
};

export default TodoItem;
