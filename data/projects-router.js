const express = require("express");
const projects = require("./helpers/projectModel.js");

const projectsRouter = express.Router();

// get, insert, update, remove, getProjectActions

// url begins with /api/projects

// GET ALL PROJECTS =================
projectsRouter.get("/", (req, res) => {
  projects
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

// GET PROJECT ACTIONS =================
projectsRouter.get("/:id", (req, res) => {
  const projectId = req.params.id;
  projects
    .getProjectActions(projectId)
    .then(project => {
      if (!project || project.length == 0 || project === undefined) {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project's information could not be retrieved." });
    });
});

// POST  =================
projectsRouter.post("/", (req, res) => {
  const projectInfo = req.body;
  if (!projectInfo || !projectInfo.name || !projectInfo.description) {
    res
      .status(400)
      .json({
        error:
          "You must include a project with the required fields: name and description."
      });
  } else {
    projects
      .insert(projectInfo)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the project to the database"
        });
      });
  }
});
// PUT  =================
// DELETE  =================

module.exports = projectsRouter;
