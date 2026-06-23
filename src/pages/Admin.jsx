import { useState, useEffect } from "react";
import API from "../services/api";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>⚙️ Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h2>📁 Projects</h2>
          <h1>{projectCount}</h1>
        </div>

        <div style={cardStyle}>
          <h2>🧱 Materials</h2>
          <h1>{materialCount}</h1>
        </div>

        <div style={cardStyle}>
          <h2>👷 Providers</h2>
          <h1>{providerCount}</h1>
        </div>

        <div style={cardStyle}>
          <h2>⭐ Reviews</h2>
          <h1>{reviewCount}</h1>
        </div>

        <div style={cardStyle}>
          <h2>📸 Images</h2>
          <h1>{imageCount}</h1>
        </div>
      </div>
    </div>
  );
}

export default Admin;