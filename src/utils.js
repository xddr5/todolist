export function generateUniqueId(tasks) {
  const ids = tasks.map((task) => task.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
