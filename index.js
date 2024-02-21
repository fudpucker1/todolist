const form = document.getElementById('todo-form');
const completedOL = document.getElementById('completed-list');
const btn = document.getElementById("submitBtn");
const todoOl = document.getElementById('to-do-list');
const todoOLListen = document.querySelectorAll("to-do-list li");

/*"read" the text in the to-do list input
    Location of the form
    script on button 
        take text and add to innerHTML of to-do-list 
Make To-Do tasks cross out and move to "Completed Tasks" on click
    if click is on to-do-list <li> item, apply <s></s> to innerHTML of <li>. 
    Delete from to-do-list. 
    move to innerHTML of completed task

    */ 

// Function to add item to to-do list
function addTodoItem() {
    let input = document.getElementById('todo-input');
    let inputValue = input.value
    let newListItem = document.createElement('li');
    let newText = document.createTextNode(`${inputValue}`)
    newListItem.appendChild(newText)
    todoOl.appendChild(newListItem)
    input.value = "";
    saveToDoList()
}

// Function to move item to completed list
function completeTodoItem(event) {
    let clickedListIem = event.target;
    todoOl.removeChild(clickedListIem);
    completedOL.appendChild(clickedListIem);
    saveToDoList()
}

//Delete finished Tasks
function deleteItem(event) {
    let confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete){
        let clickedListIem = event.target;
        completedOL.removeChild(clickedListIem);
        saveToDoList()
    }
}

// Function to save list to local storage
function saveToDoList () {
    const todoList = todoOl.innerHTML;
    localStorage.setItem('todolist', todoList);
    const completeList = completedOL.innerHTML;
    localStorage.setItem('completelist', completeList);
    console.log(todoList);
    console.log(completeList);
}

// Function to load saved list from local storage
function loadToDoList () {
    const previousToDo = localStorage.getItem('todolist')
    const previousComplete = localStorage.getItem('completelist')

    todoOl.innerHTML = previousToDo
    completedOL.innerHTML = previousComplete
} 

// Event listener for submit button
btn.addEventListener("click", addTodoItem);

// Event listener for strike out
todoOl.addEventListener('click', completeTodoItem);

// Event listener for strike out
completedOL.addEventListener('click', deleteItem);

// Load saved todo list
document.addEventListener('DOMContentLoaded', loadToDoList)
