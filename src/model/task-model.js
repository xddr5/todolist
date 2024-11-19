import { generateUniqueId } from "../utils.js";
import Observable from "../framework/observable.js";
import { UserAction, UpdateType } from "../const.js";
import { Status } from "../const.js";

export default class TasksModel extends Observable {
  #boardtasks = [];
  #tasksApiService = null;

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
      console.error("Ошибка при инициализации задач:", err);
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: Status.BACKLOG,
      id: generateUniqueId(this.tasks),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error("Ошибка при добавлении задачи на сервер:", err);
      throw err;
    }
  }

  async deleteTask(taskId) {
    try {
      await this.#tasksApiService.deleteTask(taskId);
      this.#boardtasks = this.#boardtasks.filter((task) => task.id !== taskId);
      this._notify(UserAction.DELETE_TASK, { id: taskId });
    } catch (err) {
      console.error("Ошибка при удалении задачи с сервера:", err);
      throw err;
    }
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardtasks.filter(
      (task) => task.status === Status.TRASHCAN
    );

    try {
      await Promise.all(
        basketTasks.map((task) => this.#tasksApiService.deleteTask(task.id))
      );

      this.#boardtasks = this.#boardtasks.filter(
        (task) => task.status !== Status.TRASHCAN
      );

      this._notify(UserAction.CLEAR_BASKET);
    } catch (err) {
      console.error("Ошибка при удалении задач из корзины на сервере:", err);
      throw err;
    }
  }

  hasBasketTasks() {
    return this.#boardtasks.some((task) => task.status === Status.TRASHCAN);
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task) {
      const previousStatus = task.status;
      task.status = newStatus;

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error("Ошибка при обновлении статуса задачи на сервере:", err);
        task.status = previousStatus;
        throw err;
      }
    }
  }
}
