// all the functions will be executed inside this DOM
document.addEventListener("DOMContentLoaded", () => {
  const defaultTodos = [
    "Prepare the kitchen",
    "Look for some cool stuff",
    "Code some ReactJS",
    "Drink a cup of coffee",
    "Going for the win",
  ];

  // if todos === null => the todos that will be displayed will be the defaultTodos
  function loadTodos() {
    let todos = localStorage.getItem("todos");
    if (!todos) {
      saveTodos(defaultTodos);
      todos = localStorage.getItem("todos");
    }
    return JSON.parse(todos);
  }

  //set value of todos to be stringified JSON of todos (key: todos, value:json.stringify(todos))
  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // create a new todo element: (its tag is "li", & should have a text)
  function createTodoElement(todoText, index) {
    const li = document.createElement("li");
    li.textContent = todoText;

    // create the Delete button with the event listener "click": (button text : Delete, className of this button: delete)
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => {
      removeTodo(index); // on click it execute the function : removeTodo with index parameter
    });

    // create the Edit button element (same as delete)
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit your task:", todoText); //this time on click, it displays a prompt that will modify the original text
      if (newText) {
        editTodo(newText, index); // through this function (editTodo)
      }
    });

    li.appendChild(deleteButton); //add element delete button (child of "li")
    li.appendChild(editButton); //add element edit button (child of "li")

    return li;
  }

  // keep the ToDo list updated even if page is refreshed:
  function updateTodoListView() {
    const todos = loadTodos(); // load the default Todo list -1st function above-
    const listParentNode = document.querySelector("#listParentNode");
    listParentNode.innerHTML = ""; //the ul with id: listParentNode is empty at 1st
    //then, we add each new "li" (todo) created through the createTodoElement function (respecting the order -index-)
    todos.forEach((todoText, index) => {
      listParentNode.appendChild(createTodoElement(todoText, index));
    });

    listParentNode.appendChild(inputListItem);
  }

  // the input takes a new Todo (value) as todoText & if it's empty, then return nothing (optional: could return a window alert)
  function addTodo() {
    const input = document.querySelector(".input");
    const todoText = input.value.trim();
    if (todoText === "") {
      return window.alert("There's no ToDo to add, please fill something");
    }

    // load the actual list, push the new todo, save it & update the Todo list to display, & reinitialize the input to ""
    const todos = loadTodos();
    todos.push(todoText);
    saveTodos(todos);
    updateTodoListView();
    input.value = "";
  }

  // remove a todo: once loaded, we could remove an element from todos list via splice method then save it & display it updated
  function removeTodo(index) {
    const todos = loadTodos();
    todos.splice(index, 1); // index: the value of actual index to remove, 1: n° of element to remove, here it's 1. splice operate on same array
    saveTodos(todos);
    updateTodoListView();
  }

  // edit the todo text : once loaded, the todos of a certain index (index is bound to the clicked button of todo item)
  function editTodo(newText, index) {
    const todos = loadTodos();
    todos[index] = newText; // receive the new text
    saveTodos(todos); // save
    updateTodoListView(); // display the updated list
  }

  // we use it for the updateTodoListView function
  const inputListItem =
    document.querySelector("#listParentNode").lastElementChild;

  // the event listener "click" to add a new todo item through the button element with id:input-btn
  const addButton = document.querySelector("#input-btn");
  addButton.addEventListener("click", addTodo);
  updateTodoListView();

  const inputZone = document.querySelector(".input");

  // some bonus for a nice display of input text zone (a hover like effect; -mouse over & mouse out-)
  inputZone.addEventListener("mouseover", () => {
    inputZone.style.backgroundColor = "lightblue";
  });
  inputZone.addEventListener("mouseout", () => {
    inputZone.style.backgroundColor = "#f7fbf7";
  });
});
