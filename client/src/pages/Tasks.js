import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://team-task-manager-backend-762r.onrender.com/api/tasks/all",
        {
          headers: { Authorization: token }
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://team-task-manager-backend-762r.onrender.com/api/projects/all",
        {
          headers: { Authorization: token }
        }
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://team-task-manager-backend-762r.onrender.com/api/auth/users",
        {
          headers: { Authorization: token }
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        "https://team-task-manager-backend-762r.onrender.com/api/tasks/create",
        {
          title,
          description,
          projectId,
          assignedTo,
          dueDate
        },
        {
          headers: { Authorization: token }
        }
      );

      setTitle("");
      setDescription("");
      setProjectId("");
      setAssignedTo("");
      setDueDate("");

      fetchTasks();

    } catch (error) {
      console.log(error);
      alert("Task create failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://team-task-manager-backend-762r.onrender.com/api/tasks/update/${id}`,
        { status },
        {
          headers: { Authorization: token }
        }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://team-task-manager-backend-762r.onrender.com/api/tasks/delete/${id}`,
        {
          headers: { Authorization: token }
        }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const box = {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  };

  const btn = {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "8px",
    marginTop: "8px"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "230px",
        background: "#0f172a",
        color: "white",
        padding: "25px"
      }}>
        <h2>Team Manager</h2>

        <p
          style={{ cursor: "pointer", marginTop: "25px" }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/projects")}
        >
          Projects
        </p>

        <p
          style={{ cursor: "pointer", color: "#38bdf8" }}
          onClick={() => navigate("/tasks")}
        >
          Tasks
        </p>
      </div>

      {/* Main */}
      <div style={{
        flex: 1,
        background: "#f8fafc",
        padding: "30px"
      }}>

        <h1 style={{ marginBottom: "25px" }}>Task Management</h1>

        {/* Create Form */}
        <div style={{ ...box, marginBottom: "25px" }}>
          <h3>Create New Task</h3>

          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "12px" }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "12px" }}
          />

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "12px" }}
          >
            <option value="">Select Project</option>

            {projects.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "12px" }}
          >
            <option value="">Assign User</option>

            {users.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "12px" }}
          />

          <button
            onClick={createTask}
            style={{
              ...btn,
              background: "#2563eb",
              color: "white",
              marginTop: "15px"
            }}
          >
            Create Task
          </button>
        </div>

        {/* Task List */}
        {tasks.map((item) => (
          <div
            key={item._id}
            style={{
              ...box,
              marginBottom: "18px"
            }}
          >
            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <p>
              <strong>Due Date:</strong> {item.dueDate?.slice(0,10)}
            </p>

            {/* Buttons */}
            <button
              onClick={() => updateStatus(item._id, "Pending")}
              style={{
                ...btn,
                background: "#facc15"
              }}
            >
              Pending
            </button>

            <button
              onClick={() => updateStatus(item._id, "In Progress")}
              style={{
                ...btn,
                background: "#38bdf8"
              }}
            >
              Progress
            </button>

            <button
              onClick={() => updateStatus(item._id, "Completed")}
              style={{
                ...btn,
                background: "#22c55e",
                color: "white"
              }}
            >
              Complete
            </button>

            <button
              onClick={() => deleteTask(item._id)}
              style={{
                ...btn,
                background: "#ef4444",
                color: "white"
              }}
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Tasks;