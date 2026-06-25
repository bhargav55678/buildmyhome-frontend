import { useState, useEffect } from "react";
import API from "../services/api";
import "./Providers.css";

function Providers() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("Contractor");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
const [filterProfession, setFilterProfession] = useState("All");

  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/providers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProviders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const addProvider = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/providers",
        {
          name,
          profession,
          experience,
          phone,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Provider Added Successfully");

      setName("");
      setProfession("Contractor");
      setExperience("");
      setPhone("");
      setLocation("");

      fetchProviders();
    } catch (error) {
      console.log(error);
      alert("Failed To Add Provider");
    }
  };

  const deleteProvider = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/providers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Provider Deleted Successfully");

      fetchProviders();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Provider");
    }
  };

return (
  <div className="providers-page">

    {/* Header */}
    <div className="providers-header">
      <h1>👷 Service Providers</h1>

      <p>
        Manage Skilled Professionals &
        <span> Construction Teams</span>
      </p>
    </div>

    {/* Add Provider */}

    <div className="provider-form">

      <h2>Add New Provider</h2>

      <div className="form-grid">

        <input
          type="text"
          placeholder="Provider Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        >
          <option>Contractor</option>
          <option>Electrician</option>
          <option>Plumber</option>
          <option>Painter</option>
        </select>

        <input
          type="number"
          placeholder="Experience (Years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

      </div>

      <button
        className="add-btn"
        onClick={addProvider}
      >
        + Add Provider
      </button>

    </div>

    {/* Statistics */}

    <div className="stats">

      <div className="stat-card">
        <h3>👷 Total Providers</h3>
        <h2>{providers.length}</h2>
      </div>

      <div className="stat-card">
        <h3>🏗 Contractors</h3>
        <h2>
          {
            providers.filter(
              (p) => p.profession === "Contractor"
            ).length
          }
        </h2>
      </div>

      <div className="stat-card">
        <h3>⚡ Skilled Workers</h3>
        <h2>
          {
            providers.filter(
              (p) => p.profession !== "Contractor"
            ).length
          }
        </h2>
      </div>

    </div>

    {/* Search */}

    <div className="search-box">

      <input
        type="text"
        placeholder="🔍 Search Provider..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>

    <div
      style={{
        marginBottom: "25px",
      }}
    >

      <select
        value={filterProfession}
        onChange={(e) =>
          setFilterProfession(e.target.value)
        }
      >
        <option value="All">
          All Professions
        </option>

        <option value="Contractor">
          Contractor
        </option>

        <option value="Electrician">
          Electrician
        </option>

        <option value="Plumber">
          Plumber
        </option>

        <option value="Painter">
          Painter
        </option>

      </select>

    </div>

    <h2 style={{ marginBottom: "20px" }}>
      📋 Providers List
    </h2>

    {providers.length === 0 ? (

      <div className="provider-card">

        No Providers Added

      </div>

    ) : (

      providers

        .filter((provider) => {

          const matchesSearch =
            provider.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

          const matchesProfession =
            filterProfession === "All" ||
            provider.profession ===
              filterProfession;

          return (
            matchesSearch &&
            matchesProfession
          );
        })

        .map((provider) => (

          <div
            key={provider._id}
            className="provider-card"
          >

            <h3>{provider.name}</h3>

            <p>
              👷 <strong>Profession:</strong>{" "}
              {provider.profession}
            </p>

            <p>
              ⭐ <strong>Experience:</strong>{" "}
              {provider.experience} Years
            </p>

            <p>
              📞 <strong>Phone:</strong>{" "}
              {provider.phone}
            </p>

            <p>
              📍 <strong>Location:</strong>{" "}
              {provider.location}
            </p>

            <button
              className="delete-btn"
              onClick={() =>
                deleteProvider(provider._id)
              }
            >
              Delete Provider
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

export default Providers;
