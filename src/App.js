import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Todo from "./components/Todo";
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  FETCH_TODOS,
} from "./store/actions/type";
import { connect } from "react-redux";
function App(props) {
  let [text, setText] = useState("");

  //fetch todos from localstorage
  useEffect(() => {
    //https://stackoverflow.com/questions/53243203/react-hook-useeffect-runs-continuously-forever-infinite-loop
    props.fetch();
  }, []);

  //handle text change
  const change = (e) => {
    setText(e.target.value);
  };

  //handle form submit
  const submit = (e) => {
    e.preventDefault();
    if (text.length) {
      props.add(text);
      setText("");
    } else {
      return alert("Blank ToDo, uh-huh ? ");
    }
  };

  return (
    <div className="App">
      <div className="inst">
        <ol>
          <li>Simple ToDo using React & Redux</li>
          <li>Click on text to mark it as complete</li>
          <li>Todos are saved and synced ;)</li>
          <li>
            {" "}
            <a
              href="https://github.com/dalalRohit/react-redux-todo"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
          </li>
        </ol>
      </div>
      <div className="input">
        <form onSubmit={(event) => submit(event)}>
          <TextField
            value={text}
            placeholder="What would you like to complete today?"
            onChange={(event) => change(event)}
            label="Enter ToDo"
            type="text"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => submit(event)}
          >
            Add
          </Button>
        </form>
      </div>

      <div className="todos">
        {props.todos.length ? (
          props.todos.map((todo) => {
            return (
              <Todo
                remove={() => props.remove(todo.id)}
                toggle={() => props.toggle(todo.id)}
                key={todo.id}
                text={todo.text}
                done={todo.done}
                time={todo.created}
              />
            );
          })
        ) : (
          <h1 className="note">Do something today ;)</h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (text) => dispatch({ type: ADD_TODO, val: text }),
    remove: (todoId) => dispatch({ type: REMOVE_TODO, val: todoId }),
    toggle: (todoId) => dispatch({ type: TOGGLE_TODO, val: todoId }),
    fetch: () => dispatch({ type: FETCH_TODOS }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
