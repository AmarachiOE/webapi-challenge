const express = require("express");
const actions = require("./helpers/actionModel.js");

const actionsRouter = express.Router();

/*

get,
insert,
update,
remove,

*/

// url begins with /api/actions

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
// PUT  =================
// DELETE  =================

module.exports = actionsRouter;
