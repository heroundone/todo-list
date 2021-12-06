import {todo} from './classes.js';
import {todos} from './modules.js';


function createToDo(description, deadline, priority, key, identifier) {
    let newToDo = new todo(description, deadline, priority, key, identifier);
    todos.todoArray.push(newToDo);
    return newToDo;
}

export {createToDo};