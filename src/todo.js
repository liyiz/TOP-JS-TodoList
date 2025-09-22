class Todo {
  /**
   * @param {string} id
   * @param {string} title
   * @param {string} description
   * @param {string} duDate
   * @param {string} priority
   */
  // Consider setting defaults for parameters
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export { Todo };
