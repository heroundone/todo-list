import {project} from './classes.js'
import {projects} from './modules.js'

function createGeneralProject() {
    let general = new project('General Tasks', 'Deadline: N/A');
    return general;

};

function createNewProject(title, deadline) {
    let newProject = new project(title, deadline);
    projects.projectsArray.push(newProject);
    return newProject;
};



export {createGeneralProject, createNewProject};