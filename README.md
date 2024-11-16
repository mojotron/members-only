# Members Only

Build an exclusive clubhouse where members can write anonymous messages. Inside the clubhouse, members can see who the author of a message is, but outside they can only see the story and wonder who wrote it.

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/nodejs-mini-message-board) curriculum.

Goal of this project is practice building express apps, adding authentication and using typescript as additional learning layer.

Project (Live Preview)[]

## Technologies used

- Node.js
- Typescript
- Express
- Ejs template
- Tailwind CSS
- PostgreSQL database
- Auth with passport, passport-local, express-session, express-validation, bcrypt

## Screenshots

### Homepage

![Home page.](/src/public/screenshots/screenshot-home.png "This is a sample image.")

### Dashboard

![Dashboard page.](/src/public/screenshots/screenshot-dashboard.png "This is a sample image.")

### Register user

![Register user page.](/src/public/screenshots/screenshot-signup-form.png "This is a sample image.")

### Message Details

![Activate member code.](/src/public/screenshots/screenshot-message.png "This is a sample image.")

### Confirm box

![Activate member code.](/src/public/screenshots/screenshot-confirm-box.png "This is a sample image.")

## Installing and starting project

1. Clone or fork this repo
2. cd into the members-only directory (where this README is located).
3. Create .env file and add

- POSTGRESQL_URI variable with your postgresql connection link,
- PORT to 5000,
- SECRET hash string for cookie secret,
- MEMBERSHIP_QUESTION simple question for asking user for membership status
- MEMBERSHIP_ANSWER answer to membership question, if user answer correctly they become members

4. run populate.js script with npm run db:populate
5. run project with npm run dev
6. visit http://localhost:5000 and have fun
