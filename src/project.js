export default class Project {
  constructor(title, todos = []) {
    this.title = title;
    this.todos = todos;
  }

  static createInitialTodos() {
    return this.todos = []
  }


  getTodos() {
    return this.todos;
  }


}