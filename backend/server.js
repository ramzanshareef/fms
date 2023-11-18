const dotenv = require("dotenv").config({path: "../.env"});
const express = require("express");
const { sessionConfig, corsConfig, contentConfig, port } = require("./config/config");
const { connectToMongo } = require("./database/db");
const { allRoutes } = require("./routes/allRoutes");
const { globalErrorHandler } = require("./util/errorHandler");

// Express App and Configurations
const app = express();
app.use(sessionConfig);
app.use(corsConfig);
app.use(contentConfig);

// Routes
app.use(allRoutes());

// Error Handler
app.use(globalErrorHandler);

// Server Connection
app.listen(port, ()=>{
    console.log(`Connected Server at port = ${port}`);
    connectToMongo();
})