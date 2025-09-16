import './styles.css';
import * as utilities from './utilities.js';
import { Todo } from './todo.js';
import { Project } from './project.js';
import testjson from './example.json' assert {type: 'json'}
import { Page } from './page.js';
import { createForm, bindHandler } from './projectForm.js';

let storage; // holds data from localStorage api
let sessionData; // holds app data

const mainContainer = document.querySelector('main.container');
const projectsListElID = 'projects-list';

let pageRender = null; // will initialise Page class instance ## disabled for TESTING


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
// todo.js -> business logic of todos -> uuid, title, description, due date, completed status, priority
// project.js -> business logic for what is a collection of todos -> uuid, title, description, completed status
// dom.js -> render logic, hosts all functions and visual components of how a page should be rendered


const init = () => {

    if (isStorageAvailable()) {
        // Parse the localStorage data and set in the current session sessionData
        const result = JSON.parse(window['localStorage'].getItem('userData'));
        sessionData = result;

    } else {
        // if there is no data in local storage (first time running app), then we initialise sessionData as fresh
        sessionData = {
            "settings" : {
                "last open project": 0
            },
            "projects": []
        };
    }

    // createTestInterface(); // for debug purposes - ⚠ functions are a mix of those here in index.js and other modules

    pageRender = new Page(mainContainer);
    pageRender.renderPage(pageRender.renderMainPage, sessionData); // look in page.js

}


const createTestInterface = () => {

    const testbtn = createDebugButton('show data', displayData);
    mainContainer.append(testbtn);

    // separate testing buttons
    const addNewProjectBtn = createDebugButton('Add New Project', () => {
        // TODO generate id
        const newProject = Project.createNewProject('Generated New Project');
        
        addNewProject(newProject);
    }); // TODO add function that adds new project

    const addNewLocalStorageTestData = createDebugButton('Add new local storage test data', () => {
        // Creates dummy sessionData and saves to local storage under "userData"
        // need to store `window['localStorage']` to a global to access in this code.
        window['localStorage'].setItem('userData', JSON.stringify(createTestsessionData()));
    });

    mainContainer.append(addNewProjectBtn, addNewLocalStorageTestData);

    const { form, input } = createForm();
    bindHandler(form, "submit", input, (event) => {
        const newProject = Project.createNewProject(input.value);
        addNewProject(newProject);
    })

    mainContainer.append(form);

    const projectsListContainer = document.createElement('div');
    projectsListContainer.id = projectsListElID;
    mainContainer.append(projectsListContainer);

    renderProjectList(`#${projectsListElID}`); // this is just here for testing
}


const createTestsessionData = () => {
    return {
        "settings" : {
            "last open project": 0
        },
        "projects": [
            { "id": "project-001", "title": "My First Project", 
                "todos": [
                    { "title": "My Task 1", "description": "Lorem upsum dolor sit met", "dueDate": "Monday", "priority": "Medium" },
                    { "title": "My Task 2", "description": "Lorem upsum dolor sit met", "dueDate": "Tuesday", "priority": "Low" },
                    { "title": "My Task 3", "description": "Lorem upsum dolor sit met", "dueDate": "Wednesday", "priority": "High" }
                ]
            },
            { "id": "project-002", "title": "My Second Project", 
                "todos": [
                    { "title": "My Task 4", "description": "Lorem upsum dolor sit met", "dueDate": "Thursday", "priority": "Low" }
                ]
            },
            { "id": "project-003", "title": "My Third Project", 
                "todos": [
                    { "title": "My Task 5", "description": "Lorem upsum dolor sit met", "dueDate": "Friday", "priority": "High" }
                ]
            }
        ]
    };
}


const addNewProject = (project) => {
    sessionData["projects"].push(project);
    console.log(project, 'added to sessionData and localStorage.'); // for debug purposes
    
    updateLocalStorage();

    clearDOM(`#${projectsListElID}`);

    // Clear the container
    // then I need to have a reference to the container anyway to populate with new content...
    // re-render the contents again from the updated sessionData
    const newContent = renderProjectList(`#${projectsListElID}`);
    mainContainer.append(newContent);
}


const displayData = () => {
    console.dir(sessionData);
}

const getsessionData = () => {
    return sessionData['projects'][0]['title'];
}

// // function that adds a project data object to the overall data
// const createNewProject = (title) => {
//     // New project assumes an empty todos array first
//     const project = new Project(title);

//     return project;
// }

const deleteProject = (projectID) => {
    // Ideally we identify the project to delete with project ID - but that is a TODO
    const targetIndex = sessionData['projects'].findIndex(obj => obj.id === projectID);
    sessionData['projects'].splice(targetIndex, 1);
    displayData();

    updateLocalStorage();

    clearDOM(`#${projectsListElID}`);
    // re-render the contents again from the updated sessionData
    const newContent = renderProjectList(`#${projectsListElID}`);
    mainContainer.append(newContent);
}

const updateLocalStorage = () => {
    window['localStorage'].setItem('userData', JSON.stringify(sessionData));
}

const createNewTodo = (title, description, dueDate, priority) => {
    // New todo
    const todo = new Todo(title, description, dueDate, priority)

    return todo;
}









const isStorageAvailable = () => {
    if (utilities.storageAvailable('localStorage')) {
        // storage = window['localStorage'];
        console.log('Local Storage is available.');
        return true;
    } else {
        console.error('Local Storage is not available.');
        return false;
    }
}


// Test functions - like make debug buttons

const createDebugButton = (btnLabel, btnFunc) => {
    const button = document.createElement('button');
    button.textContent = btnLabel;
    button.onclick = btnFunc;

    return button;
}


// Project render functions

const renderProjectList = (selector) => {
    // Create project list child elements
    const container = document.querySelector(selector);
    const projectH1 = document.createElement('h1');
    projectH1.textContent = 'Projects';
    container.append(projectH1);
    // Loop through sessionData['projects'] and get all titles
    sessionData['projects'].forEach((project) => {
        const div = document.createElement('div');
        const title = document.createElement('h4');
        title.textContent = project.title;

        const projectID = project.id;

        const deleteBtn = createDebugButton('delete', (e) => { 
            e.stopPropagation();
            deleteProject(projectID) 
        });

        div.addEventListener('click', () => {
            console.log('div clicked');
        });

        div.append(title, deleteBtn);
        container.append(div);
    });

    return container;
    
}

const clearDOM = (selector) => {
    document.querySelector(selector).innerHTML = '';
}


window.showdata = displayData;
window.sessionData = getsessionData;
window.currentContainer = mainContainer;

window.addEventListener('DOMContentLoaded', init);