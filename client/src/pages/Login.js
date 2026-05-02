import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "https://team-task-manager-backend-762r.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (error) {
      alert("Invalid Login Details");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)"
    }}>

      <div style={{
        width: "380px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        padding: "35px",
        borderRadius: "20px",
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
      }}>

        <h1 style={{
          textAlign: "center",
          marginBottom: "8px"
        }}>
          Team Task Manager
        </h1>

        <p style={{
          textAlign: "center",
          opacity: "0.8",
          marginBottom: "30px"
        }}>
          Manage projects smartly 
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"15px",
            borderRadius:"10px",
            border:"none",
            outline:"none"
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"20px",
            borderRadius:"10px",
            border:"none",
            outline:"none"
          }}
        />

        <button
          onClick={loginUser}
          style={{
            width:"100%",
            padding:"14px",
            border:"none",
            borderRadius:"10px",
            background:"#22c55e",
            color:"white",
            fontSize:"16px",
            fontWeight:"bold",
            cursor:"pointer"
          }}
        >
          Login Now
        </button>

        <p style={{
          textAlign:"center",
          marginTop:"18px",
          fontSize:"14px",
          opacity:"0.85"
        }}>
          Secure Login • JWT Auth
        </p>

      </div>
    </div>
  );
}

export default Login;