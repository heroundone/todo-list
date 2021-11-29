import {todo} from './classes.js'


function createToDo() {
    let newToDo = new todo(description, deadline, priority, key);
    return newToDo;
}