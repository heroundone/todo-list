import './main.css';
import { project, todo } from './classes.js';
let hash = require('hash.js');
import * as storage from './local-storage.js';
import {createProjectHtml, addToProject} from './DOM-manipulation.js'
import {projects, todos} from './modules.js';
import {createNewProject} from './createProjects.js';
import {addProjectEventListener} from './project-EventListeners.js'


// main.js will handle initial load of page, and check local storage, if local storage is populated then projects and todos 
// will be appended to the page

// check if local storage contains projects or to-do's
if(storage.checkLocalStorage()) {
    console.log(localStorage);

    // set up the add a project button 
    addProjectEventListener();

    // retrieve the projects and their todos
    storage.extractArraysLocalStorage();

    // iterate through the projects array and append them to the page
    for(let i = 0; i < projects.projectsArray.length; i++) {
        let currentProject = projects.projectsArray[i];
        createProjectHtml(currentProject);
        
        // get key of current project
        let key = currentProject.key;

        // use key to filter out the todos with the corresponding key, match them to their project and append them
        let filteredToDos = todos.todoArray.filter(todo => todo.key === key);
        for(let i = 0; i < filteredToDos.length; i++) {
            addToProject(filteredToDos[i]);
        };
    };

    
}
else {
    // create a project object for general tasks, obtain hash first, check if hash starts with a number

    // obtain hash of project title, then change first value to an int
    let hashCode = hash.sha256().update('General Tasks').digest('hex');
    let hashSplit = hashCode.split('');
    let trueValue = parseInt(hashSplit[0]);

    // if the int is not between 0 and 9 inclusive, then the int corresponds to a letter
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