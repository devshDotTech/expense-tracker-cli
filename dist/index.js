"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const expenseActions_1 = require("./expenseActions");
const program = new commander_1.Command();
program
    .name("expense-tracker")
    .description("CLI to track your expenses")
    .version("1.0.0");
program
    .command("add")
    .description("Add a new expense")
    .option("-d, --description <description>", "Description of the expense")
    .option("-a --amount <amount>", "Amount of the expense")
    .option("-c, --category <category>", "Category of the expense")
    .action((option) => {
    (0, expenseActions_1.addExpense)(option.description, parseInt(option.amount), option.category);
});
program
    .command("update")
    .requiredOption("-i, --id <id>", "Id of the expense to be updated")
    .option("-d, --description <description>", "New description of the expense")
    .option("-a, --amount", "New Amount of the expense")
    .action((option) => {
    (0, expenseActions_1.updateExpense)(parseInt(option.id), option.description, parseInt(option.amount));
});
program
    .command("delete")
    .description("Delete an expense")
    .requiredOption("-i, --id <id>", "Id of the expense to be deleted")
    .action((option) => {
    (0, expenseActions_1.deleteExpense)(parseInt(option.id));
});
program
    .command("view")
    .description("View All expenses")
    .option("-c, --category <category>", "Filter for the category")
    .action((option) => {
    (0, expenseActions_1.viewExpense)(option.category);
});
program
    .command("summary")
    .description("View Expense Summary")
    .option("-m, --month <month>", "Veiw summary for a specific month")
    .action((option) => {
    (0, expenseActions_1.viewSummary)(option.month);
});
program
    .command("export")
    .description("Exports the expenses in a csv file")
    .option("-f, --filename <filename>", "saves the csv file with provided name")
    .action((option) => {
    (0, expenseActions_1.exportExpense)(option.filename);
});
program.parse(process.argv);
