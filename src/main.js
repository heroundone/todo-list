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

}
else {
    // create a project object for general tasks
    let general = createNewProject('General Tasks', 'N/A');

    // add it to the projects array
    projects.projectsArray.push(general);

    // display the general project on the webpage
    createProjectHtml(general);

    // add an event listener to add project button
    addProjectEventListener();

}