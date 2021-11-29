import {project, todo} from './classes.js'

function createGeneralProject() {
    let general = new project('General Tasks', 'Deadline: N/A');
    return general;

};

function createNewProject(title, deadline) {
    let newProject = new project(title, deadline);
    return newProject;
};



export {createGeneralProject, createNewProject};