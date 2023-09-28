import express from "express";
import userController from "../controller/userController";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello World!");
});
router.get("/users", userController.getAllUsers);
router.post("/users", userController.postCreateUser);
router.delete("/users", userController.deleteUser);
router.put("/users", userController.putUpdateUser);
router.post("/login", userController.postLogin);

export default router;
