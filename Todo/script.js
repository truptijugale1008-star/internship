const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    const task = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: task,
        date: date,
        time: time,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-details">
                <strong>${task.text}</strong><br>
                <small>📅 ${task.date || "No Date"} | ⏰ ${task.time || "No Time"}</small>
            </div>

            <div class="task-buttons">
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index) {
    const newTask = prompt("Edit Task:", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}