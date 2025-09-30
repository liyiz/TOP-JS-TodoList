export default class Todo {
  // Consider setting defaults for parameters
  constructor(title, description, dueDate = null, priority = null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  createDefaultTodo() {
    // if insufficient form data is input, fill in the gaps
  }
}