import {getKey} from './DOM-manipulation.js';
import {createToDo} from './createToDos.js';
import {createToDoForm, displayToDoForm} from './DOM-manipulation.js';

// triggers when submit button within 'add new to-do' form is clicked
function addToDoEventListener(submitButton) {
    // get submit button
    submitButton.addEventListener('click', (e) => {
        let key = e.target.parentElement.parentElement.parentElement.id;
        let description = document.querySelector(`#${key} .description`).value;
        console.log(description);
        if (!(checkTextContent(description))) {
            return;
        };
        let deadline = document.querySelector(`[id=${CSS.escape(key)}] .deadline`).value;
        console.log(deadline);
        if (!(checkTextContent(deadline))) {
            return;
        };
        if (!(checkDeadline(deadline))) {
            alert('Please make sure your date entry matches the expected formatting.')
            return;
        }
        let priority = document.querySelector(`[id=${CSS.escape(key)}] .priority`).value;
        if (!(checkTextContent(priority))) {
            return;
        };

        let newToDo = createToDo(description, deadline, priority, key);
        addToProject(newToDo)
    });
};

// triggered when 'add new to-do' button is clicked
function todoFormEventListener(todoButton) {
    todoButton.addEventListener('click', (e) => {
        createToDoForm(e);
    });
};

// check if user filled in all of the inputs in the form
function checkTextContent(text) {
    if (text === '') {
        alert('Please do not leave any of the form boxes blank');
        return false;
    }
    else {
        return true;
    };

};

function checkDeadline(deadline) {
    const deadlineCharacters = deadline.split('')
    if (deadlineCharacters.length === 10 || deadline.textContent === 'N/A') {
        return true;
    }
    else {
        return false;
    };
};

// a show details/hide details button for displaying and minimizing todos within a project!!!

export {addToDoEventListener, todoFormEventListener, checkTextContent, checkDeadline}