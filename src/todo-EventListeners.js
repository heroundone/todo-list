import {getKey} from './DOM-manipulation.js';
import {createToDo} from './createToDos.js';
import {createToDoForm, addToProject, removeToDoForm} from './DOM-manipulation.js';
import {addToDoToLocalStorage} from './local-storage.js';
let hash = require('hash.js');

// triggers when submit button within 'add new to-do' form is clicked
function addToDoEventListener(submitButton) {
    // get submit button
    submitButton.addEventListener('click', (e) => {
        let key = e.target.parentElement.parentElement.parentElement.getAttribute('data-key');

        let description = document.querySelector(`[data-key=${key}] .description`).value;
        if (!(checkTextContent(description))) {
            return;
        };

        let deadline = document.querySelector(`[data-key=${key}] .deadline`).value;
        if (!(checkTextContent(deadline))) {
            return;
        };
        if (!(checkDeadline(deadline))) {
            alert('Please make sure your date entry matches the expected formatting.')
            return;
        }
        
        let priority = document.querySelector(`[data-key=${key}] .priority`).value;
        if (!(checkTextContent(priority))) {
            return;
        };

        // create a unique id for each todo, hashCode will be used for the identifier
        let hashCode = hash.sha256().update(description + deadline + priority).digest('hex');
        let hashSplit = hashCode.split('');
        let trueValue = parseInt(hashSplit[0]);

        // if the int is not between 0 and 9 inclusive, then the int corresponds to a letter
        if(0 <= trueValue <=9) {
            hashSplit.shift();
            hashSplit.unshift('a');
            hashCode = hashSplit.join('');
        };

        // create a new todo object, add it to the project to be displayed, delete the form
        let newToDo = createToDo(description, deadline, priority, key, hashCode);
        removeToDoForm(key);
        addToProject(newToDo);
        addToDoToLocalStorage();
    });
};

// when button is clicked removeToDoForm is called
function cancelToDoForm(cancelFormButton) {
    cancelFormButton.addEventListener('click', (e) => {
        let key = e.target.parentElement.parentElement.parentElement.getAttribute('data-key');
        removeToDoForm(key);
    })
}

// triggered when 'add new to-do' button is clicked
function todoFormEventListener(todoButton) {
    todoButton.addEventListener('click', (e) => {
        // first check if the form is already displayed, if so do not add another form to it
        let key = getKey(e);
        let form = document.querySelector(`[data-key=${key}] .form`);
        if(form.firstChild != null) {
            return;
        }

        // if it is not displayed already go ahead and display the form
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

export {addToDoEventListener, todoFormEventListener, checkTextContent, checkDeadline, cancelToDoForm}