"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Todo = {
  id: number;
  title: string;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get("/api/todos");
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  function Add() {
    return (
      <form
        className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto"
        onSubmit={async (e) => {
          e.preventDefault();

          const title = inputRef.current?.value;

          if (editTodo) {
            await axios.put("/api/todos", {
              id: editTodo.id,
              title,
            });
            setEditTodo(null);
          } else {
            await axios.post("/api/todos", { title });
          }

          // clear + re-fetch
          if (inputRef.current) inputRef.current.value = "";
          const res = await axios.get("/api/todos");
          setTodos(res.data);
        }}
      >
        <input
          ref={inputRef}
          placeholder="Add your todo here"
          className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 text-white"
        />
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-xl text-lg transition"
        >
          {editTodo ? "Update" : "Add"}
        </button>
      </form>
    );
  }

  function handleEdit(todo: Todo) {
    inputRef.current!.value = todo.title;
    setEditTodo(todo);
  }

  async function handleDelete(id: number) {
    await axios.delete("/api/todos", { data: { id } });
    const res = await axios.get("/api/todos");
    setTodos(res.data);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Your <span className="text-rose-500">Tasks</span>
      </h1>

      <Add />

      <ul className="w-full max-w-2xl space-y-4 mb-10 mt-8">
        {todos.map((todo) => (
          <li
            key={todo.title}
            className="flex justify-between items-center bg-zinc-800 px-6 py-4 rounded-xl border border-zinc-700"
          >
            <span className="text-lg">{todo.title}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl text-black transition"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
