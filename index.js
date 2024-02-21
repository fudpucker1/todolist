// Define global variables
const todoList = [];
const completedList = [];
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-list');
const completedUl = document.getElementById('completed-list');

// Function to add a new to-do item
function addTodoItem(todoText) {
  todoList.push({ text: todoText, completed: false });
  renderTodoList();
}

// Function to move a task to the completed list
function completeTodoItem(index) {
  const completedTodo = todoList.splice(index, 1)[0];
  completedList.push(completedTodo);
  renderTodoList();
}

// Function to render the to-do list
function renderTodoList() {
  // Clear the current lists
  todoUl.innerHTML = '';
  completedUl.innerHTML = '';

  // Render the to-do list
  todoList.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    // If the item is completed, apply a style
    if (todo.completed) {
      li.style.textDecoration = 'line-through';
    } else {
      // Add click event to move the item to the completed list
      li.addEventListener('click', () => {
        todo.completed = true;
        completeTodoItem(index);
      });
    }

    todoUl.appendChild(li);
  });

  // Render the completed list
  completedList.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.style.textDecoration = 'line-through';
    completedUl.appendChild(li);
  });
}

// Event listener for the form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const todoText = input.value.trim();

  // Check if the input is not empty
  if (todoText !== '') {
    addTodoItem(todoText);
    input.value = ''; // Clear the input field
  }
});

// Initial rendering of the todo list
renderTodoList();