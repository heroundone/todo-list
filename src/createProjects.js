import {project} from './classes.js'
import {projects} from './modules.js'

function createNewProject(title, deadline) {
    let newProject = new project(title, deadline);
    projects.projectsArray.push(newProject);
    return newProject;
};



export {createNewProject};