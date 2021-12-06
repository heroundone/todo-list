let hash = require('hash.js');
import {createProjectHtml, removeProjectForm} from './DOM-manipulation.js';
import {checkTextContent, checkDeadline} from './todo-EventListeners.js';
import {createNewProject} from './createProjects.js';
import {addProjectToLocalStorage} from './local-storage.js';
import {todos, projects} from './modules.js';
import { todo } from './classes.js';


// upon clicking the 'add a project' button, a form is generated below the title of the page
function addProjectEventListener() {
    const addProjectButton = document.getElementById('addproject');
    addProjectButton.addEventListener('click', () => {
        // check if the form is already currently displayed
        if(document.getElementById('newProjectForm')) {
            return;
        }

        // need space to append form to, form will go under the header of the page
        const form = document.createElement('div');
        form.setAttribute('id', 'newProjectForm')

        let title = document.createElement('input');
        title.setAttribute('id', 'newProjetTitle');
        title.setAttribute('placeholder', 'title')

        let deadline = document.createElement('input');
        deadline.setAttribute('id', 'newProjectDeadline');
        deadline.setAttribute('placeholder', 'mm/dd/yyyy')

        // button to submit the title and deadline
        let submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'submitNewProject');
        submitButton.textContent = 'Submit';

        // button to remove the form
        let cancelFormButton = document.createElement('button');
        cancelFormButton.textContent = 'Cancel';
        cancelFormButton.addEventListener('click', () => {
            removeProjectForm();
        })
        
        form.append(title, deadline, submitButton, cancelFormButton);
        
        // get the element that contains the header of the page
        let appName = document.getElementById('appName');
        appName.insertAdjacentElement('afterend', form);
        
        // add event listener for submit button
        submitNewProject(title, deadline);
    });
};

// called when submit button in new project form is clicked
function submitNewProject(title, deadline) {
    let submitButton = document.getElementById('submitNewProject');
    submitButton.addEventListener('click', () => {

        // get user's input in title and deadline
        let titleText = title.value;
        let deadlineText = deadline.value;

        // check that input's are not blank and that the deadline meets formatting standards

        if (!(checkTextContent(titleText))) {
            return;
        };
        if (!(checkTextContent(deadlineText))) {
            return;
        };
        if (!(checkDeadline(deadlineText))) {
            alert('Please make sure your date entry matches the expected formatting.')
            return;
        }

        // create a new project, remove new project form, and display the new project on the page
        
        // need the hashed title to not start with number
        let titleForHash = titleText.replace(/\s/g, "");
        let hashCode = hash.sha256().update(titleForHash).digest('hex');
        let hashSplit = hashCode.split('');
        let trueValue = parseInt(hashSplit[0]);
        if(0 <= trueValue <=9) {
            hashSplit.shift();
            hashSplit.unshift('a');
            hashCode = hashSplit.join('');
        };

        let project = createNewProject(titleText, deadlineText, hashCode);
        
        
        removeProjectForm();
        createProjectHtml(project);
        addProjectToLocalStorage();
    });
};

// triggered when delete select projects is clicked
function deleteProjects() {
    
    let deleteButton = document.getElementById('deleteprojects');
    deleteButton.addEventListener('click', () => {
        
        // check if checkboxes already exist, limit the button to one press and then must pick confirm or cancel
        if(document.querySelector('.checkbox')) {
            return;
        };

        // get nodelist containing all projects
        let projects = document.querySelectorAll('#projects div[data-key]');
        let projectsArray = Array.from(projects);
        console.log(projectsArray);

        // create checkbox to append to each project
        let checkbox = document.createElement('div');
        checkbox.setAttribute('class', 'checkbox');

        // add checkbox to each project
        projectsArray.forEach(addingCheckboxes);

        let checkboxes = document.querySelectorAll('.checkbox');
        let checkboxesarray = Array.from(checkboxes);
        
        // checkbox needs event listener
        checkboxEventListener(checkboxesarray);

        // create confirm and cancel buttons regarding project deletion, appended below title of page
        let confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.setAttribute('id', 'confirmdeletion');
        console.log(confirmButton);

        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.setAttribute('id', 'canceldeletion');

        // append buttons below title
        let title = document.getElementById('appName');
        title.appendChild(confirmButton);
        title.appendChild(cancelButton);
        
        // add event listeners to both buttons
        confirmDeletion(confirmButton);
        cancelDeletion(cancelButton);

    });
};

function addingCheckboxes(project) {
    let checkbox = document.createElement('div');
    checkbox.setAttribute('class', 'checkbox');
    project.insertAdjacentElement('beforebegin', checkbox);
}

function checkboxEventListener(checkboxesarray) {
    checkboxesarray.forEach(checkbox => checkbox.addEventListener('click', () => {
        // check its text content for status, unselected = '' and selected = 'X'
        let selectionStatus = checkbox.textContent;
        console.log(checkbox.textContent);

        if(selectionStatus === '') {
            checkbox.textContent = 'X';
        }
        else {
            checkbox.textContent = '';
        };
    }));
};

function confirmDeletion(confirmButton) {
    /* upon click query select for all checkboxes, filter checkboxes for 'X', if checkbox has 'X' get its parent element, 
    add to array, at end of check remove all elements that are in the array */

    confirmButton.addEventListener('click', () => {
        let checkboxes = document.querySelectorAll('.checkbox');
        let checkboxesArray = Array.from(checkboxes);
        let markedCheckboxes = checkboxesArray.filter(ismarked);

        // get keys of projects to be deleted
        let projectsToBeDeleted = [];
        for(let i = 0; i < markedCheckboxes.length; i++) {
            let key = markedCheckboxes[i].nextElementSibling.getAttribute('data-key');
            projectsToBeDeleted.push(key);
        }

        // delete associated todos from local storage
        deleteToDos(projectsToBeDeleted);

        // filter the array using 'projects to be deleted' array, and update local storage
        let projectsToKeep = projects.projectsArray.filter(project => !(projectsToBeDeleted.includes(project.key)));
        localStorage.setItem('projects', JSON.stringify(projectsToKeep));


        // delete checkboxes
        markedCheckboxes.forEach(checkbox => checkbox.parentElement.remove());
        removeConfirmCancelButtons();
        console.log(localStorage);

    });

};

function ismarked(checkbox) {
    return checkbox.textContent === 'X';
};

// clear local storage of todos associated with deleted projects
function deleteToDos(arrayOfProjects) {
    let todosKeep = todos.todoArray.filter(checkToDo, arrayOfProjects);
    localStorage.setItem('todos', JSON.stringify(todosKeep));
};

// check whether the todo is associated with deleted project
function checkToDo(thisTodo) {
    if (!(this.includes(thisTodo.key))) {
        return thisTodo;
    };
};

function cancelDeletion(cancelButton) {
    cancelButton.addEventListener('click', (removeConfirmCancelButtons));
};

function removeConfirmCancelButtons() {
    let confirm = document.getElementById('confirmdeletion');
    let cancel = document.getElementById('canceldeletion');

    confirm.remove();
    cancel.remove();

    let checkboxes = document.querySelectorAll('.checkbox');
    let checkboxesArray = Array.from(checkboxes);

     // get rid of all checkboxes
     checkboxesArray.forEach(checkbox => checkbox.remove());
};

function deleteAllProjects() {
    let button = document.getElementById('deleteallprojects');
    let projects = document.getElementById('projects');
    button.addEventListener('click', () => {
        localStorage.clear();
        while(projects.firstChild) {
            projects.removeChild(projects.firstChild);
        }
    });
};



export {addProjectEventListener, deleteProjects, deleteAllProjects}