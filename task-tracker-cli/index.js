#!/usr/bin/env node

import { program } from "commander";
import {
  addTask,
  listTasks,
  markTaskAsInProgress,
  markTaskAsDone,
  deleteTask,
  updateTask,
} from "./lib/taskManager.js";
import { COMMANDS } from "./constants.js";

program.name("task").description("Task management CLI").version("1.0.0");

program
  .command(COMMANDS.ADD)
  .description("Add a new task")
  .argument("<desc>", "Task description")
  .action((desc, options) => {
    addTask(desc, options.due);
  });

program
  .command(COMMANDS.LIST)
  .description("List all tasks")
  .argument("[status]", "Filter tasks by status", "")
  .action((status) => {
    listTasks(status);
  });

program
  .command(COMMANDS.DELETE)
  .description("Delete a task")
  .argument("<id>", "Task ID")
  .action((id) => {
    deleteTask(parseInt(id));
  });

program
  .command(COMMANDS.UPDATE)
  .description("Update a task")
  .argument("<id>", "Task ID")
  .argument("<desc>", "New task description")
  .action((id, desc) => {
    updateTask(parseInt(id), desc);
  });

program
  .command(COMMANDS.MARK_IN_PROGRESS)
  .description("Mark a task as in progress")
  .argument("<id>", "Task ID")
  .action((id) => {
    markTaskAsInProgress(parseInt(id));
  });

program
  .command(COMMANDS.MARK_DONE)
  .description("Mark a task as done")
  .argument("<id>", "Task ID")
  .action((id) => {
    markTaskAsDone(parseInt(id));
  });

program.parse(process.argv);
