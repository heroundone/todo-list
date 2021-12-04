// two arrays, one for projects one for to-do's
// hash unique key for project upon creation based on title, cannot have duplicate titled projects
// upon clicking on project, filter to-do arrays for to-do's with the specific key value
// when creating DOM elements for projects, id attribute equals key or title,
// thus when adding new to-do get id of parent/sibling and assign it to to-do's key property
let hash = require('hash.js');


  
class project {
    constructor(title, deadline, hashCode) {
        this.title = title;
        this.deadline = deadline;
        this.key = hashCode;
    };
};

class todo {
    constructor(description, deadline, priority, key) {
        this.description = description;
        if(deadline === '') {
            this.deadline = 'n/a';
        }
        else {
            this.deadline = deadline;
        }
        if(priority === '') {
            this.priority = '0';
        }
        else {
            this.priority = priority;
        }
        this.key = key;
    };
};

export {project, todo};