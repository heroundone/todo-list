import {todo} from './classes.js';
import {todos} from './modules.js';


function createToDo(description, deadline, priority, key) {
    let newToDo = new todo(description, deadline, priority, key);
    todos.todoArray.push(newToDo);
    console.log(todos.todoArray);
    console.log(newToDo);
    return newToDo;
}

export {createToDo};