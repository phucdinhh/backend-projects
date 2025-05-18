import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const __dirname = import.meta.dirname;

const dataFilePath = join(__dirname, "data.json");

const getExpenses = () => {
  if (existsSync(dataFilePath)) {
    const data = readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  }
  return [];
};

const saveExpenses = (expenses) => {
  writeFileSync(dataFilePath, JSON.stringify(expenses, null, 2));
};

const addExpense = (description, amount) => {
  const expenses = getExpenses();

  if (!description || !amount) {
    throw new Error("Description and amount are required.");
  }

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    throw new Error("Amount must be a positive number.");
  }

  const newExpense = {
    id: expenses.length + 1,
    description,
    amount: parseFloat(amount),
    date: new Date().toISOString(),
  };
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
};

const updateExpense = (id, description, amount) => {
  const expenses = getExpenses();
  const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));
  if (expenseIndex !== -1) {
    if (description) {
      expenses[expenseIndex].description = description;
    }
    if (amount) {
      expenses[expenseIndex].amount = parseFloat(amount);
    }
    saveExpenses(expenses);
    return true;
  }
  return false;
};

const deleteExpense = (id) => {
  const expenses = getExpenses();
  const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));
  if (expenseIndex !== -1) {
    expenses.splice(expenseIndex, 1);
    saveExpenses(expenses);
    return true;
  }
  return false;
};

const listExpenses = () => {
  return getExpenses();
};

const getSummary = (month) => {
  const expenses = getExpenses();
  const filteredExpenses = month
    ? expenses.filter(
        (exp) => new Date(exp.date).getMonth() + 1 === parseInt(month)
      )
    : expenses;
  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  return {
    total,
    count: filteredExpenses.length,
  };
};

export { addExpense, updateExpense, deleteExpense, listExpenses, getSummary };
