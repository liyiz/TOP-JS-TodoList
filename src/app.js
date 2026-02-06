import { View } from './view'

export class App
{
  constructor( elementId )
  {
    // Instantiate engine and other key classes
    this.testMessage();
    this.root = new View(elementId);
    this.init();
  }

  testMessage() {
    console.log('this is a test message from App class');
  }

  init() {
    console.log('App has init-ed!');
  }
}