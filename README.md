## Interview Scheduler
    Interview Scheduler is a single page application that allows users to select from 5 different days of the week
    and 5 different times within a single day (if availabe). The app is able to add, remove and edit appointments. 
    Making use of the React with custom hooks and API calls with axios to update and retrieve data in real time. 
    Jest and cypress are used for integration and end-to-end testing respectively. 


# Features
- Appointments are displayed Monday to Friday, 12 PM to 5 PM and days will be coloured-out if they're empty on appointments
- Displays the number of appointments per day and changes if an appointment is added or removed
- Users can type in their name into the form and select an availabe mentor 
- You can edit the name and interviewer on any existing appointment 
- You can remove any existing appointment

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

![Screenshot of booking interviewer](https://github.com/Njoe00/scheduler/blob/master/docs/Form_page.png?raw=true)
![Screenshot of saved interview](https://github.com/Njoe00/scheduler/blob/master/docs/Saved_page.png?raw=true)
![Screenshot of saving error](https://github.com/Njoe00/scheduler/blob/master/docs/Saving_Error_page.png?raw=true)
![Screenshot of delete confirmation form](https://github.com/Njoe00/scheduler/blob/master/docs/Delete_page.png?raw=true)


## API Server/*Database Setup
1. Fork and Clone Scheduler-API repo [here](https://github.com/lighthouse-labs/scheduler-api)
2. Follow the steps provided by README file
3. Inside your root directory run `npm install`
4. Start the server with `npm start` as well you can see error handling with `npm run error`

# Project Stack
-Front-End: React, Axios, JSX, HTML, SASS, JavaScript
-Back-End: Express, Node.js, PostgreSQL
-Testing: Storybook, WebPack Dev Server, Jest, Testing Library and Cypress

# Dependencies 
-Axios
-Classnames
-Normalize.css
-React
-React-dom
-React-scripts
-Babel/core
-Storybook/addon-actions
-Storybook/addon-backgrounds
-Storybook/addon-links
-Storybook/addons
-Storybook/react
-Testing-library/jest-dom
-Tsting-library/react
-Testing-library/react-hooks
-Babel-loader
-Node-sass
-Prop-types
-React-test-renderer

