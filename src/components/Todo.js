import React from "react";

export default function Todo(props) {
  const style = {
    textDecoration: props.done ? "line-through" : "none",
    fontStyle: props.done ? "italic" : "normal",
  };
  return (
    <div className="todo">
      <p
        style={style}
        onClick={props.toggle}
        title="Mark this ToDo as completed"
      >
        {props.text}

        <span className="time" >{props.time}</span>
      </p>

      <span className="cross" onClick={props.remove} title="Remove this ToDo">
        &#10006;
      </span>
    </div>
  );
}
