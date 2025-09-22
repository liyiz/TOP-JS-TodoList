export class Project {
  constructor(title, todos = []) {
    this.id = this.createUUID();
    this.title = title;
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }


}