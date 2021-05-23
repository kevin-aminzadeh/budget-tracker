# Budget Tracker PWA ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

<p align="center">
  <img src="./assets/demo.gif" alt="Budget Tracker PWA Demo">
</p>
<p align="center">

  <p align="center">
    <br />
    <a href="https://express-budget-tracker-pwa.herokuapp.com/">Live Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#requirements">Requirements</a>
      <ul>
        <li><a href="#user-story">User Story</a></li>
        <li><a href="#business-context">Business Context</a></li>
        <li><a href="#acceptance-criteria">Acceptance Criteria</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#future-improvements">Future Improvements</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br>

## Overview

Budget Tracker allows users to track their budget and spending by recording deposit/withdrawal transactions. Budget Tracker is a PWA and as such, provides offline functionality and can be installed by users. The purpose behind the development of this project was to demonstrate an understanding of `Progressive Web Applications` and the ability to configure `Service Workers`, `Manifests`, `IndexedDB` and local caches in order to achieve PWA functionality.

The application utilizes local caching as well as the IndexedDB web API to achieve its offline functionality if the user loses connection to the server. When connection is reestablished, Budget Tracker syncs locally stored data with the MongoDB database and updates the data presented to the user.

### Technologies Used

The application uses the following packages:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

## Requirements

The following list of requirements were used in the development of this application.

### User Story

```
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling
```

### Business Context

```
Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.
```

### Acceptance Criteria

```
GIVEN a user is on Budget App without an internet connection
WHEN the user inputs a withdrawal or deposit
THEN that will be shown on the page, and added to their transaction history when their connection is back online.
```

## Getting Started

To get a local copy of this project up and running follow these simple steps.

### Prerequisites

First you must install [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/get-npm) if you haven't done so already. Once this is done, follow the installation instructions below to run the application locally.

### Installation

1. Clone the repository.
   ```sh
   git clone https://github.com/kevin-aminzadeh/budget-tracker
   ```
2. Navigate to the repository directory and run the following command to install the necessary NPM packages.
   ```sh
   npm install
   ```
3. Run the app start script.
   ```sh
   npm start
   ```

## Future Improvements

Due to the relative simplicity of this project, there are plenty of available avenues for improvement.

Some noteworthy improvements which could be made include:

- Implementing user authentication/authorization to allow true usability. (Currently all data is available at a global level)
- Improving the application UI in order to provide a richer UX and increase user retention.
- Expanding the application's functionalities to aid usability and user retention.

## License

This project is licensed under the terms of the [MIT license](https://opensource.org/licenses/MIT).
