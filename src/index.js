import './styles.css';
import * as utilities from './utilities.js';
import { Todo } from './todo.js';
import { Project } from './project.js';
import testjson from './example.json' assert {type: 'json'}
import { Page } from './page.js';

let storage; // holds data from localStorage api
let appData; // holds app data

const mainContainer = document.querySelector('main.container');
const currentPage = null; // hold page state
const currentProjectID = null; // hold selected project
const currentTodoID = null; // hold selected todo

const init = () => {
    // console.log(`localStorage functionality: ${checkAndAssignStorage()}`);

    // check if local storage data exists

    // if local storage data exists, load it into the app - into appData

    // if there is no data in local storage (first time running app), then we initialise appData as fresh
    appData = {
        "settings" : {
            "data": "some data"
        },
        "projects": []
    };

    // consider generating the id instead of this string I'm giving it
    const firstProject = createNewProject('project-001', 'My First Project');

    addNewProject(firstProject);

    // add some dummy todos to first project
    for(let i = 0; i < 3; i++) {
        const todo = createNewTodo(`My Task ${i+1}`, 'Lorem upsum dolor sit met', 'Monday', 'Medium');
        appData["projects"][0].todos.push(todo);
    }

    const testbtn = makeDebugButton('test me', () => {console.log("the test works!")})
    mainContainer.append(testbtn);


    const addNewProjectBtn = makeDebugButton('Add New Project', () => {
        const newProject = createNewProject('project-test', 'Generated New Project')
        addNewProject(newProject);
    }); // TODO add function that adds new project
    mainContainer.append(addNewProjectBtn);

    // if (checkAndAssignStorage()) {
    //     // console.log(storage.length); // this let's us check if the storage has been made use of yet at all
    //     storage.setItem("colorSetting", "#a4509b");
    //     // console.dir(storage);

    //     const currentColor = localStorage.getItem("colorSetting");
    //     const background = document.querySelector('body');
    //     background.style.setProperty('background-color', currentColor);
        
    //     userData = setupStorage();
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


const addNewProject = (project) => {
    appData["projects"].push(project);
}


const displayData = () => {
    console.dir(appData);
}


// function that adds a project data object to the overall data
const createNewProject = (id, title) => {
    // New project assumes an empty todos array first
    const project = new Project(id, title);

    return project;
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


const checkAndAssignStorage = () => {
    if (utilities.storageAvailable('localStorage')) {
        storage = window['localStorage']; // loads the localStorage to storage variable initialized on ln 4
        return true;
    } else {
        return false;
    }
}


// Test functions - like make debug buttons

const makeDebugButton = (btnLabel, btnFunc) => {
    const button = document.createElement('button');
    button.textContent = btnLabel;
    button.onclick = btnFunc;

    return button;
}


// Project render functions

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


window.showdata = displayData;

window.addEventListener('DOMContentLoaded', init);