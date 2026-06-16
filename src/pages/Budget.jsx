import { useState, useEffect } from "react";
import API from "../services/api";

function Budget() {
 const [totalBudget, setTotalBudget] = useState(0);
const [totalSpent, setTotalSpent] = useState(0);

useEffect(() => {
  fetchBudgetData();
}, []);

const fetchBudgetData = async () => {
  try {
    const token = localStorage.getItem("token");

    const projectRes = await API.get("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const materialRes = await API.get("/materials", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const budgetSum = projectRes.data.reduce(
      (sum, project) => sum + Number(project.budget || 0),
      0
    );

    const spentSum = materialRes.data.reduce(
      (sum, material) =>
        sum +
        Number(material.quantity || 0) *
          Number(material.price || 0),
      0
    );

    setTotalBudget(budgetSum);
    setTotalSpent(spentSum);
  } catch (error) {
    console.log(error);
  }
};

  const remaining = totalBudget - totalSpent;

const usage =
  totalBudget > 0
    ? Math.round((totalSpent / totalBudget) * 100)
    : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>💰 Budget Tracking</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "700px",
          marginTop: "20px",
        }}
      >
<h2>💰 Total Budget: ₹{totalBudget}</h2>

<h2>🧱 Material Expenses: ₹{totalSpent}</h2>

<h2>💵 Remaining Budget: ₹{remaining}</h2>

<h2>📊 Usage: {usage}%</h2>

        <h2>💵 Remaining: ₹{remaining}</h2>

        <h2>📊 Usage: {usage}%</h2>

        <div
          style={{
            width: "100%",
            height: "15px",
            background: "#334155",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              width: `${usage}%`,
              height: "100%",
              background:
                usage >= 80
                  ? "#ef4444"
                  : "#22c55e",
            }}
          ></div>
        </div>
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

export default Budget;