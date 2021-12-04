let hash = require('hash.js');
import {createProjectHtml, removeProjectForm} from './DOM-manipulation.js';
import {checkTextContent, checkDeadline} from './todo-EventListeners.js';
import {createNewProject} from './createProjects.js';
import {addProjectToLocalStorage} from './local-storage.js';


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



export {addProjectEventListener}