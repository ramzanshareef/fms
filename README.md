# Getting Started with Food Management System

## Do this before running the Application

Before runnig this project, please ensure Node.JS is installed in you system and continue with this setup.

In the project root directory and also in the *\backend* folder install all the node modules by running this command in the console
```javascript
npm install
```
or 
```javascript
npm i
```

Before runnig this project, in the project root directory create .env file and add
1. BACKEND_PORT
2. BACKEND_URL
3. FRONTEND_URL
4. SESSION_SECRET
5. MONGO_URL

## Running the Application
In the project directory, you need to run *backend* and *frontend* parts seperately:

### In the *\backend* run -> *`nodemon server.js`*

This starts the server and connects it to the database.\
Displays this on the console and restarts the server everytime a change is detected in the files.
```
Connected Server at port = BACKEND_PORT
Connected to MongoDB
```

### In the root folder run -> *`npm run start`*

Runs the app in the development mode.\
Open [FRONTEND_URL](FRONTEND_URL) to view it in your browser.

The page will reload when you make changes and shows this on the console.
```
You can now view fms in the browser.
  Local:            FRONTEND_URL
  On Your Network:  URL

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```