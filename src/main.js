import "../style.css";

// Factory function
function createTodoApp() {
  // Array to store our todos
  let todos = [];
  let nextTodoId = 1;
  let filter = "all"; // Initial filter setting

  function setFilter(newFilter) {
    filter = newFilter
  }

  function addTodo(text) {
    todos = [
      ...todos,
      {
        id: nextTodoId++,
        text,
        completed: false,
      },
    ];
  }

  // assumption todos' text are unique
  function toggleCompleted(text) {
    todos = todos.map((todo) =>
      todo.text === text
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo,
    );
  }

  function getVisibleTodos() {
    // Filter todos based on the current filter setting
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  }

  return {
    addTodo,
    toggleCompleted,
    getVisibleTodos,
    setFilter
  }
}

const todoApp = createTodoApp()

// Function to render the todos based on the current filter
function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = ""; // Clear the current list to avoid duplicates

  const filteredTodos = todoApp.getVisibleTodos();

  // Go through the filtered todos and add them to the DOM
  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.style.textDecoration = "line-through";
    }

    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoEdit);
    todoListElement.appendChild(todoItem);
  });
}

// Function to handle adding a new todo
document.getElementById("new-todo").addEventListener("keydown", (event) => {
  // Check if the pressed key is 'Enter' and the input is not empty
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    const text = event.target.value.trim();
    todoApp.addTodo(text)
    event.target.value = ""; // Clear the input field
    renderTodos(); // Re-render the todos
  }
});

// Function to handle marking a todo as completed
document.getElementById("todo-list").addEventListener("click", (event) => {
  // Check if the clicked element has the class 'todo-text'
  if (event.target.classList.contains("todo-text")) {
    const text = event.target.textContent;
    todoApp.toggleCompleted(text)
    renderTodos(); // Re-render the todos
  }
});

// Function to handle changing the filter
document.getElementById("todo-nav").addEventListener("click", (event) => {
  // Check if the clicked element is an anchor tag ('A')
  if (event.target.tagName === "A") {
    // Extract the filter value from the href attribute
    const hrefValue = event.target.getAttribute("href").slice(2);
    const newFilter = hrefValue === "" ? "all" : hrefValue;
    todoApp.setFilter(newFilter);
    renderTodos(); // Re-render the todos based on the new filter
  }
});

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", renderTodos);
