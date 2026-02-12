import { App } from './app';
import exampleJSON from './example.json';
import loadData from './loadData';
import saveToLocalStorage from './saveToLocalStorage';

// saveToLocalStorage(exampleJSON); // run to save example json first time

window.app = new App('#app-root');