import React from "react";
import Todo from "./Todo";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tasks: []
    };
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title">Todo-list</h1>
        <div className="todo-list__stat">
          <h3>Всего: {this.state.tasks.length}</h3>
          <h3>
            Выполнено: {this.state.tasks.filter((todo) => todo.isDone).length}
          </h3>
          <h3>
            Не выполнено:{" "}
            {this.state.tasks.filter((todo) => !todo.isDone).length}
          </h3>
        </div>
        <div className="todo-controls">
          <div className="todo__add">
            <input
              type="text"
              value={this.state.text}
              onChange={(e) => this.setText(e.target.value)}
            />
            <button
              className="add-submit"
              onClick={() =>
                this.addTask({
                  text: this.state.text,
                  isDone: false,
                  id: Date.now().toString(16)
                })
              }
            >
              Create Task
            </button>
          </div>
        </div>
        {!!this.state.tasks.length &&
          this.state.tasks.map((task) => (
            <Todo
              key={task.id}
              task={task}
              onDone={this.setTasks}
              onDelete={this.deleteTask}
            />
          ))}
      </div>
    );
  }

  setTasks = (task) => {
    const currentTask = this.state.tasks.find(
      (currentTask) => currentTask.id === task.id
    );
    let tempTasks = [...this.state.tasks];
    if (currentTask) {
      const index = tempTasks.indexOf(currentTask);
      if (index !== -1) {
        tempTasks = [
          ...tempTasks.slice(0, index),
          task,
          ...tempTasks.slice(index + 1)
        ];
      }
    }
    this.setState({
      tasks: [...tempTasks]
    });
  };

  addTask = (task) => {
    if (!task.text) return;
    this.setState({
      text: "",
      tasks: [...this.state.tasks, task]
    });
  };

  setText = (text) => {
    this.setState({
      text
    });
  };

  deleteTask = (taskId) => {
    const task = this.state.tasks.find((task) => task.id === taskId);
    const index = this.state.tasks.indexOf(task);
    const tempTask = [...this.state.tasks];
    tempTask.splice(index, 1);
    this.setState({
      tasks: tempTask
    });
  };
}
