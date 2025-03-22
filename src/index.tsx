import { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from '../src/services/api'
import TodoList from '../src/components/TodoLists';
import TodoForm from '../src/components/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState<{ id: string, text: string, completed: boolean }[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data.map((todo: { _id: string; title: string }) => ({
      id: todo._id,
      text: todo.title,
      completed: false, // Default value for completed
    })));
  };

  const addTodo = async (title: string) => {
    await createTodo({ title });
    fetchTodos();
  };

  const removeTodo = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={removeTodo} onToggle={function (id: string): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  );
}
