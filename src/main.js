import HeaderComponent from "./view/header-component.js";
import NewTaskComponent from "./view/tasknew-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from "./model/task-model.js";
import { render, RenderPosition } from "./framework/render.js";
import TaskApiService from "./tasks-api-service.js";

const END_POINT = "https://672207b62108960b9cc29760.mockapi.io";
const bodyContainer = document.querySelector(".body-app");
const newTaskContainer = document.querySelector(".new-task");
const taskArea = document.querySelector(".tasks-area");

const tasksModel = new TasksModel({
  tasksApiService: new TaskApiService(END_POINT),
});

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskArea,
  tasksModel,
});

tasksBoardPresenter.init();

function handleNewTaskSubmit(taskTitle) {
  tasksBoardPresenter.addNewTask(taskTitle);
}

const newTaskComponent = new NewTaskComponent(handleNewTaskSubmit);
render(newTaskComponent, newTaskContainer, RenderPosition.AFTERBEGIN);

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
