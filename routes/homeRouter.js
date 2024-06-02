const express = require("express");
const homeController = require("../controllers/homeController");
const { adminAuth, userAuth } = require("../middleware/auth");
const homeRouter = express.Router();

homeRouter.get("/shop/book/:bookId", userAuth, homeController.book);
homeRouter.get("/shop", userAuth, homeController.shop);
homeRouter.get("/about", userAuth, homeController.about);
homeRouter.get("/profile", userAuth, homeController.profile);
homeRouter.get("/login", homeController.login);
homeRouter.get("/registration", homeController.registration);
homeRouter.get("/admin", adminAuth, homeController.admin);
homeRouter.get("/", userAuth, homeController.index);
homeRouter.get("/logout", homeController.logout);
homeRouter.get("/users", adminAuth, homeController.users);
homeRouter.get("/reviews", adminAuth, homeController.reviews);
homeRouter.get("/add", adminAuth, homeController.add);
homeRouter.get("/feedback", userAuth, homeController.feedback);
homeRouter.get("/admin/book/:id", adminAuth, homeController.red);

module.exports = homeRouter;

