const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.post("/add", feedbackController.addFeedback);

module.exports = feedbackRouter;