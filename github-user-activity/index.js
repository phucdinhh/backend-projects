#!/usr/bin/env node

import https from "https";

const username = process.argv[2];
if (!username) {
  console.error("Please provide a GitHub username.");
  process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

const options = {
  headers: {
    "User-Agent": "Node.js",
    Accept: "application/vnd.github+json",
  },
};

https.get(url, options, (res) => {
  try {
    let data = "";

    if (res.statusCode !== 200) {
      console.error(`Error: ${res.statusCode}`);
      res.resume(); // Consume response data to free up memory
      return;
    }

    // Listen for data chunks
    res.on("data", (chunk) => {
      data += chunk;
    });

    // When the response ends, parse and log the data
    res.on("end", () => {
      try {
        const events = JSON.parse(data);

        if (events.length === 0) {
          console.log(`No events found for user ${username}.`);
          return;
        }

        console.log(`Events for user ${username}:`);
        events.forEach((event) => {
          switch (event.type) {
            case "PushEvent":
              console.log(
                `Push ${event.payload.commits.length} commits to ${event.repo.name}`
              );
              break;
            case "PullRequestEvent":
              console.log("Pull Request Event");
              break;
            case "WatchEvent":
              console.log(`Starred ${event.repo.name}`);
              break;
            case "ForkEvent":
              console.log(`Forked ${event.repo.name}`);
              break;
            case "CreateEvent":
              console.log(
                `Created ${event.payload.ref_type} in ${event.repo.name}`
              );
              break;
            default:
              console.log(
                `${event.type.replace("Event", "")} in ${event.repo.name}`
              );
          }
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
