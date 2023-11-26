const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "user-sessions"
});

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
});

const corsConfig = cors({
    origin: process.env.REACT_APP_FRONTEND_URL,
    credentials: true,
});

const contentConfig = express.json();

const port = process.env.PORT || process.env.BACKEND_PORT;

module.exports = { sessionConfig, corsConfig, contentConfig, port };