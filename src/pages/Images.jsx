import { useState, useEffect } from "react";
import API from "../services/api";
import "./Images.css";


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
  <div className="images-page">

    <div className="images-header">
      <h1>📸 Project Gallery</h1>

      <p>
        Upload &
        <span> Manage Construction Images</span>
      </p>
    </div>

    <div className="image-form">

      <h2>Upload Project Image</h2>

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
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
        placeholder="Paste Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button
        className="upload-btn"
        onClick={uploadImage}
      >
        + Upload Image
      </button>

    </div>

    <div className="stats">

      <div className="stat-card">
        <h3>🖼 Total Images</h3>
        <h2>{images.length}</h2>
      </div>

      <div className="stat-card">
        <h3>🏗 Projects</h3>
        <h2>{projects.length}</h2>
      </div>

      <div className="stat-card">
        <h3>☁ Gallery Status</h3>
        <h2>Active</h2>
      </div>

    </div>

    <h2 style={{ marginBottom: "25px" }}>
      🖼 Project Gallery
    </h2>

    <div className="gallery-grid">

      {images.length === 0 ? (

        <div className="image-card">

          No Images Uploaded

        </div>

      ) : (

        images.map((image) => (

          <div
            key={image._id}
            className="image-card"
          >

            <img
              src={image.imageUrl}
              alt="Project"
            />

            <button
              className="delete-btn"
              onClick={() =>
                deleteImage(image._id)
              }
            >
              Delete Image
            </button>

          </div>

        ))

      )}

    </div>

  </div>
);
}



export default Images;