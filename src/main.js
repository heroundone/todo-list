import './main.css';
import { project, todo } from './classes.js';
let hash = require('hash.js');
import * as storage from './local-storage.js';
import {getKey, setID, displayGeneralProject, createGeneralHtml, createToDoForm} from './DOM-manipulation.js'
import { projects, todos } from './modules.js';
import { createGeneralProject, createNewProject } from './createProjects.js';


// main.js will handle initial load of page, and check local storage, if local storage is populated then projects and todos 
// will be appended to the page

// check if local storage contains projects or to-do's
if(storage.checkLocalStorage()) {

}
else {
    let general = createGeneralProject();
    projects.projectsArray.push(general);
    createGeneralHtml(general);

}