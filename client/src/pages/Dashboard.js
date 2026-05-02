import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://team-task-manager-backend-762r.onrender.com/api/dashboard/stats",
        {
          headers: { Authorization: token }
        }
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const card = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "220px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
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

        <p
          style={{cursor:"pointer", color:"red"}}
          onClick={logoutUser}
        >
          Logout
        </p>
      </div>

      {/* Main */}
      <div style={{
        flex:1,
        background:"#f1f5f9",
        padding:"30px"
      }}>
        <h1>Dashboard</h1>

        <div style={{
          display:"flex",
          gap:"20px",
          flexWrap:"wrap",
          marginTop:"25px"
        }}>

          <div style={card}>
            <h3>Total Tasks</h3>
            <h1>{data.totalTasks || 0}</h1>
          </div>

          <div style={card}>
            <h3>Pending</h3>
            <h1>{data.pendingTasks || 0}</h1>
          </div>

          <div style={card}>
            <h3>Progress</h3>
            <h1>{data.inProgressTasks || 0}</h1>
          </div>

          <div style={card}>
            <h3>Completed</h3>
            <h1>{data.completedTasks || 0}</h1>
          </div>

          <div style={card}>
            <h3>Overdue</h3>
            <h1>{data.overdueTasks || 0}</h1>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;