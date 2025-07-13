// Tasks.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/v1/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTasks(res.data?.data || []);
    } catch (err) {
      toast.error("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5500/api/v1/tasks/${id}`,
        { status: "completed" },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Task marked as completed");
      fetchTasks();
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  // ✅ Added this missing function
  const updateTask = async (updatedTask) => {
    try {
      const res = await axios.put(
        `http://localhost:5500/api/v1/tasks/${updatedTask._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Task updated");

      // Update the task in local state
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? res.data.data : task
        )
      );
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  const filteredTasks = tasks
    .filter((task) => {
      const statusMatch = filterStatus === "all" || task.status === filterStatus;
      const priorityMatch =
        filterPriority === "all" ||
        task.priority?.toLowerCase() === filterPriority.toLowerCase();
      return statusMatch && priorityMatch;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      } else if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <select className="border p-2 rounded" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select className="border p-2 rounded" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select className="border p-2 rounded" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.length === 0 ? (
                <p>No tasks to display.</p>
              ) : (
                filteredTasks.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TaskCard
                          task={task}
                          onDelete={() => deleteTask(task._id)}
                          onComplete={() => completeTask(task._id)}
                          onUpdate={updateTask} // ✅ this now works!
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
