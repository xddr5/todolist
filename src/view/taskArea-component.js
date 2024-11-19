import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskAreaComponentTemplate() {
  return `<ul class="tasks-area__list list-reset">
          </ul>`;
}

export default class extends AbstractComponent {
  get template() {
    return createTaskAreaComponentTemplate();
  }
}
