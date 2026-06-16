import { useState, useEffect } from "react";
import API from "../services/api";

function Images() {
  const [imageUrl, setImageUrl] = useState("");
  const [projectId, setProjectId] = useState("");

  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);

      if (res.data.length > 0) {
        setProjectId(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchImages();
  }, []);

  const uploadImage = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/images",
        {
          imageUrl,
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Image Uploaded Successfully");

      setImageUrl("");

      fetchImages();
    } catch (error) {
      console.log(error);
      alert("Failed To Upload Image");
    }
  };

  const deleteImage = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Image Deleted Successfully");

      fetchImages();
    } catch (error) {
      console.log(error);
    }
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
      <h1>📸 Project Images</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "700px",
        }}
      >
        <h2>Upload Image</h2>

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={inputStyle}
        >
          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.projectName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={uploadImage}
          style={buttonStyle}
        >
          Upload Image
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>🖼️ Gallery</h2>

        {images.map((image) => (
          <div
            key={image._id}
            style={{
              background: "#1e293b",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            <img
              src={image.imageUrl}
              alt="Project"
              style={{
                width: "300px",
                borderRadius: "10px",
              }}
            />

            <br />

            <button
              onClick={() =>
                deleteImage(image._id)
              }
              style={{
                marginTop: "10px",
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Delete Image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "12px 20px",
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Images;