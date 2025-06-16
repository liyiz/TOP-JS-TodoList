import './styles.css';
import * as utilities from './utilities.js';

const init = () => {
    console.log(`We have localStorage functionality: ${testfunction()}`);
}

const testfunction = () => {
    if (utilities.storageAvailable('localStorage')) {
        return true;
    } else {
        return false;
    }
}

window.addEventListener('DOMContentLoaded', init);