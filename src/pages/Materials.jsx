import { useState, useEffect } from "react";
import API from "../services/api";
import "./Materials.css";

function Materials() {
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/materials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMaterials(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const addMaterial = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/materials",
        {
          materialName,
          quantity,
          unit,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Material Added Successfully");

      setMaterialName("");
      setQuantity("");
      setUnit("");
      setPrice("");

      fetchMaterials();
    } catch (error) {
      console.log(error);
      alert("Failed To Add Material");
    }
  };

  const deleteMaterial = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Material Deleted Successfully");

      fetchMaterials();
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpense = materials.reduce(
    (sum, material) =>
      sum +
      Number(material.quantity || 0) *
      Number(material.price || 0),
    0
  );

return (
  <div className="materials-page">

    {/* Header */}
    <div className="materials-header">
      <h1>🧱 Material Management</h1>

      <p>
        Manage Construction Materials &
        <span> Project Expenses</span>
      </p>
    </div>

    {/* Form */}

    <div className="material-form">

      <h2>Add New Material</h2>

      <div className="form-grid">

        <input
          type="text"
          placeholder="Material Name"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

      </div>

      <button
        className="add-btn"
        onClick={addMaterial}
      >
        + Add Material
      </button>

    </div>

    {/* Statistics */}

    <div className="stats">

      <div className="stat-card">
        <h3>📦 Total Materials</h3>
        <h2>{materials.length}</h2>
      </div>

      <div className="stat-card">
        <h3>💰 Total Expense</h3>
        <h2>₹{totalExpense.toLocaleString()}</h2>
      </div>

      <div className="stat-card">
        <h3>📈 Average Price</h3>

        <h2>
          ₹
          {materials.length
            ? Math.round(totalExpense / materials.length).toLocaleString()
            : 0}
        </h2>

      </div>

    </div>

    {/* Search */}

    <div className="search-box">

      <input
        type="text"
        placeholder="🔍 Search Materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>

    <h2 style={{ marginBottom: "20px" }}>
      📋 Materials List
    </h2>

    {materials.length === 0 ? (

      <div className="material-card">
        No Materials Added
      </div>

    ) : (

      materials
        .filter((material) =>
          material.materialName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((material) => (

          <div
            key={material._id}
            className="material-card"
          >

            <h3>{material.materialName}</h3>

            <p>
              📦 <strong>Quantity:</strong>{" "}
              {material.quantity}
            </p>

            <p>
              📏 <strong>Unit:</strong>{" "}
              {material.unit}
            </p>

            <p>
              💵 <strong>Price:</strong> ₹
              {Number(material.price).toLocaleString()}
            </p>

            <p>
              💰 <strong>Total Cost:</strong> ₹
              {(
                Number(material.quantity) *
                Number(material.price)
              ).toLocaleString()}
            </p>

            <button
              className="delete-btn"
              onClick={() =>
                deleteMaterial(material._id)
              }
            >
              Delete Material
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

export default Materials;