const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/users", usersController.list);

router.get("/users/:id", usersController.show);

router.post("/users", usersController.create);

router.put("/users/:id", usersController.update);

router.delete("/users/:id", usersController.remove);

module.exports = router;
