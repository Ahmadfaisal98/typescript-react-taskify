import React, { useState, lazy, Suspense } from "react";
import "./App.scss";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const TodoList = lazy(() => import("./components/TodoList"));
const InputField = lazy(() => import("./components/InputField"));

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  const renderLoader = () => <p>Loading</p>;

  return (
    <Suspense fallback={renderLoader()}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Taskify</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>
    </Suspense>
  );
};

export default App;
