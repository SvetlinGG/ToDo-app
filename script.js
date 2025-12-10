const STORAGE_KEY = "todo-list-vanilla-v1";

let tasks = [];
let currentFilter = 'all';

const taskListEl = document.getElementById('task-list');
const newTaskForm = document.getElementById('new-task-form');
const newTaskInput = document.getElementById('new-task-input');
const taskCountEl = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');


