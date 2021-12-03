import {addToDoEventListener, todoFormEventListener} from './todo-EventListeners.js';

function createToDoForm(e) {

    let descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('rows', '4');
    descriptionInput.setAttribute('cols', '50');
    descriptionInput.setAttribute('class', 'description');

    let deadlineInput = document.createElement('input');
    deadlineInput.setAttribute('type', 'text');
    deadlineInput.setAttribute('class', 'deadline');
    deadlineInput.setAttribute('placeholder', 'mm/dd/yyyy')

    let priorityInput = document.createElement('input');
    priorityInput.setAttribute('type', 'text');
    priorityInput.setAttribute('class', 'priority');

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    addToDoEventListener(submitButton);
    submitButton.setAttribute('class', 'submit');

    let key = getKey(e);

    displayToDoForm(descriptionInput, deadlineInput, priorityInput, submitButton, key);
    
    // create form to fill out
    // extract data from form
    // each project will have a 'add new todo button' when clicked on
    // get id of project(which will equal key), get id of button's parent's parent node
    // call createToDo(), make sure to pass in the key, so that the project and todo's are linked
};

function displayToDoForm(description, deadline, priority, submitButton, key) {

    // contains the entire add new to-do form
    let form = document.querySelector(`#${key} .form`);

    // contains all the inputs to be filled in
    let todoInfo = document.createElement('div');

    // putting everything together
    todoInfo.append(description, deadline, priority)
    form.append(todoInfo, submitButton);

};

function removeToDoForm(key) {
    // obtain the add todo form element
    let form = document.querySelector(`#${key} .form`);
    while(form.firstChild) {
        form.removeChild(form.firstChild);
    };
};

function addToProject(newToDo) {
    // create a new list item for the unordered todo list
    let item = document.createElement('li');

    // retrieve the 'ul' to append item to
    let list = document.querySelector(`#${newToDo.key} .todoList`);

    // add todo info to item, create div to do so
    let todoInfo = document.createElement('div');

    for (const key in newToDo) {
        if (key !== 'key') {
            let span = document.createElement('span');
            span.textContent = newToDo[key];
            item.appendChild(span);
        };
    };

    // append item to list
    list.appendChild(item);
};

// create html elements for displaying the project
function createProjectHtml(project) {
    let projectDiv = document.createElement('div');
    setID(projectDiv, project.key);
    projectDiv.setAttribute('class', 'project');

    // span elements to contain project title and deadline
    let titleSpan = createSpan(project.title);
    let deadlineSpan = createSpan(project.deadline);

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

    displayProject(projectDiv, spanDiv, titleSpan, deadlineSpan, todosDiv, todoList, formDiv, todoButton);

};

// actually appends the javascript generated html elements
function displayProject(projectDiv, spanDiv, titleSpan, deadlineSpan, todosDiv, todoList, formDiv, todoButton) {
    // what we will append the document fragment to
    let projects = document.getElementById('projects');

    // make document fragment
    let docFrag = new DocumentFragment();
    docFrag.appendChild(projectDiv);
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
    let key = e.target.parentElement.parentElement.id;
    return key;
};


export {getKey, setID, displayProject, createProjectHtml, removeProjectForm, createToDoForm,  displayToDoForm, createSpan, addToProject, removeToDoForm}