import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ targetId, targetType }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  console.log(targetId, targetType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          targetId,
          targetType,
          rating,
          comment,
        },
        { withCredentials: true }
      );
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit review.");
      console.error("Review error:", err);
    }
  };

  if (submitted) {
    return <p style={{ color: "green" }}>✅ Review submitted!</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ marginLeft: "8px", padding: "4px" }}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </label>
      <br />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
        rows={3}
        style={{ width: "100%", marginTop: "8px", padding: "6px" }}
        required
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          marginTop: "8px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ReviewForm;
