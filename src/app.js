import { View } from './view'
import exampleJSON from './example.json';
import loadData from './loadData';
import saveToLocalStorage from './saveToLocalStorage';

export class App
{
  constructor( elementId )
  {
    // Instantiate engine and other key classes
    this.testMessage();
    this.view = new View(elementId);
    this.userData = loadData();
    this.init();
  }

  testMessage() {
    console.log('this is a test message from App class');
  }

  init() {
    console.log('App has init-ed!');
    console.log('inspecting data loaded from localStorage', this.userData);
    const exampleListItem = this.view.createListItem(this.userData.projects[0].todos[0]);
    this.view.addItemToList(exampleListItem);
    this.view.updateElementText('#project-title', this.userData.projects[0].title);
  }
}