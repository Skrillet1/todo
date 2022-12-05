import React from "react";

export default class Todo extends React.Component {
  render() {
    return (
      <div className={`todo ${this.props.task.isDone ? "todo_done" : ""}`}>
        <h2 className="todo__text">{this.props.task.text}</h2>
        <input
          type="checkbox"
          checked={this.props.task.isDone}
          onChange={(e) => {
            this.props.onDone({
              ...this.props.task,
              isDone: e.target.checked
            });
          }}
        />
        <button
          onClick={() => this.props.onDelete(this.props.task.id)}
          className="todo__delete-btn"
        >
          Delete
        </button>
      </div>
    );
  }
}
