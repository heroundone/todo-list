import './main.css';
import { project, todo } from './classes.js';
let hash = require('hash.js');
import * as storage from './local-storage.js';
import {createProjectHtml} from './DOM-manipulation.js'
import {projects, todos} from './modules.js';
import {createNewProject} from './createProjects.js';
import {addProjectEventListener} from './project-EventListeners.js'


// main.js will handle initial load of page, and check local storage, if local storage is populated then projects and todos 
// will be appended to the page

// check if local storage contains projects or to-do's
if(storage.checkLocalStorage()) {
    console.log(localStorage);
    storage.extractArraysLocalStorage();
    console.log(todos.todoArray);
    console.log(projects.projectsArray);
    localStorage.clear();
}
else {
    // create a project object for general tasks, obtain hash first

    let hashCode = hash.sha256().update('General Tasks').digest('hex');
    let hashSplit = hashCode.split('');
    let trueValue = parseInt(hashSplit[0]);
    if(0 <= trueValue <=9) {
        hashSplit.shift();
        hashSplit.unshift('a');
        hashCode = hashSplit.join('');
    };
    let general = createNewProject('General Tasks', 'N/A', hashCode);
    
    // display the general project on the webpage
    createProjectHtml(general);
    
    // add an event listener to add project button
    addProjectEventListener();

    // store general in local storage
    storage.addProjectToLocalStorage();
    
    console.log(localStorage);
    console.log(projects.projectsArray);
}