import './styles.css';
import * as utilities from './utilities.js';
import * as todo from './todo.js';
import { Project } from './project.js';
import testjson from './example.json' assert {type: 'json'}

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
    let project01 = new Project(parsedProjectsData[0].id, parsedProjectsData[0].projectTitle, parsedProjectsData[0].todos)
    const cardtest = project01.renderProjectCard();
    mainContainer.append(cardtest);

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