import {todo} from './classes.js'


function createToDo(description, deadline, priority, key) {
    let newToDo = new todo(description, deadline, priority, key);
    // todos.todoArray.push();
    return newToDo;
}

export {createToDo};