import './styles.css';
import * as utilities from './utilities.js';
import { Todo } from './todo.js';
import { Project } from './project.js';
import testjson from './example.json' assert {type: 'json'}
import { Page } from './page.js';

let storage;

const mainContainer = document.querySelector('main.container');

const init = () => {
    // console.log(`localStorage functionality: ${checkAndAssignStorage()}`);

    let userData;

    if (checkAndAssignStorage()) {
        // console.log(storage.length); // this let's us check if the storage has been made use of yet at all
        storage.setItem("colorSetting", "#a4509b");
        // console.dir(storage);

        const currentColor = localStorage.getItem("colorSetting");
        const background = document.querySelector('body');
        background.style.setProperty('background-color', currentColor);
        
        userData = setupStorage();
    } else {
        console.error('localStorage is not accessible.');
    }

    // todo.renderTodo(mainContainer, userData);

    // get user settings data
    const userSettings = userData.settings;
    // get projects data
    const parsedProjectsData = parseProjectsData(userData);

    console.dir(parsedProjectsData);

    // renderAllTodos(parsedProjectsData);

    // Render Projects View first
    // renderProjectsView(mainContainer, parsedProjectsData);

    const projectList = document.createElement('ul');

    parsedProjectsData.forEach((projectData) => {
        const projectClass =  new Project(projectData.id, projectData.projectTitle, projectData.todos);
        console.log(projectClass.todos[0]);
        const projectCard = projectClass.renderProjectCard();
        projectList.append(projectCard);
    });

    mainContainer.append(projectList);

}


const setPage = () => {
    // switch case to handle state via URL hash
    // check https://developer.mozilla.org/en-US/docs/Web/API/Location/hash
    // but essentially a tag is added to the end of the url that can be accessed via browser api
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/hash
    // switch (window.location.hash) {
    //     case '#menu':
    //         renderPage(renderMenu);
    //         break;
    //     case '#about':
    //         renderPage(renderAbout);
    //         break;
    //     default:
    //         renderPage(renderHome);
    // }

    // Get hash, and send as an argument to renderPage
}

const renderPage = (pageFunction) => {
    // Clear the previous page before rendering the new page
    // container.innerHTML = '';
    // pageFunction(container);
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


const renderAllTodos = (data) => {
    // run todo.renderTodo() loop
    // data.forEach((value) => {
    //     // Something to render a different Project Container
    //     let projectContainer = project.createProjectContainer();
    //     project.renderProject(projectContainer, value.projectTitle);
    //     value.todos.forEach(item => {
    //         todo.renderTodo(projectContainer, item);
    //     });
    //     mainContainer.append(projectContainer);
    // });
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


window.addEventListener('DOMContentLoaded', init);