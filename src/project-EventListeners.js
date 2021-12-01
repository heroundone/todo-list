import {checkTextContent, checkDeadline} from './todo-EventListeners.js';


// upon clicking the 'add a project' button, a form is generated below the title of the page
function addProjectEventListener() {
    const addProjectButton = document.getElementById('addproject');
    addProjectButton.addEventListener('click', () => {
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
        
        
        form.append(title, deadline, submitButton);
        
        // get the element that contains the header of the page
        let appName = document.getElementById('appName');
        appName.insertAdjacentElement('afterend', form);
        
        // add event listener for submit button
        submitNewProject(title, deadline);
    });
};

function submitNewProject(title, deadline) {
    let submitButton = document.getElementById('submitNewProject');
    console.log(submitButton);
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
        createNewProject(titleText, deadlineText);
    });
};



export {addProjectEventListener}