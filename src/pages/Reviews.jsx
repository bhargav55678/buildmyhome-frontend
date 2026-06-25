import { useState, useEffect } from "react";
import API from "../services/api";
import "./Reviews.css";

function Reviews() {
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProviders = async () => {
    try {
      const res = await API.get("/providers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProviders(res.data);

      if (res.data.length > 0) {
        setProviderId(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async (id) => {
    try {
      if (!id) return;

      const res = await API.get(`/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (providerId) {
      fetchReviews(providerId);
    }
  }, [providerId]);

  const addReview = async () => {
    try {
      await API.post(
        "/reviews",
        {
          providerId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added Successfully");

      setRating("");
      setComment("");

      fetchReviews(providerId);
    } catch (error) {
      console.log(error);
      alert("Failed To Add Review");
    }
  };

 return (
  <div className="reviews-page">

    <div className="reviews-header">
      <h1>⭐ Reviews & Ratings</h1>

      <p>
        Rate Service Providers &
        <span> Share Your Experience</span>
      </p>
    </div>

    <div className="review-form">

      <h2>Add Review</h2>

      <select
        value={providerId}
        onChange={(e) => setProviderId(e.target.value)}
      >
        {providers.map((provider) => (
          <option
            key={provider._id}
            value={provider._id}
          >
            {provider.name} - {provider.profession}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="add-btn"
        onClick={addReview}
      >
        + Add Review
      </button>

    </div>

    <div className="stats">

      <div className="stat-card">
        <h3>⭐ Total Reviews</h3>
        <h2>{reviews.length}</h2>
      </div>

      <div className="stat-card">
        <h3>👷 Providers</h3>
        <h2>{providers.length}</h2>
      </div>

      <div className="stat-card">
        <h3>🌟 Average Rating</h3>

        <h2>
          {reviews.length
            ? (
                reviews.reduce(
                  (sum, r) => sum + Number(r.rating),
                  0
                ) / reviews.length
              ).toFixed(1)
            : "0.0"}
        </h2>

      </div>

    </div>

    <h2 style={{ marginBottom: "20px" }}>
      📋 Reviews
    </h2>

    {reviews.length === 0 ? (

      <div className="review-card">
        No Reviews Yet
      </div>

    ) : (

      reviews.map((review) => (

        <div
          key={review._id}
          className="review-card"
        >

          <h3>
            ⭐ {review.rating}/5
          </h3>

          <p>
            {review.comment}
          </p>

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

export default Reviews;