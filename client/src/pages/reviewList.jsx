import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ targetId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reviews/${targetId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        setReviews(res.data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [targetId]);

  if (loading) return <p>Loading reviews...</p>;

  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Customer Reviews</h4>
      {reviews.map((rev) => (
        <div
          key={rev._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>{rev.user.name}</strong> — {rev.rating} ⭐
          <p style={{ marginTop: "5px" }}>{rev.comment}</p>
          <small style={{ color: "gray" }}>
            {new Date(rev.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
