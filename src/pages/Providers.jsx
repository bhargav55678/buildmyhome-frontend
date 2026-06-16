import { useState, useEffect } from "react";
import API from "../services/api";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>👷 Service Providers</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "700px",
          marginTop: "20px",
        }}
      >
        <h2>Add Provider</h2>

        <input
          type="text"
          placeholder="Provider Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          style={inputStyle}
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
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={addProvider}
          style={buttonStyle}
        >
          Add Provider
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>

        <input
  type="text"
  placeholder="🔍 Search Provider..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={inputStyle}
/>

<select
  value={filterProfession}
  onChange={(e) => setFilterProfession(e.target.value)}
  style={inputStyle}
>
  <option value="All">All Professions</option>
  <option value="Contractor">Contractor</option>
  <option value="Electrician">Electrician</option>
  <option value="Plumber">Plumber</option>
  <option value="Painter">Painter</option>
</select>
        
        
        
        <h2>📋 Providers List</h2>

        {providers.length === 0 ? (
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            No Providers Added
          </div>
        ) : (
         providers
  .filter((provider) => {
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesProfession =
      filterProfession === "All" ||
      provider.profession === filterProfession;

    return matchesSearch && matchesProfession;
  })
  .map((provider) => (
            <div
              key={provider._id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "15px",
              }}
            >
              <h3>{provider.name}</h3>

              <p>👷 {provider.profession}</p>

              <p>⭐ Experience: {provider.experience} Years</p>

              <p>📞 {provider.phone}</p>

              <p>📍 {provider.location}</p>

              <button
                onClick={() =>
                  deleteProvider(provider._id)
                }
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete Provider
              </button>
            </div>
          ))
        )}
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

export default Providers;
