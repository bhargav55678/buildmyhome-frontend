import { useState, useEffect } from "react";
import API from "../services/api";
import "./admin.css";

function Admin() {
  const [projectCount, setProjectCount] = useState(0);
  const [materialCount, setMaterialCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const projects = await API.get("/projects", {
        headers,
      });

      const materials = await API.get("/materials", {
        headers,
      });

      const providers = await API.get("/providers", {
        headers,
      });

      const images = await API.get("/images", {
        headers,
      });

      setProjectCount(projects.data.length);
      setMaterialCount(materials.data.length);
      setProviderCount(providers.data.length);
      setImageCount(images.data.length);

      setReviewCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    minWidth: "220px",
  };

 return (
  <div className="admin-page">

    <div className="admin-header">
      <h1>⚙️ Admin Dashboard</h1>

      <p>
        Monitor &
        <span> Manage BuildMyHome Platform</span>
      </p>
    </div>

    <div className="admin-grid">

      <div className="admin-card">
        <h3>📁 Projects</h3>
        <h2>{projectCount}</h2>
      </div>

      <div className="admin-card">
        <h3>🧱 Materials</h3>
        <h2>{materialCount}</h2>
      </div>

      <div className="admin-card">
        <h3>👷 Providers</h3>
        <h2>{providerCount}</h2>
      </div>

      <div className="admin-card">
        <h3>⭐ Reviews</h3>
        <h2>{reviewCount}</h2>
      </div>

      <div className="admin-card">
        <h3>📸 Images</h3>
        <h2>{imageCount}</h2>
      </div>

    </div>

    <div className="summary-card">

      <h2>📊 Platform Summary</h2>

      <div className="summary-grid">

        <div className="summary-box">
          <h4>Total Resources</h4>
          <p>
            {projectCount +
              materialCount +
              providerCount +
              reviewCount +
              imageCount}
          </p>
        </div>

        <div className="summary-box">
          <h4>Project Status</h4>
          <p>Active</p>
        </div>

        <div className="summary-box">
          <h4>System Health</h4>
          <p>100%</p>
        </div>

      </div>

    </div>

  </div>
);
}

export default Admin;