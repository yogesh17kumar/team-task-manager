import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/projects/all",
      {
        headers: { Authorization: token }
      }
    );

    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post(
      "https://team-task-manager-backend-762r.onrender.com/api/projects/create",
      {
        title,
        description,
        deadline,
        members:[]
      },
      {
        headers: { Authorization: token }
      }
    );

    setTitle("");
    setDescription("");
    setDeadline("");

    fetchProjects();
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>

      {/* Sidebar */}
      <div style={{
        width:"220px",
        background:"#111827",
        color:"white",
        padding:"20px"
      }}>
        <h2>Team Manager</h2>

        <p style={{cursor:"pointer"}} onClick={()=>navigate("/dashboard")}>
          Dashboard
        </p>

        <p style={{cursor:"pointer"}} onClick={()=>navigate("/projects")}>
          Projects
        </p>

        <p style={{cursor:"pointer"}} onClick={()=>navigate("/tasks")}>
          Tasks
        </p>
      </div>

      {/* Main */}
      <div style={{
        flex:1,
        padding:"30px",
        background:"#f1f5f9"
      }}>
        <h1>Projects</h1>

        {/* Form */}
        <div style={{
          background:"white",
          padding:"20px",
          borderRadius:"12px",
          marginBottom:"25px"
        }}>
          <h3>Create Project</h3>

          <input
            placeholder="Project Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          /><br /><br />

          <input
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          /><br /><br />

          <input
            type="date"
            value={deadline}
            onChange={(e)=>setDeadline(e.target.value)}
          /><br /><br />

          <button onClick={createProject}>
            Create Project
          </button>
        </div>

        {/* List */}
        {projects.map((item)=>(
          <div key={item._id}
            style={{
              background:"white",
              padding:"15px",
              marginBottom:"15px",
              borderRadius:"10px"
            }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Deadline: {item.deadline}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Projects;