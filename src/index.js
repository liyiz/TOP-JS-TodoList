import './styles.css';
import * as utilities from './utilities.js';

let storage;

const init = () => {
    console.log(`We have localStorage functionality: ${testfunction()}`);
    console.dir(storage);
    console.log(storage.length); // this let's us check if the storage has been made use of yet at all
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