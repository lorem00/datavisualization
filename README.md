# WootCloud UI

## Pre-requisites
- Node v8.9.1+
- npm v5.5.1+

_NOTE: Please use this particular versions to ensure your environment matches the staging/production versions_

## Getting Started

After running `npm install`, you need to change your `restconfig.js` file to start using the correct data server.

On that file you'll find the following lines, just comment the one that you don't plan to use and uncomment the other one

```
// MOCK
const rest = new RestConfig('http://localhost:3000').dev();

// LIVE LOCAL SERVER (this will be the setting for production)
const rest = new RestConfig('').prod();
```

### Running Development mode

- `$ npm run mock`
- `$ npm run dev`

_Mock server will run at port 3000 by default, and devserver will boot up at port 8080_

### Running Production mode

- `$ npm run build`
- `$ npm start`

### Deployment

To run a deployment on the staging server, you must follow these steps:

- Make sure your branch is rebased with the lastest in `master`
- Connect to the bastion server
- From the bastion server, connect to the `api-n02` server
- `$ cd UI`
- `$ git reset HEAD --hard`
- `$ git fetch`
- `$ git checkout <your-branch>`
- `$ npm install`
- Make sure you have the right environment variable set: `$ export NODE_ENV=production`
- `$ npm run build`
- We need to find which is the process that corresponds to the web server: `$ sudo lsof -t -i:8080`
- `$ sudo kill -9 <process-number>`
- Start up the server: `$ sudo nohup npm start &`

### Contributing / Onboarding

You shall:
* Use JIRA for tickets, making them nice and properly described, with a nice title that sums up the task.
* Keep the JIRA board updated at all times, if there is no ticket for the task you're on, create it and prioritize it correctly.
* Use branch's name convention: `<name>/<ticket-number>/<short-description>`.
* Use commit's name convention: `<ticket-number> - <commit-message-longer-than-the-short-description`.
* Create one commit for each ticket you worked on.
* Create a PR with one or more commits, as long as you keep them organized and short.
* Ask for somebody in the team to do a code review and approve your changes.
