export default class Project {
  constructor(title, todos = []) {
    this.title = title;
    this.todos = todos;
  }

  static createInitialTodos() {
    return this.todos = []
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }
  getTitle() {
    return this.title;
  }
  getTodos() {
    return this.todos;
  }

}