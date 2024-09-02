"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportExpense = exports.viewSummary = exports.viewExpense = exports.updateExpense = exports.deleteExpense = exports.addExpense = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const json2csv_1 = require("json2csv");
const filePath = path.join(os.homedir(), ".expense.json");
const initFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ expenses: [] }, null, 2));
    }
};
const getExpenses = () => {
    initFile();
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data).expenses;
};
const saveExpense = (expenses) => {
    fs.writeFileSync(filePath, JSON.stringify({ expenses }, null, 2));
};
const addExpense = (description, amount, category) => {
    const expenses = getExpenses();
    const newExpense = {
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
exports.addExpense = addExpense;
const deleteExpense = (id) => {
    let expenses = getExpenses();
    expenses = expenses.filter((e) => e.id !== id);
    saveExpense(expenses);
    console.log(`Deleted expense with id: ${id}`);
};
exports.deleteExpense = deleteExpense;
const updateExpense = (id, description, amount) => {
    const expenses = getExpenses();
    const expense = expenses.find((e) => {
        e.id === id;
    });
    if (!expense) {
        console.log(`expense with id: ${id} not found`);
        return;
    }
    if (description)
        expense.description = description;
    if (amount)
        expense.amount = amount;
    saveExpense(expenses);
    console.log(`updated expense with id: ${id}`);
};
exports.updateExpense = updateExpense;
const viewExpense = (category) => {
    const expenses = getExpenses();
    if (category) {
        const filteredExpenses = expenses.filter((e) => e.category === category);
        console.log(`${category}:`);
        filteredExpenses.forEach(({ id, description, amount, date }) => {
            console.log(`ID: ${id}, description: ${description}, Amount: ${amount}, Date: ${date}`);
        });
    }
    else {
        console.log("Expenses:");
        expenses.forEach(({ id, description, amount, date, category }) => {
            console.log(`ID: ${id}, description: ${description}, Amount: ${amount}, Date: ${date}, category: ${category}`);
        });
    }
};
exports.viewExpense = viewExpense;
const viewSummary = (month) => {
    const expenses = getExpenses();
    let filteredExpenses = expenses;
    if (month) {
        filteredExpenses = expenses.filter((e) => new Date(e.date).getMonth() + 1 === parseInt(month));
    }
    const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    month
        ? console.log(`Total expense of ${month}: ${total}`)
        : console.log(`Total expense is ${total}`);
};
exports.viewSummary = viewSummary;
const exportExpense = (filename) => {
    const expenses = getExpenses();
    const fields = ['date', 'description', 'amount', 'category'];
    const json2csvParser = new json2csv_1.Parser({ fields });
    const csv = json2csvParser.parse(expenses);
    let file = "expenses.csv";
    //if (filename) file = filename.split('.')[1] === `.csv`? filename: filename + '.csv';
    if (filename)
        file = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    fs.writeFileSync(path.join(os.homedir() + '/' + file), csv);
};
exports.exportExpense = exportExpense;
