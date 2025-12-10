const STORAGE_KEY = "todo-list-vanilla-v1";

let tasks = [];
let currentFilter = 'all';

const taskListEl = document.getElementById('task-list');
const newTaskForm = document.getElementById('new-task-form');
const newTaskInput = document.getElementById('new-task-input');
const taskCountEl = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');


function loadTask(){
    const saved = localStorage.getItem(STORAGE_KEY);
    tasks = saved ? JSON.parse(saved) : [];
}

function saveTasks(){
    localStorage.getItem(STORAGE_KEY, JSON.stringify(tasks));
}

function setTodayDate(){
    const now = new Date();
    const weekday = now.toLocaleDateString("en-US", {weekday: "short"});
    const month = now.toLocaleDateString("en-US", {month: 'short'});
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById(
        'date-display'
    ).textContent = `${weekday} ${month} ${day} ${year}`;
}

function getFilteredTasks(){

    if( currentFilter === 'active'){
        return tasks.filter((t) => !t.completed);
    }
    if ( currentFilter === 'completed'){
        return tasks.filter((t) => t.completed);
    }
    return tasks;
}

function render(){
    taskListEl.innerHTML = "";

    const visibleTasks = getFilteredTasks();

    visibleTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'task' + (task.completed ? " completed" : "");
        li.dataset.id = task.id;

        const checkboxBtn = document.createElement('button');
        checkboxBtn.className = "task-checkbox";
        checkboxBtn.type = "button";
        checkboxBtn.setAttribute(
            "aria-label",
            task.completed ? "Mark as active" : "Mark as completed"
        );

        const inner = document.createElement('span');
        inner.className = "task-checkbox-inner";
        inner.textContent = "✓";
        checkboxBtn.appendChild(inner);

        const text = document.createElement('div');
        text.className = "task-main";
        text.textContent = task.text;

        checkboxBtn.addEventListener("click", () => toggleTask(task.id));

        li.appendChild(checkboxBtn);
        li.appendChild(text);
        taskListEl.appendChild(li);
    });

    taskCountEl.textContent = tasks.length;
}

function renderWithTransition(){
    if( !document.startViewTransition ){
        render();

        return;
    }
    document.startViewTransition(()=> {
        render();
    });
}

function addTask(text){
    const trimmed = text.trim();
    if ( !trimmed) return;
    tasks.push({
        id: Date.now().toString(),
        text: trimmed,
        completed: false,
    });
    saveTasks();
    newTaskInput.value = "";
    renderWithTransition();
}

function toggleTask(id){
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    renderWithTransition();
}

function changeFilter(filter){
    currentFilter = filter;
    filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderWithTransition();
}

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(newTaskInput.value);
});

filterButtons.forEach((btn) => {
    btn,addEventListener("click", () => {
        changeFilter(btn.dataset.filter);
    });
});


setTodayDate();