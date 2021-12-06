let hash = require('hash.js');


  
class project {
    constructor(title, deadline, hashCode) {
        this.title = title;
        this.deadline = deadline;
        this.key = hashCode;
    };
};

class todo {
    constructor(description, deadline, priority, key, identifier) {
        this.description = description;
        if(deadline === '') {
            this.deadline = 'n/a';
        }
        else {
            this.deadline = 'deadline:' + ' ' + deadline;
        }
        if(priority === '') {
            this.priority = 'priority: 0';
        }
        else {
            this.priority = 'priority:' + ' ' + priority;
        }
        this.key = key;
        this.identifier = identifier;
    };
};

export {project, todo};