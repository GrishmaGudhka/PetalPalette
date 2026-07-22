// src/pages/Reviews.js

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Reviews = () => {
  const defaultReviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      message: "Absolutely loved the bouquet! Fresh flowers and beautiful packaging. Highly recommended!",
      likes: 12,
    },
    {
      id: 2,
      name: "Rahul Mehta",
      rating: 4,
      message: "Delivery was on time and the flowers were fresh. Will definitely order again.",
      likes: 8,
    },
    {
      id: 3,
      name: "Sneha Patel",
      rating: 5,
      message: "The custom bouquet was exactly what I wanted. Excellent customer service.",
      likes: 15,
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    message: "",
  });

  /* =====================================
        Lifecycle Hook - Load Reviews
  ===================================== */
  useEffect(() => {
    const saved = localStorage.getItem("petal_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(defaultReviews);
    }
  }, []);

  /* =====================================
        Lifecycle Hook - Save Reviews
  ===================================== */
  useEffect(() => {
    localStorage.setItem("petal_reviews", JSON.stringify(reviews));
  }, [reviews]);

  /* =====================================
        Form Input Handler Controls
  ===================================== */
  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.message) return;

    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: Number(newReview.rating),
      message: newReview.message,
      likes: 0,
    };

    setReviews([review, ...reviews]);
    setSuccess("⭐ Thank you for your review!");

    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setNewReview({
      name: "",
      rating: 5,
      message: "",
    });
  };

  const removeReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const likeReview = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  /* =====================================
        Filtering and Metrics Logic
  ===================================== */
  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(search.toLowerCase()) ||
      review.message.toLowerCase().includes(search.toLowerCase())
  );

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <Header />
      <div style={styles.page}>
        
        {/* =====================================
            Hero Jumbotron Banner
        ===================================== */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>⭐ Customer Reviews</h1>
          <p style={styles.heroSubtitle}>
            Every bouquet tells a story. Read genuine customer experiences and share your own PetalPalette journey.
          </p>
        </section>

        <div style={styles.container}>
          
          {/* =====================================
              Statistics Dashboard Metrics Grid
          ===================================== */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⭐</div>
              <h2 style={styles.statNumber}>{averageRating}</h2>
              <p style={styles.statText}>Average Rating</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>💬</div>
              <h2 style={styles.statNumber}>{reviews.length}</h2>
              <p style={styles.statText}>Total Reviews</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>❤️</div>
              <h2 style={styles.statNumber}>
                {reviews.reduce((sum, review) => sum + review.likes, 0)}
              </h2>
              <p style={styles.statText}>Total Likes</p>
            </div>
          </div>

          {/* =====================================
              Main Segmented Grid Container Layout
          ===================================== */}
          <div style={styles.mainLayout}>
            
            {/* Left Column: Submission Form Section */}
            <div style={styles.formCard}>
              <h2 style={styles.sectionTitle}>✍️ Write a Review</h2>
              {success && <div style={styles.successBox}>{success}</div>}

              <form onSubmit={handleSubmit}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={newReview.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <label style={styles.label}>Rating</label>
                <select name="rating" value={newReview.rating} onChange={handleChange} style={styles.select}>
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>

                <label style={styles.label}>Your Review</label>
                <textarea
                  name="message"
                  rows="7"
                  placeholder="Tell us about your experience..."
                  value={newReview.message}
                  onChange={handleChange}
                  style={styles.textarea}
                  required
                />

                <button type="submit" style={styles.submitButton}>
                  ⭐ Submit Review
                </button>
              </form>

              {/* Informative Writing Tips Component */}
              <div style={styles.tipCard}>
                <h3 style={styles.tipTitle}>💡 Writing Tips</h3>
                <ul style={styles.tipList}>
                  <li>Mention the freshness of the flowers.</li>
                  <li>Share your delivery experience.</li>
                  <li>Describe the bouquet quality.</li>
                  <li>Tell others why you recommend PetalPalette.</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Experience Stream Section */}
            <div style={styles.reviewCardContainer}>
              <h2 style={styles.sectionTitle}>💬 Customer Experiences</h2>
              <input
                type="text"
                placeholder="🔍 Search reviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />

              {filteredReviews.length === 0 ? (
                <div style={styles.emptyCard}>
                  <div style={styles.emptyIcon}>⭐</div>
                  <h3 style={styles.emptyTitle}>No Reviews Found</h3>
                  <p style={styles.emptyText}>
                    No reviews match your search. Try another keyword or be the first to share your experience.
                  </p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} style={styles.reviewCard}>
                    <div style={styles.reviewHeader}>
                      <div>
                        <h3 style={styles.reviewName}>{review.name}</h3>
                        <div style={styles.reviewStars}>{"⭐".repeat(review.rating)}</div>
                      </div>
                      <button style={styles.deleteButton} onClick={() => removeReview(review.id)}>
                        🗑
                      </button>
                    </div>
                    <p style={styles.reviewMessage}>"{review.message}"</p>
                    <div style={styles.reviewFooter}>
                      <button style={styles.likeButton} onClick={() => likeReview(review.id)}>
                        ❤️ Helpful ({review.likes})
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Engagement Branding Callout Card */}
              <div style={styles.thankYouCard}>
                <h2 style={styles.thankTitle}>🌸 Thank You!</h2>
                <p style={styles.thankText}>
                  Your feedback helps us improve every bouquet we create. Every review inspires us to deliver fresher flowers, better service, and happier moments.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reviews;

/* ==========================================================
    Standalone Styles CSS-in-JS Layout Styling Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1300px", margin: "0 auto", padding: "0 20px 70px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "90px 30px", borderRadius: "0 0 35px 35px", marginBottom: "60px" },
  heroTitle: { fontSize: "48px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto", lineHeight: "32px", fontSize: "18px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "25px", marginBottom: "50px" },
  statCard: { background: "#fff", padding: "30px", borderRadius: "20px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  statIcon: { fontSize: "42px", marginBottom: "15px" },
  statNumber: { fontSize: "38px", color: "#ec4899", fontWeight: "700", marginBottom: "10px" },
  statText: { color: "#666", fontSize: "17px" },
  mainLayout: { display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "35px", alignItems: "start" },
  formCard: { background: "#fff", padding: "35px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  reviewCardContainer: { background: "#fff", padding: "35px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  sectionTitle: { fontSize: "28px", color: "#333", marginBottom: "25px", fontWeight: "700" },
  label: { display: "block", marginBottom: "8px", marginTop: "18px", fontWeight: "600", color: "#444" },
  input: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", outline: "none", fontSize: "15px", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", resize: "vertical", outline: "none", fontSize: "15px", boxSizing: "border-box" },
  select: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", outline: "none", background: "#fff", fontSize: "15px", boxSizing: "border-box" },
  submitButton: { width: "100%", marginTop: "30px", padding: "16px", border: "none", borderRadius: "12px", background: "#ec4899", color: "#fff", fontSize: "17px", fontWeight: "700", cursor: "pointer" },
  successBox: { background: "#dcfce7", color: "#166534", padding: "15px", borderRadius: "10px", textAlign: "center", marginBottom: "20px", fontWeight: "600" },
  tipCard: { marginTop: "35px", background: "#fff5f9", borderRadius: "15px", padding: "22px" },
  tipTitle: { color: "#ec4899", fontSize: "20px", marginBottom: "15px", fontWeight: "700" },
  tipList: { margin: 0, paddingLeft: "20px", lineHeight: "30px", color: "#555" },
  searchInput: { width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #ddd", outline: "none", marginBottom: "25px", boxSizing: "border-box", fontSize: "15px" },
  reviewCard: { background: "#fff8fb", padding: "25px", borderRadius: "18px", border: "1px solid #f9d5e5", marginBottom: "20px" },
  reviewHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  reviewName: { fontSize: "22px", color: "#333", fontWeight: "700", margin: 0 },
  reviewStars: { fontSize: "20px", marginTop: "6px" },
  reviewMessage: { color: "#555", lineHeight: "30px", fontStyle: "italic", marginBottom: "20px" },
  reviewFooter: { display: "flex", justifyContent: "flex-end" },
  likeButton: { border: "none", background: "#ec4899", color: "#fff", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  deleteButton: { border: "none", background: "#ef4444", color: "#fff", padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "16px" },
  emptyCard: { textAlign: "center", padding: "60px 20px" },
  emptyIcon: { fontSize: "60px", marginBottom: "15px" },
  emptyTitle: { fontSize: "24px", color: "#333", marginBottom: "15px" },
  emptyText: { color: "#666", lineHeight: "28px", maxWidth: "420px", margin: "0 auto" },
  thankYouCard: { marginTop: "40px", padding: "35px", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", borderRadius: "20px" },
  thankTitle: { fontSize: "32px", fontWeight: "700", marginBottom: "15px" },
  thankText: { fontSize: "17px", lineHeight: "30px", maxWidth: "650px", margin: "0 auto" }
};