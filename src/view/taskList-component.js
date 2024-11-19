import { StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";
import TaskComponent from "./task-component.js"; // Предполагается, что TaskComponent уже реализован

function createTaskListComponentTemplate(status) {
  return `<li class="tasks-area__item">
             <h3 class="title tasks-area__title title__${status}" data-status="${status}">${StatusLabel[status]}</h3>
             <ul class="tasks__list tasks__${status} list-reset"></ul>
           </li>`;
}

export default class TaskListComponent extends AbstractComponent {
  constructor({ status, onTaskDrop = null }) {
    super();
    this.status = status;
    this.onTaskDrop = onTaskDrop; // Callback для обработки сброса задачи
    this.#initializeDragAndDrop();
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }

  #initializeDragAndDrop() {
    const taskList = this.element.querySelector(`.tasks__list`);
    const title = this.element.querySelector(`.tasks-area__title`);  // Заголовок для этого статуса
    const placeholder = this.#createPlaceholder();

    // Слушаем события перетаскивания по месту внутри списка
    taskList.addEventListener("dragover", (event) => {
      event.preventDefault();
    
      const afterElement = TaskComponent.getDragAfterElement(taskList, event.clientY);
      // console.log("afterElement in dragover", afterElement);
    
      if (afterElement === null) {
        taskList.appendChild(placeholder);
      } else {
        taskList.insertBefore(placeholder, afterElement);
      }
    });
    
    

    // Слушаем события сброса на место внутри списка задач
    taskList.addEventListener("drop", (event) => {
      event.preventDefault();

      const taskId = event.dataTransfer.getData("text/plain");
      const draggedTask = document.getElementById(`task-${taskId}`);
      const afterElement = TaskComponent.getDragAfterElement(taskList, event.clientY);

      if (placeholder.parentElement) {
        placeholder.parentElement.removeChild(placeholder);
      }

      if (afterElement === null) {
        taskList.appendChild(draggedTask);
      } else {
        taskList.insertBefore(draggedTask, afterElement);
      }

      if (this.onTaskDrop) {
        const newStatus = this.status;
        this.onTaskDrop(taskId, newStatus);
      }
    });

    // Обработчик для перетаскивания на заголовок
    title.addEventListener("dragover", (event) => {
      event.preventDefault();
      // Можно добавить выделение заголовка или индикацию, что сюда можно сбросить задачу
      title.style.border = "2px dashed #00f"; // Для визуальной подсказки
    });

    // Обработчик для сброса на заголовок
    title.addEventListener("drop", (event) => {
      event.preventDefault();

      const taskId = event.dataTransfer.getData("text/plain");
      const draggedTask = document.getElementById(`task-${taskId}`);

      // Убираем placeholder
      if (placeholder.parentElement) {
        placeholder.parentElement.removeChild(placeholder);
      }

      // Перемещаем задачу в конец списка
      taskList.appendChild(draggedTask);

      // Если есть callback, вызываем его
      if (this.onTaskDrop) {
        const newStatus = this.status;
        this.onTaskDrop(taskId, newStatus);
      }

      title.style.border = ""; // Снимаем визуальную подсказку
    });

    // Убираем подсветку, если перетаскивание выходит за пределы заголовка
    title.addEventListener("dragleave", () => {
      title.style.border = "";
    });

    // Убираем подсветку, если перетаскивание уходит с списка
    taskList.addEventListener("dragleave", () => {
      if (placeholder.parentElement) {
        placeholder.parentElement.removeChild(placeholder);
      }
    });
  }

  #createPlaceholder() {
    const placeholder = document.createElement("li");
    placeholder.className = "placeholder";
    placeholder.style.height = "40px";
    placeholder.style.backgroundColor = "#f0f0f0";
    placeholder.style.border = "2px dashed #ccc";
    placeholder.style.margin = "5px 0";
    return placeholder;
  }
}
