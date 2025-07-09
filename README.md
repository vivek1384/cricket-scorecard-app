# Cricket

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server and json-server make sure your have split terminal in your IDE, run:

```bash
ng serve
npm i -g json-server
json-server --watch db.json --port 3001
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Must things :

# 🏏 Cricket Scorecard Dashboard App

A real-time cricket scoring and commentary dashboard built with **Angular** and **JSON Server**. This app allows match admins to score a live match, manage players and dismissals, generate automatic commentary, and track current partnerships — all in an intuitive web interface.

---

## 🚀 Features

- **Match Setup**
  - Start a new match and initialize fresh teams
  - Select striker, non-striker, and bowler before each innings

- **Ball-by-Ball Scoring**
  - Update scores via buttons (0, 1, 2, 3, 4, 6, OUT)
  - All stats and commentary update live

- **Dismissal Management**
  - Set how the batsman got out: bowled, caught (with fielder), run-out (striker or non-striker), etc.

- **Auto Commentary**
  - Automatically generates ball-by-ball commentary for every delivery

- **Innings Transition**
  - After the first innings, an alert guides the admin to switch batsmen and bowlers from the other team

- **Score Insights**
  - 🧠 First Innings: Predicts final score based on current run rate
  - 🎯 Second Innings: Shows required run rate to chase the target

- **Partnership Tracker**
  - Displays current runs scored by the batting pair

---

## 🛠 Tech Stack

- **Frontend**: Angular 16+
- **Backend (Mock API)**: JSON Server
- **State Handling**: In-memory and JSON-based

---

## ⚠ Important Note

To start a **new match**, you must clear the previous match's player stats from `db.json`. This ensures each match begins with fresh data.
And if batsman select option not appear there after selecting teams to set new match kindaly reload your web page.

```bash
# Optional: Reset db.json to blank/default state
```

## Here is so many bugs (like in partnership, required RR and etc.) also which you have to find out and grab the opportunity to contribute in open source.
