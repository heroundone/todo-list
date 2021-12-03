import {project} from './classes.js'
import {projects} from './modules.js'

function createNewProject(title, deadline, titleForHash) {
    let newProject = new project(title, deadline, titleForHash);
    projects.projectsArray.push(newProject);
    return newProject;
};



export {createNewProject};