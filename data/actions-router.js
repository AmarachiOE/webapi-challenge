const express = require("express");
const actions = require("./helpers/actionModel.js");

const actionsRouter = express.Router();

/*

get,
insert,
update,
remove,

Post request needs middleware to checkout for character count (<= 128 characters)

*/

// url begins with /api/actions

// CUSTOM MIDDLEWARE ==============
function charCheck(req, res, next) {
  const description = req.body.description;
  if (description.length <= 128) {
    next();
  } else {
    res
      .status(401)
      .send("Your description should not exceed more than 128 characters.");
  }
}

// GET ALL ACTIONS =================
actionsRouter.get("/", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

// POST  =================
actionsRouter.post("/", charCheck, (req, res) => {
  const actionInfo = req.body;
  if (
    !actionInfo ||
    !actionInfo.project_id ||
    !actionInfo.description ||
    !actionInfo.notes
  ) {
    res.status(400).json({
      error:
        "You must include an action with the required fields: project_id, description, notes."
    });
  } else {
    actions
      .insert(actionInfo)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the action to the database"
        });
      });
  }
});

// PUT  =================
actionsRouter.put("/:id", charCheck, (req, res) => {
  const actionInfo = req.body;
  const actionId = req.params.id;
  if (
    !actionInfo ||
    !actionInfo.project_id ||
    !actionInfo.description ||
    !actionInfo.notes
  ) {
    res.status(400).json({
      error:
        "You must include an action with the required fields: project_id, description, notes."
    });
  } else {
    actions
      .update(actionId, actionInfo)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res
            .status(400)
            .json({
              error: "The action with the specified ID does not exist."
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "This action's information could not be modified." });
      });
  }
});

// DELETE  =================
actionsRouter.delete("/:id", (req, res) => {
  const actionId = req.params.id;
  actions
    .remove(actionId)
    .then(action => {
      if (action) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ error: "The action with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The action could not be removed"
      });
    });
});

module.exports = actionsRouter;
