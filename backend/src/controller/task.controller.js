
import { Task } from "../model/task.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// Create a new task
export const createTask = AsyncHandler(async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    status: status || "pending",
    priority, // ✅ Add this line
    createdBy: req.user?._id,
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});



// Get all tasks for the logged-in user
export const getAllTasks = AsyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// Get single task by ID
export const getTaskById = AsyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task));
});

// Update task
export const updateTask = AsyncHandler(async (req, res) => {
  const { title, description, dueDate, status, completed } = req.body;

  const updates = { title, description, dueDate, status };
  if (completed !== undefined) {
    updates.completed = completed;
  }

  // console.log("Updating task:", req.params.id, updates);

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    updates,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found or not authorized" });
  }

  res.status(200).json({
    status: 200,
    data: task,
    message: "Task updated successfully",
  });
});


// Delete task
export const deleteTask = AsyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task, "Task deleted successfully"));
});
