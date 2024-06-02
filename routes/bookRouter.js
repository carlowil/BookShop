const express = require("express");
const bookController = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.get("/:bookId", bookController.getBook);
bookRouter.get("/", bookController.getBooks);
bookRouter.put("/chg/:id", bookController.chgBook);
bookRouter.delete("/del/:id", bookController.delBook);
bookRouter.post("/add", bookController.addBook);

module.exports = bookRouter;