import './styles.css';
import * as utilities from './utilities.js';
import * as todo from './todo-item.js';

let storage;

const mainContainer = document.querySelector('main.container');

const init = () => {
    console.log(`We have localStorage functionality: ${testfunction()}`);
    if (testfunction) {
        console.log(storage.length); // this let's us check if the storage has been made use of yet at all
        storage.setItem("colorSetting", "#a4509b");
        console.dir(storage);

        const currentColor = localStorage.getItem("colorSetting");
        const background = document.querySelector('body');
        background.style.setProperty('background-color', currentColor);

        todo.renderTodo(mainContainer);
    }
}

const testfunction = () => {
    if (utilities.storageAvailable('localStorage')) {
        storage = window['localStorage']; // loads the localStorage to storage variable initialized on ln 4
        return true;
    } else {
        return false;
    }
}

window.addEventListener('DOMContentLoaded', init);