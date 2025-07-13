import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("pending");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !priority) {
      toast.error("Title and Priority are required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5500/api/v1/tasks",
        {
          title,
          description,
          dueDate,
          priority, // ✅ Include priority
          status:'pending', // Default status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
          withCredentials: true,
        }
      );

      toast.success("Task added successfully");
      navigate("/home/tasks");
    } catch (error) {
      toast.error("Failed to add task");
      // console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
