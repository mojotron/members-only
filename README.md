# Members Only

Build an exclusive clubhouse where members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/nodejs-mini-message-board) curriculum.

Goal of this project is practice building express apps, adding authentication and using typescript as additional learning layer.

Project (Live Preview)[]

## Technologies used

- Node.js
- Express
- Ejs template
- Tailwind CSS
- Mongo DB with Mongoose
- auth with passport, passport-local, express-session, express-validation, bcrypt

## Screenshots

### Homepage

![Home page.](/src/public/screenshots/screenshot-home-page.png 'This is a sample image.')

### Dashboard

![Dashboard page.](/src/public/screenshots/screenshot-dashboard-page.png 'This is a sample image.')

### Register user

![Register user page.](/src/public/screenshots/screenshot-register-page.png 'This is a sample image.')

### Member code activation

![Activate member code.](/src/public/screenshots/screenshot-member-page.png 'This is a sample image.')

## Setting project locally

- setting up MongoDB
- cloning this repo and cd to members-only directory (where this README is located)
- creating .env file
  - PORT
  - MONGO_URI - mongoDB driver connection link
  - SECRET - 256bit string for sessions
  - MEMBER_CODE - simple string for users to find in some story
- start the server (npm run dev), visit http://localhost:8000
- set up member activation code by giving hit to some story you create
