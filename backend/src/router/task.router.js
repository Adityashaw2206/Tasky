// import { Router } from "express";
// import { Task } from "../model/task.model.js";
// import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controller/task.controller.js";

// const router = Router();

// router.route("createTask").post(createTask)
// router.route("getTasks").post(getTasks)
// router.route("getTaskById").post(getTaskById)
// router.route("updateTask").post(updateTask)
// router.route("deleteTask").post(deleteTask)


import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controller/task.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // protect all routes

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
