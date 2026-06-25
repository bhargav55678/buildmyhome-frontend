import { useState, useEffect } from "react";
import API from "../services/api";
import "./Projects.css";

function Projects() {
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/projects",
        {
          projectName,
          location,
          budget,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created Successfully");

      setProjectName("");
      setLocation("");
      setBudget("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Failed To Create Project");
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project Deleted Successfully");

      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Project");
    }
  };

  const updateProgress = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const progress = prompt("Enter Progress (0-100)");
      const stage = prompt(
        "Enter Stage (Planning, Foundation, Structure, Finishing, Completed)"
      );

      if (progress === null || stage === null) return;

      await API.put(
        `/projects/${id}/progress`,
        {
          progress: Number(progress),
          stage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Progress Updated Successfully");

      fetchProjects();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  const editProject = async (project) => {
  try {
    const token = localStorage.getItem("token");

    const projectName = prompt(
      "Project Name",
      project.projectName
    );

    const location = prompt(
      "Location",
      project.location
    );

    const budget = prompt(
      "Budget",
      project.budget
    );

    const description = prompt(
      "Description",
      project.description || ""
    );

    if (!projectName || !location || !budget) return;

    await API.put(
      `/projects/${project._id}`,
      {
        projectName,
        location,
        budget,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Project Updated Successfully");

    fetchProjects();
  } catch (error) {
    console.log(error);
    alert("Failed To Update Project");
  }
};

 return (
  <div className="projects-page">

    {/* Header */}
    <div className="projects-header">
      <h1>🏗️ Project Management</h1>

      <p>
        Create, Track & Manage
        <span> Construction Projects</span>
      </p>
    </div>

    {/* Create Project Form */}
    <div className="project-form">

      <h2>Create New Project</h2>

      <div className="form-grid">

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="text"
          placeholder="Planning"
          readOnly
        />

        <textarea
          className="full-width"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>

      <button
        className="create-btn"
        onClick={createProject}
      >
        + Create Project
      </button>

    </div>

    {/* Search */}
    <div className="search-box">

      <input
        type="text"
        placeholder="🔍 Search Projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>

    <h2 className="projects-title">
      📁 My Projects
    </h2>

        {projects.length === 0 ? (
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            No Projects Yet
          </div>
        ) : (
          projects
  .filter((project) =>
    project.projectName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .map((project) => (
            <div
              key={project._id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "15px",
              }}
            >
              <h3>{project.projectName}</h3>

              <p>📍 {project.location}</p>

              <p>💰 ₹{project.budget}</p>

              <h4 style={{ color: "#60a5fa" }}>
  🏗️ {project.stage}
</h4>

              <div style={{ marginTop: "10px" }}>
  <p>📈 {project.progress}%</p>

  <div
    style={{
      width: "100%",
      height: "12px",
      background: "#334155",
      borderRadius: "20px",
      overflow: "hidden",
      marginTop: "5px",
    }}
  >
    <div
      style={{
        width: `${project.progress}%`,
        height: "100%",
        background:
          project.progress === 100
            ? "#22c55e"
            : "#6366f1",
        transition: "0.5s",
      }}
    ></div>
  </div>
</div>

            

              <button
  onClick={() => editProject(project)}
  style={{
    marginTop: "10px",
    marginRight: "10px",
    padding: "10px 15px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Edit Project
</button>

<button
  onClick={() => deleteProject(project._id)}
  style={{
    marginTop: "10px",
    padding: "10px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Delete Project
</button>

              <button
                onClick={() => updateProgress(project._id)}
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  padding: "10px 15px",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Update Progress
              </button>
            </div>
              ))
        )}
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

export default Projects;