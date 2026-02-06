export class View 
{
  constructor( elementId )
  {
    // Instantiate engine and other key classes
    this.attachToDOM(elementId);
  }

  attachToDOM(elementId) {
    const root = document.querySelector(elementId);
    const div = document.createElement('div');
    div.style.cssText = "width: 50px; height: 50px; background: blue;";
    root.append(div);
  }

}