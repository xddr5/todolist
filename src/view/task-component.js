import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  return `<li class="tasks__item" id="task-${task.id}">${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute("draggable", true);

    // Событие начала перетаскивания
    this.element.addEventListener("dragstart", (event) => {
      this.element.classList.add("dragging");
      event.dataTransfer.setData("text/plain", this.task.id);
    });

    // Событие окончания перетаскивания
    this.element.addEventListener("dragend", () => {
      this.element.classList.remove("dragging");
    });
  }

  // Метод для вставки задачи в конкретное место
  static insertTask(taskElement, afterElement, container) {
    if (afterElement === null) {
      container.appendChild(taskElement); // Вставляем в конец
    } else {
      container.insertBefore(taskElement, afterElement); // Вставляем перед найденным элементом
    }
  }

  static getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.tasks__item')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2; // Позиция относительно середины элемента
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}
