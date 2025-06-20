import './styles.css';
import * as utilities from './utilities.js';
import * as todo from './todo-item.js';
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

    todo.renderTodo(mainContainer, userData);

    parseData(userData);

}


const parseData = (data) => {
    // Parse stored data into an array to loop through
    // console.dir(data);
    // project -> projects -> todos
    // console.log(data.length);

    let testarray = Object.values(data);
    testarray.forEach((value) => {
        console.log(value);
        let innerdata = Object.values(value);
        innerdata.forEach((insidedata) => console.log(insidedata));
    });

}


const renderAllTodos = () => {
    // run todo.renderTodo() loop
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