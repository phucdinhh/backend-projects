# GitHub Activity CLI

Sample solution for the [github-user-activity](https://roadmap.sh/projects/github-user-activity) challenge from [roadmap.sh](https://roadmap.sh/).

## Description

GitHub Activity CLI is a command-line tool that fetches and displays recent public events for a specified GitHub user. It utilizes the GitHub API to retrieve events such as pushes, pull requests, stars, forks, and more.

## Features

- Fetches and displays the latest public events for a given GitHub username.
- Supports event types like PushEvent, PullRequestEvent, WatchEvent, ForkEvent, and CreateEvent.
- Provides detailed information about the events, including the type and associated repository.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/github-activity.git
   cd github-activity
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Link the CLI tool:
   ```sh
   npm link
   ```

## Usage

To use the GitHub Activity CLI, run the following command in your terminal:

```sh
github-activity <username>
```

Replace `<username>` with the GitHub username whose events you want to fetch.

## Example

```sh
github-activity octocat
```

This command will fetch and display the recent public events for the user `octocat`.

## Error Handling

- If no username is provided, the CLI will prompt with: "Please provide a GitHub username."
- If the GitHub API returns a non-200 status code, an error message will be displayed with the status code.
- If the response data cannot be parsed as JSON, an error message will be displayed.

## License

This project is licensed under the ISC License.
