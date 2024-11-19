import { generateUniqueId } from "../utils.js";
import { Status } from "../const.js";

export default class TaskPresenter {
  #tasksModel = null;

  constructor({ tasksModel }) {
    this.#tasksModel = tasksModel;
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  addNewTask(taskTitle) {
    const newTaskId = generateUniqueId(this.tasks);
    const newTask = {
      id: newTaskId,
      title: taskTitle,
      status: Status.BACKLOG,
    };
    this.#tasksModel.addTask(newTask);
  }

  getTasksByStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }
}