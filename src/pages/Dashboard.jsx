import "./Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const [projectCount, setProjectCount] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [ongoingProjects, setOngoingProjects] = useState(0);
  const [averageProgress, setAverageProgress] = useState(0);
  const [materialCount, setMaterialCount] = useState(0);
const [providerCount, setProviderCount] = useState(0);
const [imageCount, setImageCount] = useState(0);
const [userName, setUserName] = useState("");
const [totalBudget, setTotalBudget] = useState(0);
const [totalExpense, setTotalExpense] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const projects = res.data;
        const materialsRes = await API.get("/materials", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const providersRes = await API.get("/providers", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const imagesRes = await API.get("/images", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

setMaterialCount(materialsRes.data.length);
setProviderCount(providersRes.data.length);
setImageCount(imagesRes.data.length);

const budgetSum = projects.reduce(
  (sum, project) => sum + Number(project.budget || 0),
  0
);

const expenseSum = materialsRes.data.reduce(
  (sum, material) =>
    sum +
    Number(material.quantity || 0) *
      Number(material.price || 0),
  0
);

setTotalBudget(budgetSum);
setTotalExpense(expenseSum);

        setProjectCount(projects.length);

        const completed = projects.filter(
          (project) => project.progress === 100
        ).length;

        setCompletedProjects(completed);

        setOngoingProjects(projects.length - completed);

        const avg =
          projects.length > 0
            ? Math.round(
                projects.reduce(
                  (sum, project) =>
                    sum + (project.progress || 0),
                  0
                ) / projects.length
              )
            : 0;

        setAverageProgress(avg);
      } catch (error) {
        console.log(error);
      }
    };

      const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      setUserName(user.name);
    }

    fetchProjects();
  }, []);

const chartData = {
  labels: ["Budget", "Expenses", "Remaining"],
  datasets: [
    {
      label: "Amount",
      data: [
        totalBudget,
        totalExpense,
        totalBudget - totalExpense,
      ],

      backgroundColor: [
        "#22c55e",
        "#ef4444",
        "#3b82f6",
      ],

      borderColor: [
        "#16a34a",
        "#dc2626",
        "#2563eb",
      ],

      borderWidth: 2,
      borderRadius: 10,
    },
  ],
};

const chartOptions = {
  responsive: true,

  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: "white",
      },
    },

    y: {
      ticks: {
        color: "white",
      },
    },
  },
};

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
       <h2>
  BUILD MY
  <span style={{ color: "#fbbf24" }}>
    {" "}HOME
  </span>
</h2>

        <ul>
          <li>📊 Dashboard</li>

          <li>
            <Link
              to="/projects"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              📁 Projects
            </Link>
          </li>

        <li>
  <Link
    to="/budget"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    💰 Budget
  </Link>
</li>

          <li>
  <Link
    to="/materials"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    🧱 Materials
  </Link>
</li>
          <li>
  <Link
    to="/providers"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    👷 Providers
  </Link>
</li>
          <li>
  <Link
    to="/reviews"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    ⭐ Reviews
  </Link>
</li>

<li>
  <Link
    to="/images"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    📸 Images
  </Link>
</li>


        <li>
  <Link
    to="/admin"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    ⚙️ Admin
  </Link>
</li>

<li>
  <Link
    to="/reports"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    📄 Reports
  </Link>
</li>
        </ul>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
  <h1>🏗️ PROJECT COMMAND CENTER</h1>

  <p>
    Welcome Back, {userName} 👋
  </p>

  <p
    style={{
      marginTop: "10px",
      color: "#fbbf24",
      fontSize: "14px",
      letterSpacing: "2px",
      textTransform: "uppercase",
    }}
  >
    Construction Management Platform
  </p>
</div>

        <div className="cards">
          <div className="card">
            <h2>Total Projects</h2>
            <p>{projectCount}</p>
          </div>

          <div className="card">
            <h2>Completed</h2>
            <p>{completedProjects}</p>
          </div>

          <div className="card">
            <h2>Ongoing</h2>
            <p>{ongoingProjects}</p>
          </div>

          <div className="card">
            <h2>Average Progress</h2>
            <p>{averageProgress}%</p>
          </div>
<div className="card">
  <h2>🧱 Materials</h2>
  <p>{materialCount}</p>
</div>

<div className="card">
  <h2>👷 Providers</h2>
  <p>{providerCount}</p>
</div>

<div className="card">
  <h2>📸 Images</h2>
  <p>{imageCount}</p>
</div>

<div className="card">
  <h2>💰 Total Budget</h2>
  <p>₹{totalBudget}</p>
</div>

<div className="card">
  <h2>💸 Expenses</h2>
  <p>₹{totalExpense}</p>
</div>

<div className="card">
  <h2>💵 Remaining</h2>
  <p>₹{totalBudget - totalExpense}</p>
</div>



</div>

<div className="analytics-section">

  <h2 style={{ marginBottom: "20px" }}>
    📊 Budget Analytics
  </h2>
<div style={{ height: "250px" }}>
  <Bar
    data={chartData}
    options={{
      ...chartOptions,
      maintainAspectRatio: false,
    }}
  />
</div>
</div>
</div>
 </div>
  );
}


export default Dashboard;