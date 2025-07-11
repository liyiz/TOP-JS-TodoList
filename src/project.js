import { Todo } from './todo.js'


class Project {
    /**
     * @param {string} id
     * @param {string} title
     * @param {Array} todos
     */
    constructor(id, title, todos) {
        this.id = id;
        this.title = title;
        this.todos = todos;
    }

    renderProjectCard() {

        const card = document.createElement('li');
        card.classList.add('project');

        card.setAttribute('data-id', this.id)

        card.addEventListener('click', (e) => {
            // console.log(e.currentTarget.dataset);
            // console.log(e.currentTarget.getAttribute('data-id'));
            // console.log(this);

            // Needs to trigger a function elsewhere that has access to index.js functionality to control what renders on the page...
            this.selectProject();
        });

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

    selectProject() {
        console.log("Project selected, now rendering project page with todos...", this.id);

        // some renderPage() function to render out a page...

        

    }

}

export {
    Project
};