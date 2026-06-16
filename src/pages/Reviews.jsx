import { useState, useEffect } from "react";
import API from "../services/api";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>⭐ Reviews & Ratings</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "700px",
        }}
      >
        <h2>Add Review</h2>

        <select
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
          style={inputStyle}
        >
          {providers.map((provider) => (
            <option key={provider._id} value={provider._id}>
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
          style={inputStyle}
        />

        <textarea
          placeholder="Write Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <button
          onClick={addReview}
          style={buttonStyle}
        >
          Add Review
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>📋 Reviews</h2>

        {reviews.length === 0 ? (
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            No Reviews Yet
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "15px",
              }}
            >
              <h3>⭐ {review.rating}/5</h3>

              <p>{review.comment}</p>
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

export default Reviews;