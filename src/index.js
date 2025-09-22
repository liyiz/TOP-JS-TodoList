import "./styles.css";
import * as utilities from "./utilities.js";
import { Todo } from "./todo.js";
import { Project } from "./project.js";

let sessionData; // holds app data

// User journey - holistic reminder //
// 1. User should see a list of projects.
// 2. User should be able to
//      a. Select a project, to view its todos
//      b. Delete a project
//      c. Add a new project
// 3. When a project has been selected, the user should be able to
//      a. View all of its todos
//      b. Add a todo
//      c. Edit a todo
//      d. Delete a todo
//      e. Organise todos order

// module responsibilities //
// index.js -> entry point and conductor
// user.js -> business logic for class responsible for data object that holds projects array
// project.js -> business logic for what is a collection of todos -> title, description
// todo.js -> business logic of todos -> uuid, title, description, due date, completed status, priority

const init = () => {
  if (utilities.isStorageAvailable('localStorage')) {
    // Parse the localStorage data and set in the current session sessionData
    const result = JSON.parse(window["localStorage"].getItem("userData"));
    sessionData = result;
  } else {
    // if there is no data in local storage (first time running app), then we initialise sessionData as fresh
    console.log('ℹ This is where you should add a default user.');
  }
};

window.addEventListener("DOMContentLoaded", init);
