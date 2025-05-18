# Expense Tracker CLI

Sample solution for the [Expense Tracker](https://roadmap.sh/projects/expense-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

A command-line interface tool for tracking personal expenses.

## Installation

```bash
npm install -g expense-tracker
```

For local development:

```bash
# Clone the repository
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Create a global symlink
npm link

# Now you can run the CLI globally
expense-tracker --help
```

## Usage

The expense tracker supports the following commands:

### Add an Expense

```bash
expense-tracker add --description "Lunch" --amount 20
```

### List All Expenses

```bash
expense-tracker list
```

### Get Expense Summary

View all expenses:

```bash
expense-tracker summary
```

Filter by month (1-12):

```bash
expense-tracker summary --month 5
```

### Update an Expense

```bash
expense-tracker update --id 1 --description "Dinner" --amount 25
```

### Delete an Expense

```bash
expense-tracker delete --id 1
```

## Command Options

- `add`: Add a new expense

  - `--description`: Description of the expense
  - `--amount`: Amount of the expense (must be positive)

- `list`: Display all expenses in a table format

- `summary`: Get expense statistics

  - `--month`: Optional - Filter by month (1-12)

- `update`: Modify an existing expense

  - `--id`: ID of the expense to update
  - `--description`: New description (optional)
  - `--amount`: New amount (optional)

- `delete`: Remove an expense
  - `--id`: ID of the expense to delete

## Data Storage

Expenses are stored locally in a `data.json` file in JSON format.

## Requirements

- Node.js >= 18
- npm or pnpm package manager

## License

ISC
