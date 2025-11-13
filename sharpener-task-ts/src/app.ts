interface Task {
    id: string,
    name: string,
    dueDate: string,
    completed: boolean
}

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskNameInput = document.getElementById('task-name') as HTMLInputElement;
const taskDateInput = document.getElementById('task-date') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLDListElement;

let tasks: Task[] = loadTasks();

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
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

function addTask(name: string, dueDate: string) {
    const newTask: Task = {
        id: crypto.randomUUID(),
        name,
        dueDate,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function toggleTask(id: string) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}


function deleteTask(id: string) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}


taskForm.onsubmit = (e: Event) => {
    e.preventDefault();
    const name = taskNameInput.value.trim();
    const dueDate = taskDateInput.value.trim();
    if (name && dueDate) {
        addTask(name, dueDate);
        taskForm.reset();
    }
};
renderTasks();