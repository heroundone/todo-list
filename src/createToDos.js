import {todo} from './classes.js';
import {todos} from './modules.js';


function createToDo(description, deadline, priority, key) {
    let newToDo = new todo(description, deadline, priority, key);
    todos.todoArray.push(newToDo);
    return newToDo;
}

export {createToDo};