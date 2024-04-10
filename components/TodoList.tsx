"use client";
import React, { useEffect } from "react";
import { addTodo, fetchTodos } from "../lib/actions/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TodoList = () => {
  const { data: todo, isLoading } = useQuery({
    queryFn: () => {
      return fetchTodos();
    },
    queryKey: ["todos"],
  });

  const [text, setText] = React.useState("");
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation({
    mutationFn: (todo: string) => addTodo(todo),
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["todos"],
    //   });
    // },
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {todo?.map((todo) => (
        <div
          className="
        border
        border-gray-200
        bg-white
        dark:bg-gray-800
        dark:border-neutral-700
        p-4
        rounded-lg
        shadow-sm
        "
          key={todo.id}
        >
          <input
            title="todo"
            className="
                form-checkbox
                rounded
                text-blue-500
                "
            type="checkbox"
            checked={todo.completed}
            name={todo.title}
          ></input>
          <label
            htmlFor={todo.title}
            className="
            block
            text-lg
            font-semibold
            "
          >
            {todo.title}
          </label>
        </div>
      ))}
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
          border
          border-gray-200
          bg-white
          dark:bg-gray-800
          dark:border-neutral-700
          p-4
          rounded-lg
          shadow-sm
          mt-4
          "
          type="text"
          placeholder="Add a new todo"
        />
        <button
          className="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          ml-4
          "
          type="button"
          onClick={async () => {
            try {
              await addTodoMutation.mutateAsync(text);
              setText("");
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;
