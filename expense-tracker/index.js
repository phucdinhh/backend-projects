#!/usr/bin/env node

import { program } from "commander";
import { COMMANDS } from "./constants.js";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  listExpenses,
  getSummary,
} from "./programs.js";

program.name("expense-tracker").description("CLI for tracking expenses");

program
  .command(COMMANDS.ADD)
  .description("Add an expense")
  .option("--description <description>", "Description of the expense")
  .option("--amount <amount>", "Amount of the expense")
  .action((options) => {
    try {
      const expense = addExpense(options.description, options.amount);

      console.log(
        `${options.description} added with amount ${options.amount} (ID: ${expense.id})`
      );
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  });

program
  .command(COMMANDS.LIST)
  .description("List all expenses")
  .action(() => {
    const expenses = listExpenses();
    if (expenses.length === 0) {
      console.log("No expenses found.");
    } else {
      console.table(expenses);
    }
  });

program
  .command(COMMANDS.SUMMARY)
  .description("Get a summary of expenses")
  .option("--month <month>", "Month to filter expenses")
  .action((options) => {
    const summary = getSummary(options.month);

    if (summary.count === 0) {
      console.log("No expenses found for the specified month.");
      return;
    }

    console.log(`Total expenses: ${summary.total}`);
    console.log(`Number of expenses: ${summary.count}`);
  });

program
  .command(COMMANDS.DELETE)
  .description("Delete an expense")
  .option("--id <id>", "ID of the expense to delete")
  .action((options) => {
    if (!options.id) {
      console.error("ID is required to delete an expense.");
      return;
    }

    const result = deleteExpense(options.id);
    if (result) {
      console.log(`Expense with ID ${options.id} deleted.`);
    } else {
      console.log(`Expense with ID ${options.id} not found.`);
    }
  });

program
  .command(COMMANDS.UPDATE)
  .description("Update an expense")
  .option("--id <id>", "ID of the expense to update")
  .option("--description <description>", "New description of the expense")
  .option("--amount <amount>", "New amount of the expense")
  .action((options) => {
    if (!options.id) {
      console.error("ID is required to update an expense.");
      return;
    }

    if (!options.description && !options.amount) {
      console.error(
        "At least one of description or amount is required to update an expense."
      );
      return;
    }

    const result = updateExpense(
      options.id,
      options.description,
      options.amount
    );
    if (result) {
      console.log(`Expense with ID ${options.id} updated.`);
    } else {
      console.log(`Expense with ID ${options.id} not found.`);
    }
  });

program.parse(process.argv);
