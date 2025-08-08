import './styles.css';
import * as utilities from './utilities.js';
import { Todo } from './todo.js';
import { Project } from './project.js';
import testjson from './example.json' assert {type: 'json'}
import { Page } from './page.js';

let storage; // holds data from localStorage api
let appData; // holds app data

const mainContainer = document.querySelector('main.container');
const projectsListElID = 'projects-list';
const currentPage = null; // hold page state
const currentProjectID = null; // hold selected project
const currentTodoID = null; // hold selected todo

const init = () => {

    // 1. Check if local storage exists
    if (isStorageAvailable()) {
        // Parse the localStorage data and set in the current session appData
        const result = JSON.parse(window['localStorage'].getItem('userData'));
        appData = result;

    } else {
        // if there is no data in local storage (first time running app), then we initialise appData as fresh
        appData = {
            "settings" : {
                "last open project": 0
            },
            "projects": []
        };
    }

    const testbtn = createDebugButton('show data', displayData);
    mainContainer.append(testbtn);

    const addNewProjectBtn = createDebugButton('Add New Project', () => {
        // TODO generate id
        const newProject = createNewProject('Generated New Project');
        
        addNewProject(newProject);
    }); // TODO add function that adds new project

    const addNewLocalStorageTestData = createDebugButton('Add new local storage test data', () => {
        // Creates dummy appData and saves to local storage under "userData"
        // need to store `window['localStorage']` to a global to access in this code.
        window['localStorage'].setItem('userData', JSON.stringify(createTestAppData()));
    });

    mainContainer.append(addNewProjectBtn, addNewLocalStorageTestData);


    // Create input form for projects

    const form = document.createElement('form');

    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.textContent = 'Project Title';

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Save';
    submitBtn.setAttribute('type', 'submit');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // TODO run a check to make sure the string is not empty
        // otherwise create fall back name for the project.
        // TODO also remember to enable project name editing.

        const newProjectTitle = input.value;
        const newProject = createNewProject(newProjectTitle);
        addNewProject(newProject);
    });

    div.append(label, input, submitBtn);
    form.append(div);
    mainContainer.append(form);

    const projectsListContainer = document.createElement('div');
    projectsListContainer.id = projectsListElID;
    mainContainer.append(projectsListContainer);

    renderProjectList(`#${projectsListElID}`); // this is just here for testing




    // Local Storage

        // console.log(storage.length); // this let's us check if the storage has been made use of yet at all
        // storage.setItem("colorSetting", "#a4509b");
        // console.dir(storage);

        // const currentColor = localStorage.getItem("colorSetting");
        // const background = document.querySelector('body');
        // background.style.setProperty('background-color', currentColor);
        
        // userData = setupStorage();

    // If local storage is available && there is no existing appData stored
    // if (isStorageAvailable()) {
    // If local storage is available && there is existing appData

    // If local storage is not available
    // } else {
    //     console.error('localStorage is not accessible.');
    // }

    // // get user settings data
    // const userSettings = userData.settings;
    // // get projects data
    // const parsedProjectsData = parseProjectsData(userData);
    // appData = parsedProjectsData;

    // const mainPage = new Page('home', document.querySelector('body'));

    // const projectPages = [];
    // const projectList = document.createElement('ul');


    // mainContainer.append(projectList);

}


const createTestAppData = () => {
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
    appData["projects"].push(project);
    console.log('New project ', project, 'added to appData.'); // for debug purposes
    
    updateLocalStorage();

    clearDOM(`#${projectsListElID}`);

    // Clear the container
    // then I need to have a reference to the container anyway to populate with new content...
    // re-render the contents again from the updated appData
    const newContent = renderProjectList(`#${projectsListElID}`);
    mainContainer.append(newContent);
}






const displayData = () => {
    console.dir(appData);
}

const getAppData = () => {
    return appData['projects'][0]['title'];
}

// function that adds a project data object to the overall data
const createNewProject = (title) => {
    // New project assumes an empty todos array first
    const project = new Project(title);

    return project;
}

const deleteProject = (projectID) => {
    // Ideally we identify the project to delete with project ID - but that is a TODO
    const targetIndex = appData['projects'].findIndex(obj => obj.id === projectID);
    appData['projects'].splice(targetIndex, 1);
    console.log(displayData());

    updateLocalStorage();

    clearDOM(`#${projectsListElID}`);
    // re-render the contents again from the updated appData
    const newContent = renderProjectList(`#${projectsListElID}`);
    mainContainer.append(newContent);
}

const updateLocalStorage = () => {
    window['localStorage'].setItem('userData', JSON.stringify(appData));
}

const createNewTodo = (title, description, dueDate, priority) => {
    // New todo
    const todo = new Todo(title, description, dueDate, priority)

    return todo;
}

const createUserSettings = () => {
    // Create user settings data object
    // Will need userSettings.js and UserSettings class
}

const selectProject = () => {

    console.log("Project selected, now rendering project page with todos...", this.id);

    // some renderPage() function to render out a page...

}


const parseProjectsData = (data) => {
    // Parse stored data into an array to loop through

    // Check if data returned is even necessary to process - feels like it can be accessed directly now due to changed json structure.

    return Object.values(data.projects).map(project => {
        const todos = Object.values(project.todos);
        const projectTitle = project.title;
        const id = project.id;
        return {id, projectTitle, todos};
    });

}



const setupStorage = () => {
    storage.setItem('userData', JSON.stringify(testjson));
    const result = JSON.parse(storage.getItem('userData'));
    return result;
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
    // Loop through appData['projects'] and get all titles
    appData['projects'].forEach((project) => {
        const projectTitle = document.createElement('h4');
        projectTitle.textContent = project.title;

        const projectID = project.id;

        const deleteBtn = createDebugButton('delete', () => { deleteProject(projectID) });

        container.append(projectTitle, deleteBtn);
    });

    return container;
    
}

const renderProjectCard = () => {

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

const renderTodoList = () => {
        const todoList = document.createElement('ul');
        // loop through entire todos array

        this.todos.forEach((todo) => {
            const item = new Todo(todo.title, todo.description, todo.dueDate, todo.priority).renderTodo();
            todoList.append(item);
        });

        return todoList
    }

const renderTodo =  () => {
    const todoBody = document.createElement('li');
    todoBody.classList.add('todo');

    const title = this.renderTitle(this.title);
    const description = this.renderDescription(this.description);
    const dueDate = this.renderDueDate(this.dueDate);
    const priority = this.renderPriority(this.priority);

    todoBody.append(title, description, dueDate, priority);
    return todoBody
}

const renderTitle =  (text) =>  {
    const title = document.createElement('h1');
    title.classList.add('todo-title');
    title.textContent = text;
    // add any styling or eventlistener related stuff here?
    return title;
}

const renderDescription =  (text) =>  {
    const description = document.createElement('p');
    description.classList.add('todo-descr');
    description.textContent = text;
    // add any styling or eventlistener related stuff here?
    return description;
}

const renderDueDate =  (date) =>  {
    const dueDate = document.createElement('p');
    dueDate.classList.add('todo-ddate');
    dueDate.textContent = date; // This will need to be replaced with date data type
    return dueDate;
}

const renderPriority =  (value) =>  {
    const priority = document.createElement('div');
    priority.classList.add('todo-priority');
    // Use some kind of image for the priority?
    priority.textContent = value;
    return priority;
}


const clearDOM = (selector) => {
    document.querySelector(selector).innerHTML = '';
}


window.showdata = displayData;
window.appData = getAppData;

window.addEventListener('DOMContentLoaded', init);