import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";

let sessionData; // holds app data
let user; // holds user data
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
        user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
    } else {
        // Otherwise run first time set up -> New User class, and a default project with a default todo
    }

    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    user.projects.forEach((project) => {
        const newItem = document.createElement('li');

        const itemSpan = document.createElement('span');
        itemSpan.textContent = project.title;
        // maybe consider adding data attributes at this point?

        const btnDiv = document.createElement('div');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        btnEdit.textContent = 'edit';
        btnDelete.textContent = 'delete';
        btnDiv.append(btnEdit, btnDelete);

        newItem.append(itemSpan, btnDiv);

        projectsList.append(newItem);
    });

};

window.addEventListener("DOMContentLoaded", init);
