import{projects, todos} from './modules.js';

// upon load of page check local storage
function checkLocalStorage() {
    if(localStorage.length) {
        return true;
    }
    else {
        return false;
    };
};

function addProjectToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects.projectsArray));
};

function addToDoToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos.todoArray));
};

//removeFromLocalStorage

function extractArraysLocalStorage() {
    let currentProjects = JSON.parse(localStorage.getItem('projects'));
    if (currentProjects !== null) {
        console.log(currentProjects);
        for(let i = currentProjects.length - 1; i >= 0; i--) {
            let project = currentProjects[i];
            projects.projectsArray.unshift(project);
        };
    };

    let currentToDos = JSON.parse(localStorage.getItem('todos'));
    if(currentToDos !== null) {
        console.log(currentToDos);
        for(let i = currentToDos.length - 1; i >= 0; i--) {
            let todo = currentToDos[i];
            todos.todoArray.unshift(todo);
        };
    };
}

export {checkLocalStorage, addProjectToLocalStorage, addToDoToLocalStorage, extractArraysLocalStorage}