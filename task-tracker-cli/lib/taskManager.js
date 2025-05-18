import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { TASK_STATUS } from "../constants.js";
const __dirname = import.meta.dirname;

const filePath = join(__dirname, "tasks.json");

// Function to load tasks from the JSON file
function loadTasks() {
  if (!existsSync(filePath)) {
    return [];
  }
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function displayTasks(tasks) {
  tasks.forEach((task) => {
    console.log(
      `${task.status} [${task.id}] ${task.description} - Created: ${new Date(
        task.createdAt
      ).toLocaleDateString()} - Updated: ${new Date(
        task.updatedAt
      ).toLocaleDateString()}`
    );
  });
}

// Function to add a new task
function addTask(desc) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    description: desc,
    status: TASK_STATUS.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(chalk.green(`Task added: ${desc}`));
}

// Function to list all tasks
function listTasks(status) {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No tasks found."));
    return;
  }

  if (status) {
    const filteredTasks = tasks.filter((task) => task.status === status);
    if (filteredTasks.length === 0) {
      console.log(chalk.yellow(`No tasks found with status: ${status}`));
      return;
    }
    console.log(chalk.blue(`Tasks with status: ${status}`));
    displayTasks(filteredTasks);
    return;
  }

  displayTasks(tasks);
}

// Function to mark a task as in progress
function markTaskAsInProgress(id) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }
  task.status = TASK_STATUS.IN_PROGRESS;
  task.updatedAt = new Date();
  saveTasks(tasks);
  console.log(chalk.green(`Task marked as in progress: ${task.description}`));
}

// Function to mark a task as done
function markTaskAsDone(id) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }
  task.status = TASK_STATUS.DONE;
  task.updatedAt = new Date();
  saveTasks(tasks);
  console.log(chalk.green(`Task marked as done: ${task.description}`));
}

// Function to delete a task
function deleteTask(id) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }
  const deletedTask = tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  console.log(chalk.green(`Task deleted: ${deletedTask[0].title}`));
}

function updateTask(id, desc) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }
  task.description = desc;
  task.updatedAt = new Date();
  saveTasks(tasks);
  console.log(chalk.green(`Task updated: ${task.description}`));
}

// Export the functions for use in other files
export {
  addTask,
  listTasks,
  markTaskAsInProgress,
  markTaskAsDone,
  deleteTask,
  updateTask,
};
