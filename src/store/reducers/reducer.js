import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  FETCH_TODOS,
} from "./../actions/type";
import { v4 as uuid } from "uuid";
import moment from "moment";

const initState = {
  todos: [],
};

const setter = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getter = () => {
  return localStorage.getItem("todos");
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodos = state.todos.concat({
        text: action.val,
        id: uuid(),
        done: false,
        created: moment().format("hh:mm"),
      });
      //update localstorage
      setter(newTodos);
      return {
        todos: newTodos,
      };
    case REMOVE_TODO:
      const updatedTodos = state.todos.filter((todo) => todo.id !== action.val);
      //update localstorage

      setter(updatedTodos);
      return {
        todos: updatedTodos,
      };
    case TOGGLE_TODO:
      const x = state.todos.map((todo) => {
        if (todo.id === action.val) {
          todo.done = !todo.done;
          todo.created = moment().format("hh:mm");
          return todo;
        }
        return todo;
      });
      //update localstorage
      setter(x);
      return {
        todos: x,
      };

    case FETCH_TODOS:
      if (getter() !== null) {
        return {
          todos: JSON.parse(getter()),
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
