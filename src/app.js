import { View } from './view'
import exampleJSON from './example.json';
import loadData from './loadData';
import saveToLocalStorage from './saveToLocalStorage';

export class App
{
  constructor( elementId )
  {
    this.view = new View(elementId);
    this.userData = loadData();
    this.init();
  }

  init() {
    console.log('App has init-ed!');
    console.log('inspecting data loaded from localStorage', this.userData);

    this.view.updateElementText('#project-title', this.userData.projects[0].title);
    this.view.populateList(this.userData.projects[0].todos);
  }
}