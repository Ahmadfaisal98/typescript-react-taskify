import React, { lazy, Suspense } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";

const SingleTodo = lazy(() => import("./SingleTodo"));

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <Suspense fallback={<div />}>
                <SingleTodo
                  todos={todos}
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              </Suspense>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosComplete">
        {(provided, snapshot) => (
          <div
            className={`todos complete ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <Suspense fallback={<div />}>
                <SingleTodo
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              </Suspense>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
