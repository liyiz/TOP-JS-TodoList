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

// let pageRender = null; // will initialise Page class instance ## disabled for TESTING

const init = () => {


    // 1. Check if local storage exists
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

    // pageRender = new Page(mainContainer);
    // pageRender.renderPage(pageRender.renderMainPage); // at the moment this just clears the page




    // Local Storage

        // console.log(storage.length); // this let's us check if the storage has been made use of yet at all
        // storage.setItem("colorSetting", "#a4509b");
        // console.dir(storage);

        // const currentColor = localStorage.getItem("colorSetting");
        // const background = document.querySelector('body');
        // background.style.setProperty('background-color', currentColor);
        
        // userData = setupStorage();

    // If local storage is available && there is no existing sessionData stored
    // if (isStorageAvailable()) {
    // If local storage is available && there is existing sessionData

    // If local storage is not available
    // } else {
    //     console.error('localStorage is not accessible.');
    // }

    // // get user settings data
    // const userSettings = userData.settings;
    // // get projects data
    // const parsedProjectsData = parseProjectsData(userData);
    // sessionData = parsedProjectsData;

    // const mainPage = new Page('home', document.querySelector('body'));

    // const projectPages = [];
    // const projectList = document.createElement('ul');


    // mainContainer.append(projectList);

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