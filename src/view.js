export class View 
{
  constructor( elementId )
  {
    // Instantiate engine and other key classes
    this.layout = this.createLayout();
    this.attachToDOM(elementId);
  }

  attachToDOM(elementId) {
    const root = document.querySelector(elementId);
    // const div = document.createElement('div');
    // div.style.cssText = "width: 50px; height: 50px; background: blue;";
    // root.append(div);
    root.append(this.layout);
  }

  createLayout() {
    // returns HTMLElements to form the app's layout
    const section = document.createElement('section');
    section.classList.add('project-container');

    const headerDiv = this.createHeaderElement();
    const todosList = this.createListHolder();

    section.append(headerDiv, todosList);

    return section;
  }

  createHeaderElement() {
    // creates and returns the header
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('project-header');
    const headerH1 = document.createElement('h1');
    headerH1.id = 'project-title';
    headerH1.innerText = 'Project Title Undefined';
    const headerBtn = document.createElement('button');
    headerBtn.innerText = '+ Add Task';
    headerBtn.id = 'add-task';
    headerBtn.setAttribute('type', 'submit');
    headerDiv.append(headerH1);
    headerDiv.append(headerBtn);

    return headerDiv;
  }

  createListHolder() {
    // creates the <ul> that holds the todos
    const ul = document.createElement('ul');
    ul.id = 'todos-list';

    // const newLi = this.createListItem();

    return ul;
  }

  createListItem(data) {
    // data parameter expects just the todo data object
    // { id, title, description ... }
    const li = document.createElement('li');
    li.innerText = data.title

    return li;
  }

  addItemToList(item) {
    const listHolder = document.querySelector('#todos-list');
    listHolder.append(item);
  }

  updateElementText(query, text) {
    const element = document.querySelector(query);
    element.innerText = text;
  }

}