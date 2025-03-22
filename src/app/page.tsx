"use client";

import { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from '../services/api'
import TodoList from '../components/TodoLists';
import TodoForm from '../components/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState<{ id: string, text: string, completed: boolean }[]>([]);

  const [newTodo, setNewTodo] = useState("");

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

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-600">Todo List</h1>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-2 border rounded-md ${todo.completed ? "bg-blue-200 line-through" : ""}`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className="cursor-pointer flex-1"
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              &#10005;
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}
