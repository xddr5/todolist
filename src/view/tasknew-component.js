import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNewTaskComponentTemplate() {
  return `<div>
    <h2 class="title new-task__title">Новая задача</h2>
    <form action="#" class="new-task__form">
      <input
        class="new-task__input"
        type="text"
        placeholder="Название задачи"
        required
      />
      <button type="submit" class="new-task__button btn-reset">Добавить</button>
    </form>
  </div>`;
}

export default class NewTaskComponent extends AbstractComponent {
  #handleFormSubmit = null;

  constructor(handleFormSubmit) {
    super();
    this.#handleFormSubmit = handleFormSubmit;
    this._setInnerHandlers();
  }

  get template() {
    return createNewTaskComponentTemplate();
  }

  _setInnerHandlers() {
    this.element
      .querySelector(".new-task__form")
      .addEventListener("submit", this.#formSubmitHandler.bind(this));
  }

  #formSubmitHandler(evt) {
    evt.preventDefault();
    const inputElement = this.element.querySelector(".new-task__input");
    const taskTitle = inputElement.value.trim();
    if (taskTitle) {
      this.#handleFormSubmit(taskTitle);
      inputElement.value = "";
    }
  }
}
