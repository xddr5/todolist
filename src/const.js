export const Status = {
  BACKLOG: 'backlog',
  INPROGRESS: 'inprogress',
  DONE: 'done',
  TRASHCAN: 'trashcan',
};

export const StatusLabel = {
  [Status.BACKLOG]: 'Бэклог',
  [Status.INPROGRESS]: 'В процессе',
  [Status.DONE]: 'Готово',
  [Status.TRASHCAN]: 'Корзина',
};

export const StatusArray = [
  Status.BACKLOG,
  Status.INPROGRESS,
  Status.DONE,
  Status.TRASHCAN,
];

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  CLEAR_TRASHCAN: 'CLEAR_TRASHCAN',
}

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
}