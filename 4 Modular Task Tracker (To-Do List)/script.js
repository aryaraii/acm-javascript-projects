/*
    ALGORITHM: To-Do List

    1.  SETUP:
        - Get the text input element for new tasks.
        - Get the "Add Task" button element.
        - Get the `<ul>` element where tasks will be displayed.

    2.  EVENT LISTENER:
        - Add a 'click' event listener to the "Add Task" button.

    3.  ADD TASK LOGIC (inside the button's click event handler):
        - Get the text from the input field and remove any leading/trailing whitespace.
        - If the text is empty, stop the function.
        - If the text is not empty:
            - Create a new list item (`<li>`) element.
            - Set the text of the `<li>` to the task text.
            - Create a new button element for deleting the task. Set its text to 'Remove'.
            - Add a 'click' event listener to this new 'Remove' button. When clicked, it should find its parent `<li>` and remove it from the list (`<ul>`).
            - Append the 'Remove' button inside the `<li>`.
            - Append the new `<li>` to the task list (`<ul>`).
            - Clear the text in the input field.
*/

// Task Tracker

const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        taskElement.innerHTML = `
            <div class="task-info">
                <p class="task-name">${task.name}</p>
                <p class="task-date">Due: ${task.date || "No due date"}</p>
            </div>

            <button class="delete-button" onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(taskElement);
    });
}

function addTask() {
    const name = taskInput.value.trim();

    if (name === "") {
        return;
    }

    const task = {
        name: name,
        date: dueDate.value
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    dueDate.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

addButton.addEventListener("click", addTask);

displayTasks();