import { Todo } from './todo.js'
import { uuidv4 } from './utilities.js';

class Project {
    /**
     * @param {string} title
     * @param {Array} todos
     */
    constructor(title, todos = []) {
        this.id = this.createUUID();
        this.title = title;
        this.todos = todos;
    }

    getTodos () {
        return this.todos;
    }

    createUUID () {
        return uuidv4("project");
    }

}

export {
    Project
};