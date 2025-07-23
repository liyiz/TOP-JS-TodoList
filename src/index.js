import './styles.css';
import * as utilities from './utilities.js';
import { Todo } from './todo.js';
import { Project } from './project.js';
import testjson from './example.json' assert {type: 'json'}
import { Page } from './page.js';

let storage;
let appData;

const mainContainer = document.querySelector('main.container');
const currentPage = null; // hold page state
const currentProjectID = null; // hold selected project
const currentTodoID = null; // hold selected todo

const init = () => {
    // console.log(`localStorage functionality: ${checkAndAssignStorage()}`);

    let userData;

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


const displayData = () => {
    // console.dir(appData);
    createNewProject('20', 'Project One');
}


// function that adds a project data object to the overall data
const createNewProject = (id, title) => {
    // New project assumes an empty todos array first
    const project = new Project(id, title);

    console.dir(project.getTodos())
}

const createNewTodo = () => {
    // New todo
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


window.showdata = displayData;

window.addEventListener('DOMContentLoaded', init);