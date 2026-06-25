import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import API from "../services/api";
import "./Reports.css";

function Reports() {
  const [projectCount, setProjectCount] = useState(0);
  const [materialCount, setMaterialCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const projects = await API.get("/projects", { headers });
      const materials = await API.get("/materials", { headers });
      const providers = await API.get("/providers", { headers });
      const images = await API.get("/images", { headers });

      setProjectCount(projects.data.length);
      setMaterialCount(materials.data.length);
      setProviderCount(providers.data.length);
      setImageCount(images.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("BuildMyHome Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Projects: ${projectCount}`, 20, 50);
    doc.text(`Materials: ${materialCount}`, 20, 70);
    doc.text(`Providers: ${providerCount}`, 20, 90);
    doc.text(`Images: ${imageCount}`, 20, 110);

    doc.save("BuildMyHome_Report.pdf");
  };

 return (
  <div className="reports-page">

    <div className="reports-header">
      <h1>📄 Reports Center</h1>

      <p>
        Generate &
        <span> Download Project Reports</span>
      </p>
    </div>

    <div className="report-cards">

      <div className="report-card">
        <h3>📁 Projects</h3>
        <h2>{projectCount}</h2>
      </div>

      <div className="report-card">
        <h3>🧱 Materials</h3>
        <h2>{materialCount}</h2>
      </div>

      <div className="report-card">
        <h3>👷 Providers</h3>
        <h2>{providerCount}</h2>
      </div>

      <div className="report-card">
        <h3>📸 Images</h3>
        <h2>{imageCount}</h2>
      </div>

    </div>

    <div className="report-box">

      <h2>📊 BuildMyHome Summary</h2>

      <div className="report-list">

        <div className="report-item">
          <span>Total Projects</span>
          <strong>{projectCount}</strong>
        </div>

        <div className="report-item">
          <span>Total Materials</span>
          <strong>{materialCount}</strong>
        </div>

        <div className="report-item">
          <span>Total Providers</span>
          <strong>{providerCount}</strong>
        </div>

        <div className="report-item">
          <span>Total Images</span>
          <strong>{imageCount}</strong>
        </div>

      </div>

      <button
        className="download-btn"
        onClick={generatePDF}
      >
        📄 Download PDF Report
      </button>

    </div>

  </div>
);
}

export default Reports;