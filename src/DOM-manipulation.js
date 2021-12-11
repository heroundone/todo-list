import { todos } from './modules.js';
import {addToDoEventListener, todoFormEventListener, cancelToDoForm} from './todo-EventListeners.js';

function createToDoForm(e) {
    
    let key = getKey(e);

    let descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('rows', '2');
    descriptionInput.setAttribute('cols', '50');
    descriptionInput.setAttribute('class', 'description');

    let deadlineInput = document.createElement('input');
    deadlineInput.setAttribute('type', 'text');
    deadlineInput.setAttribute('class', 'deadline');
    deadlineInput.setAttribute('placeholder', 'mm/dd/yyyy')

    let priorityInput = document.createElement('input');
    priorityInput.setAttribute('placeholder', 'priority(1 - 5)')
    priorityInput.setAttribute('type', 'text');
    priorityInput.setAttribute('class', 'priority');

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    addToDoEventListener(submitButton);
    submitButton.setAttribute('class', 'submit');

    let cancelFormButton = document.createElement('button');
    cancelFormButton.textContent = 'Cancel';
    cancelToDoForm(cancelFormButton);
    cancelFormButton.setAttribute('class', 'cancel');




    displayToDoForm(descriptionInput, deadlineInput, priorityInput, submitButton, cancelFormButton, key);
    
};

function displayToDoForm(description, deadline, priority, submitButton, cancelFormButton, key) {

    // contains the entire add new to-do form
    let form = document.querySelector(`[data-key=${key}] .form`);

    // contains all the inputs to be filled in
    let todoInfo = document.createElement('div');

    // putting everything together
    todoInfo.append(description, deadline, priority)
    form.append(todoInfo, submitButton, cancelFormButton);

};

function removeToDoForm(key) {
    // obtain the add todo form element
    let form = document.querySelector(`[data-key=${key}] .form`);
    while(form.firstChild) {
        form.removeChild(form.firstChild);
    };
};

function addToProject(newToDo) {
    // create a new list item for the unordered todo list
    let item = document.createElement('li');
    item.setAttribute('data-key', newToDo.identifier)

    // retrieve the 'ul' to append items to
    let list = document.querySelector(`[data-key=${newToDo.key}] .todoList`);

    // add todo info to item, create div to do so
    let todoInfo = document.createElement('div');

    for (const key in newToDo) {
        if (key !== 'key' && key !== 'identifier') {
            let span = document.createElement('span');
            span.textContent = newToDo[key];
            item.appendChild(span);
        };
    };

    // create a button that will allow for removal of the todo; its id matches the todo object's identifier
    let button = document.createElement('button');
    button.setAttribute('id', newToDo.identifier);
    button.textContent = 'Remove ToDo';
    item.appendChild(button);

    button.addEventListener('click', (e) => {
        // remove todo from local storage
        let targetIdentifier = e.target.getAttribute('id');
        let newToDosArray = todos.todoArray.filter(todo => todo.identifier != targetIdentifier);
        localStorage.setItem('todos', JSON.stringify(newToDosArray));

        //remove todo from page
        let todo = e.target.parentElement;
        todo.remove();
        console.log(localStorage);
    })

    // append item to list
    list.appendChild(item);
};

// create html elements for displaying the project
function createProjectHtml(project) {
    let projectContainer = document.createElement('div');
    projectContainer.setAttribute('class', 'projectContainer');

    let projectDiv = document.createElement('div');
    projectDiv.setAttribute('data-key', project.key)
    projectDiv.setAttribute('class', 'project');

    // span elements to contain project title and deadline
    let titleSpan = createSpan(project.title);
    let deadlineSpan = createSpan('Due:' + ' ' + project.deadline);

    // div for the span elements, for flexbox styling
    let spanDiv = document.createElement('div');
    spanDiv.setAttribute('class', 'spanDiv')

    let todosDiv = document.createElement('div')
    todosDiv.setAttribute('class', 'todosDiv')

    let todoList = document.createElement('ul');
    todoList.setAttribute('class', 'todoList')

    let formDiv = document.createElement('div');
    formDiv.setAttribute('class', 'form')

    let todoButton = document.createElement('button');
    todoButton.setAttribute('class', 'todoButton');
    todoButton.textContent = 'Add New ToDo Item';
    todoFormEventListener(todoButton);
    

    displayProject(projectContainer, projectDiv, spanDiv, titleSpan, deadlineSpan, todosDiv, todoList, formDiv, todoButton);

};

// actually appends the javascript generated html elements
function displayProject(projectContainer, projectDiv, spanDiv, titleSpan, deadlineSpan, todosDiv, todoList, formDiv, todoButton) {
    // what we will append the document fragment to
    let projects = document.getElementById('projects');

    // make document fragment
    let docFrag = new DocumentFragment();
    docFrag.appendChild(projectContainer);
    projectContainer.appendChild(projectDiv);
    spanDiv.append(titleSpan, deadlineSpan);
    projectDiv.append(spanDiv, todosDiv);
    todosDiv.append(todoList, formDiv, todoButton);
    //formDiv.insertAdjacentElement('afterend', todoButton);

    // append doc fragment to the proper document
    projects.appendChild(docFrag);

};

function removeProjectForm() {
    // get new project form element
    const newProjectForm = document.getElementById('newProjectForm');
    while(newProjectForm.firstChild) {
        newProjectForm.removeChild(newProjectForm.firstChild);
    };
    newProjectForm.remove();
};

function setID(element, id) {
    element.setAttribute('id', id);
};

function createSpan(text) {
    let span = document.createElement('span');
    span.textContent = text;
    return span;
};

// key refers to the hash generated for each project, a unique id
function getKey(e) {
    let key = e.target.parentElement.parentElement.getAttribute('data-key');
    return key;
};


export {getKey, setID, displayProject, createProjectHtml, removeProjectForm, createToDoForm,  displayToDoForm, createSpan, addToProject, removeToDoForm}