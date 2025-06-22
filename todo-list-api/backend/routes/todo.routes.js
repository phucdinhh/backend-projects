import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();
router.use(protect);

router.route("/").post(createTodo).get(getTodos);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;
