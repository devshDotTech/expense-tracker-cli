# Project Title

Expense Tracker CLI.

## Description

This tool lets you track your todo/tasks in the cli. With this tool you can 
1. Add an expense with a description and amount.
2. Update an expense.
3. Update status of the task.
4. Delete an expense.
5. View a summary of expenses for a specific month.
6. View all expenses.
7. View a summary of all expenses.

## Getting Started

### Dependencies

* You will need terminal, with node.js version 16 and above. 

### Installing and Executing program

* Open the terminal and clone this repo
```
git clone https://github.com/devshDotTech/expense-tracker-cli.git
```
* Go to the cloned folder and run the js file
```
tsc
node dist/index.js <command>
```
Replace the command with 
1. add -d/--description <description> -a/--amount <amount> -c/--category <category>
2. update <id> -d <description> -a <amount>
3. delete <id>
4. view
5. view -c <category>
6. summary
7. summary -m <month(in number)>
8. export
9. export -f <filename>

* (optional) To add to your path
```
npm i -g .
```
* Then simply execute the task-tracker from anywhere
```
expense-tracker view
```

```
#output
id: 1   task: hello earth and world              status: not-done
id: 2   task: hello Asia                         status: done
id: 3   task: hello India                        status: in-progress

```

## Acknowledgments

Inspiration and Solution to.
* [roadmap.sh/task-tracker](https://roadmap.sh/projects/task-tracker)
