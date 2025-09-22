export class Project {
  constructor(title, todos = []) {
    this.title = title;
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }


}