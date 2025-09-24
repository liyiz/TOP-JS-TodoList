import "./styles.css";
import User from './user.js';
import Todo from "./todo.js";
import Project from "./project.js";

let currentUser = null;

// User journey - holistic reminder //
// 1. User should see a list of projects.
// 2. User should be able to
//      a. Select a project, to view its todos
//      b. Delete a project
//      c. Add a new project
// 3. When a project has been selected, the user should be able to
//      a. View all of its todos
//      b. Add a todo
//      c. Edit a todo
//      d. Delete a todo
//      e. Organise todos order

// module responsibilities //
// index.js -> entry point and conductor
// user.js -> business logic for class responsible for data object that holds projects array
// project.js -> business logic for what is a collection of todos -> title, description
// todo.js -> business logic of todos -> uuid, title, description, due date, completed status, priority

const init = () => {

    // Check for localStorage
    if (localStorage) {
        // Get existing data
        console.log(localStorage);
        const parsedData = JSON.parse(localStorage.getItem('userData'));
        currentUser = new User(parsedData.settings, parsedData.projects);
        
        console.log(currentUser);

    } else {
        // Otherwise run first time set up -> New User class, and a default project with a default todo
    }

    // Render first project into project-view
    renderProject(0);

    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    currentUser.projects.forEach((project, index) => {
        const li = document.createElement('li');
        li.setAttribute('index', index);

        li.addEventListener('click', function () {
            // currentProjectIndex = index;
            // console.log(index);
            // call function that renders project view to show project todos
            renderProject(index);
        });

        const span = document.createElement('span');
        span.textContent = project.title;

        const btnDiv = document.createElement('div');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        // TODO May need to set other button form attributes

        btnEdit.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log(`Edit project index ${index}`);
            // project.edit(index);
        });
        btnDelete.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log(`Delete project index ${index}`);
            // project.delete(index);
        });

        btnEdit.textContent = 'edit';
        btnDelete.textContent = 'delete';
        btnDiv.append(btnEdit, btnDelete);

        li.append(span, btnDiv);

        projectsList.append(li);
    });

};

function renderProject(projectIndex) {

    const main = document.getElementById('project-view');
    const title = document.getElementById('project-title');
    title.textContent = currentUser.projects[projectIndex].title;

    const todos = document.getElementById('todos-list');
    todos.innerHTML = '';

    if (currentUser.projects[projectIndex].todos.length <= 0) {
        return console.error('This project has an empty todos array!');
    }

    currentUser.projects[projectIndex].todos.forEach((todo) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.id = ''; // TODO
        checkbox.type = 'checkbox';
        checkbox.name = ''; // TODO
        checkbox.checked = todo.completed; // TODO
        const span = document.createElement('span');
        span.textContent = todo.title;
    });
    
}

window.addEventListener("DOMContentLoaded", init);
