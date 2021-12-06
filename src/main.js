import './main.css';
import { project, todo } from './classes.js';
let hash = require('hash.js');
import * as storage from './local-storage.js';
import {createProjectHtml, addToProject} from './DOM-manipulation.js'
import {projects, todos} from './modules.js';
import {createNewProject} from './createProjects.js';
import {addProjectEventListener, deleteProjects, deleteAllProjects} from './project-EventListeners.js'


// check if local storage contains projects or to-do's, if so populate the page with them
if(storage.checkLocalStorage()) {
    console.log(localStorage);
    // set up sidebar button event listeners
    addProjectEventListener();
    deleteProjects();
    deleteAllProjects();

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
// nothing in local storage so make a general project to start with for user
else {
    // create a project object for general tasks, obtain hash first, check if hash starts with a number
    console.log(localStorage);
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
    
    
    // set up event listeners for sidebar buttons
    addProjectEventListener();
    deleteProjects();
    deleteAllProjects();

    // store general in local storage
    storage.addProjectToLocalStorage();
    
}