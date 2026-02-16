let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentUser = localStorage.getItem("user");

if (currentUser) {
    showApp();
}

function login() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("user", username);
        showApp();
    }
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

function showApp() {
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");
    renderTasks();
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() !== "") {
        tasks.push({ text: input.value, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
        renderTasks();
    }
}

function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.textDecoration = task.completed ? "line-through" : "none";
        span.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateDashboard();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function filterTasks(type) {
    renderTasks(type);
}

function updateDashboard() {
    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent =
        tasks.filter(t => t.completed).length;
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}
