import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Parser } from 'json2csv';

const filePath = path.join(os.homedir(), ".expense.json");

const initFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ expenses: [] }, null, 2));
  }
};

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category?: "undefined" | string;
}

const getExpenses = (): Expense[] => {
  initFile();
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data).expenses;
};

const saveExpense = (expenses: Expense[]) => {
  fs.writeFileSync(filePath, JSON.stringify({ expenses }, null, 2));
};

export const addExpense = (
  description: string,
  amount: number,
  category?: string,
) => {
  const expenses = getExpenses();
  const newExpense: Expense = {
    id: expenses.length + 1,
    description,
    amount,
    date: new Date().toISOString(),
    category,
  };
  expenses.push(newExpense);
  saveExpense(expenses);
  console.log(`Added expense: ${description}, Amount: ${amount}`);
};

export const deleteExpense = (id: number) => {
  let expenses = getExpenses();
  expenses = expenses.filter((e) => e.id !== id);
  saveExpense(expenses);
  console.log(`Deleted expense with id: ${id}`);
};

export const updateExpense = (
  id: number,
  description?: string,
  amount?: number,
) => {
  const expenses = getExpenses();
  const expense = expenses.find((e) => {
    e.id === id;
  });
  if (!expense) {
    console.log(`expense with id: ${id} not found`);
    return;
  }
  if (description) expense.description = description;
  if (amount) expense.amount = amount;
  saveExpense(expenses);
  console.log(`updated expense with id: ${id}`);
};

export const viewExpense = (category?: string) => {
  const expenses = getExpenses();
  if (category) {
    const filteredExpenses = expenses.filter((e) => e.category === category);
    console.log(`${category}:`);
    filteredExpenses.forEach(({ id, description, amount, date }) => {
      console.log(
        `ID: ${id}, description: ${description}, Amount: ${amount}, Date: ${date}`,
      );
    });
  } else {
    console.log("Expenses:");
    expenses.forEach(({ id, description, amount, date, category }) => {
      console.log(
        `ID: ${id}, description: ${description}, Amount: ${amount}, Date: ${date}, category: ${category}`,
      );
    });
  }
};

export const viewSummary = (month?: string) => {
  const expenses = getExpenses();
  let filteredExpenses = expenses;
  if (month) {
    filteredExpenses = expenses.filter(
      (e) => new Date(e.date).getMonth() + 1 === parseInt(month),
    );
  }
  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  month
    ? console.log(`Total expense of ${month}: ${total}`)
    : console.log(`Total expense is ${total}`);
};

export const exportExpense = (filename?: string) =>{
  const expenses = getExpenses();
  const fields = ['date', 'description', 'amount', 'category'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(expenses);
  let file = "expenses.csv";
  //if (filename) file = filename.split('.')[1] === `.csv`? filename: filename + '.csv';
  if (filename) file = filename.endsWith('.csv')? filename: `${filename}.csv`;
  fs.writeFileSync(path.join(os.homedir() + '/'+ file), csv);
}
