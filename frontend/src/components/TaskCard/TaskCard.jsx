import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onComplete, onUpdate }) => {
  const now = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && dueDate < now && task.status !== "completed";

  const formattedDueDate = dueDate
    ? dueDate.toLocaleDateString()
    : "No due date";

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-500";
      case "medium":
        return "bg-yellow-50 text-yellow-500";
      case "low":
        return "bg-green-50 text-green-500";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusColor = (status) => {
    return status === "completed"
      ? "bg-green-50 text-green-500"
      : "bg-blue-50 text-blue-500";
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    if (!editedTitle.trim()) return;
    onUpdate({
      ...task,
      title: editedTitle.trim(),
      description: editedDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm mb-4 flex justify-between items-start transition-shadow hover:shadow-md">
      <div className="flex-grow">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-2 border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Task title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full mb-2 border border-gray-300 rounded px-3 py-2 text-sm"
              rows={3}
              placeholder="Task description"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                disabled={!editedTitle.trim()}
                className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3
              className={`text-base font-medium ${
                task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`text-sm mt-1 ${
                task.status === "completed" ? "line-through text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
            <div className="flex gap-2 flex-wrap mt-3 text-sm">
              <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                Priority: {task.priority || "None"}
              </span>
              <span className={`px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                Status: {task.status}
              </span>
              <span
                className={`px-2 py-1 rounded ${
                  isOverdue ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500"
                }`}
              >
                Due: {formattedDueDate}
                {isOverdue && " (Overdue)"}
              </span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="ml-4 space-y-2 flex flex-col">
          {task.status !== "completed" && (
            <button
              className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-sm transition-colors"
              onClick={onComplete}
            >
              Complete
            </button>
          )}
          <button
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm transition-colors"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm transition-colors"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
