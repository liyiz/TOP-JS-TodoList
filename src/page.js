class Page {
    /**
     * @param {HTMLElement} container
     */
    constructor(container) {
        this.container = container;
    }

    clearPage() {
        this.container.innerHTML = '';
    }

    // renderPage would require what?
    // it would need to know what page it is rendering: Projects, or Todos
    renderPage(pageFunction) {
        this.clearPage();
        pageFunction();
    }

    renderMainPage() {
        // Render the main menu that lists all the project cards
        console.log("Hey you ran the render function");
    }

    renderProjectPage() {
        // DOM elements to render the project page
    }

    renderProjectCard() {

            const card = document.createElement('li');
            card.classList.add('project');

            card.setAttribute('data-id', this.id)

            const cardTitle = document.createElement('h1');
            cardTitle.textContent = this.title;
            cardTitle.classList.add('project-title');


            // Remove later, this is to show data is working
            const exampleTodo = new Todo(this.todos[0].title, this.todos[0].description, this.todos[0].dueDate, this.todos[0].priority).renderTodo();

            card.append(cardTitle);

            // Remove later, this is to show data is working
            card.append(exampleTodo);

            return card;
            
        }

    renderTodoList() {
            const todoList = document.createElement('ul');
            // loop through entire todos array

            this.todos.forEach((todo) => {
                const item = new Todo(todo.title, todo.description, todo.dueDate, todo.priority).renderTodo();
                todoList.append(item);
            });

            return todoList
        }

    renderTodo() {
        const todoBody = document.createElement('li');
        todoBody.classList.add('todo');

        const title = this.renderTitle(this.title);
        const description = this.renderDescription(this.description);
        const dueDate = this.renderDueDate(this.dueDate);
        const priority = this.renderPriority(this.priority);

        todoBody.append(title, description, dueDate, priority);
        return todoBody
    }

    renderTitle(text) {
        const title = document.createElement('h1');
        title.classList.add('todo-title');
        title.textContent = text;
        // add any styling or eventlistener related stuff here?
        return title;
    }

    renderDescription(text) {
        const description = document.createElement('p');
        description.classList.add('todo-descr');
        description.textContent = text;
        // add any styling or eventlistener related stuff here?
        return description;
    }

    renderDueDate(date) {
        const dueDate = document.createElement('p');
        dueDate.classList.add('todo-ddate');
        dueDate.textContent = date; // This will need to be replaced with date data type
        return dueDate;
    }

    renderPriority(value) {
        const priority = document.createElement('div');
        priority.classList.add('todo-priority');
        // Use some kind of image for the priority?
        priority.textContent = value;
        return priority;
    }


}

export { Page }