# Task Tracker CLI

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

A command-line interface tool for managing tasks with support for adding, updating, deleting, and tracking task status.

## Features

- Add new tasks
- List all tasks or filter by status
- Update task descriptions
- Mark tasks as in-progress or done
- Delete tasks
- Color-coded output for better visibility

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd task-tracker-cli
pnpm install
```

To install the CLI globally on your system:

```bash
pnpm link --global
```

## Usage

The CLI tool can be invoked using the `task` command followed by various subcommands.

### Available Commands

1. Add a new task:

```bash
task add <description>
```

2. List all tasks:

```bash
task list
```

3. List tasks by status (todo, in_progress, done):

```bash
task list <status>
```

4. Update a task:

```bash
task update <id> <new-description>
```

5. Mark task as in progress:

```bash
task mark-in-progress <id>
```

6. Mark task as done:

```bash
task mark-done <id>
```

7. Delete a task:

```bash
task delete <id>
```

### Examples

```bash
# Add a new task
task add "Complete the documentation"

# List all tasks
task list

# List only completed tasks
task list done

# Mark task as in progress
task mark-in-progress 1

# Update task description
task update 1 "Update the documentation"

# Mark task as done
task mark-done 1

# Delete a task
task delete 1
```

## Dependencies

- [Commander.js](https://github.com/tj/commander.js) - Command-line interface
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling

## License

ISC
