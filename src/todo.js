class Todo {
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} description
     * @param {string} duDate
     * @param {string} priority
     */
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    renderTodo () {
        const todoBody = document.createElement('div');
        todoBody.classList.add('todo');

        const title = this.renderTitle(this.title);
        const description = this.renderDescription(this.description);
        const dueDate = this.renderDueDate(this.dueDate);
        const priority = this.renderPriority(this.priority);

        todoBody.append(title, description, dueDate, priority);
        return todoBody
    }

    renderTitle (text) {
        const title = document.createElement('h1');
        title.classList.add('todo-title');
        title.textContent = text;
        // add any styling or eventlistener related stuff here?
        return title;
    }

    renderDescription (text) {
        const description = document.createElement('p');
        description.classList.add('todo-descr');
        description.textContent = text;
        // add any styling or eventlistener related stuff here?
        return description;
    }

    renderDueDate (date) {
        const dueDate = document.createElement('p');
        dueDate.classList.add('todo-ddate');
        dueDate.textContent = date; // This will need to be replaced with date data type
        return dueDate;
    }

    renderPriority (value) {
        const priority = document.createElement('div');
        priority.classList.add('todo-priority');
        // Use some kind of image for the priority?
        priority.textContent = value;
        return priority;
    }
}

export {
    Todo
}