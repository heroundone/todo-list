// newToDoForm will be in an event listener, activated on clicking new todo button

function createToDoForm(e) {

    let descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('rows', '4');
    descriptionInput.setAttribute('cols', '50');
    let deadlineInput = document.createElement('input');
    deadlineInput.setAttribute('type', 'text');
    let priorityInput = document.createElement('input');
    priorityInput.setAttribute('type', 'text');
    key = getKey(e);
    let submitButton = document.createElement('button');
    // create form to fill out
    // extract data from form
    // each project will have a 'add new todo button' when clicked on
    // get id of project(which will equal key), get id of button's parent's parent node
    // call createToDo(), make sure to pass in the key, so that the project and todo's are linked
}

// function displayToDoForm()


// create html elements for displaying the general project
function createGeneralHtml(general) {
    let projectDiv = document.createElement('div');
    setID(projectDiv, general.key);

    // span elements to contain project title and deadline
    let titleSpan = createSpan(general.title);
    let deadlineSpan = createSpan(general.deadline);

    // div for the span elements, for flexbox styling
    let spanDiv = document.createElement('div');
    setID(spanDiv, 'projectDetails');

    let todosDiv = document.createElement('div')
    setID(todosDiv, 'todos');
    let formDiv = document.createElement('div');
    setID(formDiv, 'form');
    let todoButton = document.createElement('button');
    setID(todoButton, 'newToDo');
    todoButton.textContent = 'Add New ToDo Item';

    displayGeneralProject(projectDiv, spanDiv, titleSpan, deadlineSpan, todosDiv, formDiv, todoButton);

};

// actually appends the javascript generated html elements
function displayGeneralProject(projectDiv, spanDiv, titleSpan, deadlineSpan, todosDiv, formDiv, todoButton) {
    // what we will append the document fragment to
    let projects = document.getElementById('projects');

    // make document fragment
    let docFrag = new DocumentFragment();
    docFrag.appendChild(projectDiv);
    spanDiv.append(titleSpan, deadlineSpan);
    projectDiv.append(spanDiv, todosDiv);
    todosDiv.append(formDiv, todoButton);
    //formDiv.insertAdjacentElement('afterend', todoButton);

    // append doc fragment to the proper document
    projects.appendChild(docFrag);

}

function setID(element, id) {
    element.setAttribute('id', id);
}

function createSpan(text) {
    let span = document.createElement('span');
    span.textContent = text;
    return span;
}

function getKey() {
    let key = e.target.parentElement.parentElement;
    return key;
}

export {getKey, setID, displayGeneralProject, createGeneralHtml, createToDoForm}