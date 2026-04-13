# Overview

This project is a task management web application built with React that allows users to create, organize, and track tasks based on their completion status and due dates. The application dynamically updates task lists as users interact with the interface, helping visualize progress and priorities across multiple views.

The application runs locally using the Vite development server.
To start the test server:

- npm install
- npm run dev

Then open:
<http://localhost>

This will load the first page of the application.

The purpose of building this software was to strengthen my understanding of component-based design in React, state management across multiple views, routing between pages, and dynamic rendering of user-generated data.

**Software demo video**[(https://youtu.be/OfDRaPKQXD)]

## Web Pages

### Today Page

Displays tasks scheduled for the current day that are not yet completed. Users can:

- Create new tasks
- Select a priority level (Low, Medium, High)
- Choose a due date
- Mark tasks as completed
- Delete tasks

### Upcoming Page

Displays tasks with future due dates that are not completed. Tasks are grouped by date and shown in chronological order.

This page dynamically:

- Filters future tasks
- Groups tasks by due date
- Highlights high-priority tasks
- Counts tasks by priority level

### Completed Page

Displays tasks that have been marked as finished.

Tasks are:

- Grouped by completion date
- Displayed with a line-through effect
- Removable from the task list

## Development Enviroment

### This application was developed using

- Visual Studio Code
- Node.js
- Vite

### Technologies used

- JavaScript
- React
- Tailwind CSS

## Useful websites

The following resources were helpful during development:

[(https://react.dev)]
[(https://vitejs.dev)]
[(https://tailwindcss.com/docs)]
[(https://developer.mozilla.org)]

## Future Work

- Adding user authentication
- Improving filtering and sorting options
