const express = require("express");
const Router = express.Router();
const userController = require("../controllers/userController");

Router.get("/users", userController.getUsers);
Router.get("/users/:id", userController.getDataFromId);
Router.post("/add", userController.addUsers);
Router.delete("/delete/:id", userController.deleteUser);
Router.put("/update/:id", userController.updateUser);

module.exports = Router;
