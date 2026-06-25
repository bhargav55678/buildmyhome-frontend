import { useState, useEffect } from "react";
import API from "../services/api";
import "./Budget.css";

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
  <div className="budget-page">

    <div className="budget-header">
      <h1>💰 Budget Management</h1>
      <p>
        Track Project Expenses &
        <span> Budget Utilization</span>
      </p>
    </div>

    <div className="budget-cards">

      <div className="budget-card">
        <h3>💰 Total Budget</h3>
        <h2>₹{totalBudget.toLocaleString()}</h2>
      </div>

      <div className="budget-card">
        <h3>🧱 Material Expenses</h3>
        <h2>₹{totalSpent.toLocaleString()}</h2>
      </div>

      <div className="budget-card">
        <h3>💵 Remaining Budget</h3>
        <h2>₹{remaining.toLocaleString()}</h2>
      </div>

      <div className="budget-card">
        <h3>📊 Budget Used</h3>
        <h2>{usage}%</h2>
      </div>

    </div>

    <div className="analytics-card">

      <h2>📈 Budget Analytics</h2>

      <div className="progress-info">

        <span>Budget Utilization</span>

        <span>{usage}%</span>

      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${usage}%`,
            background:
              usage >= 80
                ? "#ef4444"
                : "#22c55e",
          }}
        ></div>

      </div>

      <div className="summary">

        <div>
          <h4>Total Budget</h4>
          <p>₹{totalBudget.toLocaleString()}</p>
        </div>

        <div>
          <h4>Total Expenses</h4>
          <p>₹{totalSpent.toLocaleString()}</p>
        </div>

        <div>
          <h4>Remaining</h4>
          <p>₹{remaining.toLocaleString()}</p>
        </div>

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