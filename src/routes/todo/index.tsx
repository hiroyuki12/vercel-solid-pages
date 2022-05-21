import type { Component } from "solid-js";
import TodoList from "../../components/todo/TodoList";
import Input from "../../components/todo/Input";
import { useTodo } from "../../store/todo";

const IndexPage: Component = () => {
  const { state, addTodo, toggleTodo, removeTodo } = useTodo();

  return (
    <main>
      <h1>Todo Page</h1>
      <Input addTodo={addTodo} />
      <TodoList
        todos={state.todos}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </main>
  );
};

export default IndexPage;
