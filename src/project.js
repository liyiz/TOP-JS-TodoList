import { Todo } from './todo.js'

class Project {
    /**
     * @param {string} id
     * @param {string} title
     * @param {Array} todos
     */
    constructor(id, title, todos = []) {
        this.id = id;
        this.title = title;
        this.todos = todos;
    }

    getTodos () {
        return this.todos;
    }
}

export {
    Project
};