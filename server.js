// Packages
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Routers
const projectsRouter = require("./data/projects-router");
const actionsRouter = require("./data/actions-router");

// Server
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send("Welcome to Web API Sprint Challenge!");
});

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;