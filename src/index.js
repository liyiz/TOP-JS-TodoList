import { App } from './app';
import exampleJSON from './example.json';
import loadData from './loadData';
import saveToLocalStorage from './saveToLocalStorage';

// saveToLocalStorage(exampleJSON); // run to save example json first time

const userData = loadData(); // single source of truth, all app data is loaded here
console.log('inspecting data loaded from localStorage', {userData});

window.app = new App('#app-root');