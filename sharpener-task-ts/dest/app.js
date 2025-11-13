const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
let tasks = loadTasks();
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? "completed" : '';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);
        const span = document.createElement('span');
        span.textContent = `${task.name} (Due: ${task.dueDate})`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
function addTask(name, dueDate) {
    const newTask = {
        id: crypto.randomUUID(),
        name,
        dueDate,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}
taskForm.onsubmit = (e) => {
    e.preventDefault();
    const name = taskNameInput.value.trim();
    const dueDate = taskDateInput.value.trim();
    if (name && dueDate) {
        addTask(name, dueDate);
        taskForm.reset();
    }
};
renderTasks();
export {};
//# sourceMappingURL=app.js.map