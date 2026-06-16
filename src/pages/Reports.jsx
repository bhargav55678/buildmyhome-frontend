import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import API from "../services/api";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>📄 Reports</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "700px",
          marginTop: "20px",
        }}
      >
        <h2>BuildMyHome Summary</h2>

        <p>📁 Projects: {projectCount}</p>
        <p>🧱 Materials: {materialCount}</p>
        <p>👷 Providers: {providerCount}</p>
        <p>📸 Images: {imageCount}</p>

        <button
          onClick={generatePDF}
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default Reports;