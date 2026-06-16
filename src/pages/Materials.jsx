import { useState, useEffect } from "react";
import API from "../services/api";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🧱 Materials Management</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "700px",
          marginTop: "20px",
        }}
      >
        <h2>Add Material</h2>

        <input
          type="text"
          placeholder="Material Name"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={addMaterial}
          style={buttonStyle}
        >
          Add Material
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>💰 Total Material Expense: ₹{totalExpense}</h2>
      </div>

      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="🔍 Search Materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "20px",
          }}
        />

        <h2>📋 Materials List</h2>

        {materials.length === 0 ? (
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
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
                style={{
                  background: "#1e293b",
                  padding: "20px",
                  borderRadius: "12px",
                  marginTop: "15px",
                }}
              >
                <h3>{material.materialName}</h3>

                <p>📦 Quantity: {material.quantity}</p>

                <p>📏 Unit: {material.unit}</p>

                <p>💵 Price: ₹{material.price}</p>

                <p>
                  💰 Total Cost: ₹
                  {material.quantity * material.price}
                </p>

                <button
                  onClick={() =>
                    deleteMaterial(material._id)
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
                  Delete Material
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

export default Materials;