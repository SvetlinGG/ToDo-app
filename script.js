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