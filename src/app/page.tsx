"use client";

import { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: "1", text: "Learn Next.js", completed: false },
    { id: "2", text: "Build a Todo App", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const addOrUpdateTodo = () => {
    if (!newTodo.trim()) return;
    if (editingId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: newTodo } : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now().toString(), text: newTodo, completed: false },
      ]);
    }
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setEditingId(id);
    setNewTodo(text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fuchsia-50 p-6">
      <div className="w-full max-w-md bg-gray-600 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-green-600">
          Todo List
        </h1>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={addOrUpdateTodo}
            className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 border rounded-md ${
                todo.completed ? "bg-gray-200 line-through" : ""
              }`}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className="cursor-pointer flex-1"
              >
                {todo.text}
              </span>
              <button
                onClick={() => editTodo(todo.id, todo.text)}
                className="text-green-500 hover:text-green-700 mr-2"
              >
                Edit
              </button>
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
};

export default TodoApp;

