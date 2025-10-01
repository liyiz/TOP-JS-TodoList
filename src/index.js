import "./styles.css";
import User from './user.js';
import Todo from "./todo.js";
import Project from "./project.js";

import testData from './example.json' assert {type: 'json'};

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


// DOM elements Global
const modal_addProject = document.getElementById('add-project-dialog');
const modal_editProject = document.getElementById('edit-project-dialog');
const modal_addTodo = document.getElementById('add-task-dialog');
const modal_showTodo = document.getElementById('show-task-dialog');



const init = () => {

    // Check if localStorage has relevant data
    if (localStorage.getItem('userData')) {
        // Get existing data
        const parsedData = JSON.parse(localStorage.getItem('userData'));

        // rehydrate User and Project data - to access class methods after deserialization
        currentUser = new User(parsedData.settings, parsedData.projects);
        const rehydratedProjects = currentUser.projects.map(project => {
            return project = new Project(project.title, project.todos);
        });
        currentUser.projects = rehydratedProjects;
        
        console.log(currentUser);

    } else { // # FIRST TIME RUN CREATE NEW DATA
        // Otherwise run first time set up -> New User class, and a default project with a default todo
        localStorage.setItem('userData', JSON.stringify(testData));
        currentUser = new User(testData.settings, testData.projects);
    }


    // # RENDER RELATED FUNCTIONS
    renderProject(0); // Render first project into project-view
    renderProjectsList();

    // # BUSINESS - ADD PROJECT BUTTON 
    const addProjectBtn = document.getElementById('add-project');
    addProjectBtn.addEventListener('click', () => {
        modal_addProject.showModal();
    });

    // # BUSINESS - ADD TODO/TASK BUTTON
    const addTodoBtn = document.getElementById('add-task');
    addTodoBtn.addEventListener('click', () => {
        modal_addTodo.showModal(); // TODO add modal to template.html
        const currentProjectIndex = document.getElementById('project-view').getAttribute('project-index'); // project-index is set by the <li> that have event listeners set in renderProjectsList()
        // 'Submit' in #add-task-dialog will need to reference currentProjectIndex to get correct project index
    });

    // # BUSINESS - MODAL BUTTONS
    const modals = document.querySelectorAll('dialog');
    const modal_closeBtns = document.querySelectorAll('.modal .modal-corner .close');
    const modal_cancelBtns = document.querySelectorAll('.modal .modal-buttons .cancel');

    modals.forEach( modal => { 
        modal.addEventListener('cancel', (event) => { // handles pressing the esc key when dialog open
            // UX consideration, close button does not reset the form?
            // const form = modal.querySelector('form');
            // form ? form.reset() : undefined; // resets form
        });
    });

    modal_closeBtns.forEach( btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            // button needs to reference its relevant modal
            const modalRelative = event.target.closest('dialog');
            modalRelative.close(); 
            // UX consideration, close button does not reset the form?
            // const form = modalRelative.querySelector('form');
            // form ? form.reset() : undefined; // resets form
        });
    });

    modal_cancelBtns.forEach( btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            // button needs to reference its relevant modal
            const modalRelative = event.target.closest('dialog');
            modalRelative.close(); 
            const form = modalRelative.querySelector('form');
            form ? form.reset() : undefined; // resets form
        });
    });    

    // TODO move this elsewhere
    // # BUSINESS - ADD PROJECT FORM
    const projectAddFormDetails = document.getElementById('add-project-form');
    projectAddFormDetails.addEventListener('submit', (event) => {
        event.preventDefault;

        const titleInput = projectAddFormDetails.querySelector('[name="title"]').value;
        // const descriptionInput = projectAddFormDetails.querySelector('[name="description"]').value; // TODO add description to project data
        const newProject = new Project(titleInput, Project.createInitialTodos());
        // add new project to user data
        currentUser.projects.push(newProject); // TODO move this functionality to User class to call User.addProjecT(newProject)
        console.log(currentUser.projects);

        // close modal
        modal_addProject.close();
        // clear form
        projectAddFormDetails.reset();

        updateLocalStorage();
        renderProjectsList();
    });

    // # BUSINESS - EDIT PROJECT FORM
    const projectEditFormDetails = document.getElementById('edit-project-form');
    projectEditFormDetails.addEventListener('submit', (event) => {
        event.preventDefault;

        const titleInput = projectEditFormDetails.querySelector('[name="title"]').value;
        // const descriptionInput = projectEditFormDetails.querySelector('[name="description"]').value; // TODO add description to project data
       
        // Index is referenced from project-index attribute that is defined in btnEdit's event listener inside renderProjectsList()
        const index = modal_editProject.querySelector('form').getAttribute('project-index');
        currentUser.projects[index].setTitle(titleInput); // TODO - change this to a setter function in User class

        // close modal
        modal_editProject.close();
        // clear form
        projectEditFormDetails.reset();

        updateLocalStorage();
        renderProjectsList();
    });
    
    // # BUSINESS - ADD TODO FORM
    const todoAddFormDetails = document.getElementById('add-task-form');
    todoAddFormDetails.addEventListener('submit', (event) => {
        event.preventDefault;

        const titleInput = todoAddFormDetails.querySelector('[name="title"]').value;
        const descriptionInput = todoAddFormDetails.querySelector('[name="description"]').value;
        const newTodo = new Todo(titleInput, descriptionInput);

        const currentProjectIndex = document.getElementById('project-view').getAttribute('project-index'); // project-index is set by the <li> that have event listeners set in renderProjectsList()
        
        currentUser.projects[currentProjectIndex].todos.push(newTodo);
        console.log(currentUser.projects[currentProjectIndex].todos);

        // close modal
        modal_addProject.close();
        // clear form
        todoAddFormDetails.reset();

        updateLocalStorage();
        renderProject(currentProjectIndex);
    });

};

function updateLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(currentUser));
}

// # RENDER <main id="project-view">
function renderProject(projectIndex) {

    const projectView = document.getElementById('project-view');
    projectView.setAttribute('project-index', projectIndex);

    const title = document.getElementById('project-title');
    title.textContent = currentUser.projects[projectIndex].title;

    const todos = document.getElementById('todos-list');
    todos.innerHTML = '';

    if (currentUser.projects[projectIndex].todos.length <= 0) {
        return console.error('This project has an empty todos array!');
    }

    currentUser.projects[projectIndex].todos.forEach((todo, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.id = ''; // TODO
        checkbox.type = 'checkbox';
        checkbox.name = ''; // TODO
        checkbox.checked = todo.completed; // TODO
        const span = document.createElement('span');
        span.textContent = todo.title;

        li.addEventListener('click', () => { // Using todo array index to target the clicked todo
            console.log("Clicked on todo index:", index)
            // show todo modal/dialog
            modal_showTodo.showModal();
            // populate the modal with relevant data
            renderTodo(projectIndex, index);
        });

        li.append(checkbox, span);

        todos.append(li);
    });
    
};

// # RENDER Todo/Task modal with relevant data

function renderTodo(projectIndex, todoIndex) {
    const title = document.getElementById('task-title');
    const description = document.getElementById('task-description');

    title.textContent = currentUser.projects[projectIndex].todos[todoIndex].title;
    description.textContent = currentUser.projects[projectIndex].todos[todoIndex].description;
}

// # RENDER <nav id="sidebar">
function renderProjectsList() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    currentUser.projects.forEach((project, index) => { // origin of project-index number - a bit precarious because it relies on the array order of User.projects when it goes through serialization and deserialization.
        const li = document.createElement('li');

        li.setAttribute('project-index', index);

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
            const targetProject = currentUser.projects[index].getTodos();

            modal_editProject.showModal();
            // target the title input
            const form = modal_editProject.querySelector('form');
            // populate title input with current project title
            form.querySelector('[name="title"]').value = currentUser.projects[index].getTitle()
            form.setAttribute('project-index', index);
            // TODO Can I pass the index from this scope over to the Save button in the modal?
            console.log(form);
        });
        btnDelete.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log(`Delete project index ${index}`);
            currentUser.deleteProject(index);
            updateLocalStorage();
            renderProjectsList();
        });

        btnEdit.textContent = 'edit';
        btnDelete.textContent = 'delete';
        btnDiv.append(btnEdit, btnDelete);

        li.append(span, btnDiv);

        projectsList.append(li);
    });
}


window.addEventListener("DOMContentLoaded", init);
