// src/pages/Profile.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();

  /* ==========================================
      User State Definitions
  ========================================== */
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editing, setEditing] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [message, setMessage] = useState("");

  /* ==========================================
      Lifecycle Hook - Load User Data
  ========================================== */
  useEffect(() => {
    const savedUser = {
      fullName: localStorage.getItem("userName") || "Guest User",
      email: localStorage.getItem("userEmail") || "Not Available",
      phone: localStorage.getItem("userPhone") || "",
      address: localStorage.getItem("userAddress") || "",
      city: localStorage.getItem("userCity") || "",
      state: localStorage.getItem("userState") || "",
      pincode: localStorage.getItem("userPincode") || "",
    };
    setUser(savedUser);
  }, []);

  /* ==========================================
      Form Control Event Handlers
  ========================================== */
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("userName", user.fullName);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userPhone", user.phone);
    localStorage.setItem("userAddress", user.address);
    localStorage.setItem("userCity", user.city);
    localStorage.setItem("userState", user.state);
    localStorage.setItem("userPincode", user.pincode);

    window.dispatchEvent(new Event("storage"));
    setEditing(false);
    setMessage("✅ Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>

          {/* ==========================================
              Profile Card Jumbotron Header Banner
          ========================================== */}
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>👤</div>
            <h1 style={styles.title}>My Profile</h1>
            <p style={styles.subtitle}>Manage your personal information and account settings.</p>
          </div>

          {message && <div style={styles.successMessage}>{message}</div>}

          {/* ==========================================
              Editable Form Module Layout Component
          ========================================== */}
          <div style={styles.profileCard}>
            <h2 style={styles.sectionTitle}>Personal Information</h2>

            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              disabled={!editing}
              style={styles.input}
            />

            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
              style={styles.input}
            />

            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
              style={styles.input}
            />

            <label style={styles.label}>Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!editing}
              rows={4}
              style={styles.textarea}
              placeholder="Enter your address"
            />

            <div style={styles.row}>
              <div style={styles.column}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  disabled={!editing}
                  style={styles.input}
                />
              </div>

              <div style={styles.column}>
                <label style={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  value={user.state}
                  onChange={handleChange}
                  disabled={!editing}
                  style={styles.input}
                />
              </div>
            </div>

            <label style={styles.label}>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={user.pincode}
              onChange={handleChange}
              disabled={!editing}
              style={styles.input}
            />

            {/* Form Toggle Control Operation */}
            <div style={styles.buttonGroup}>
              {!editing ? (
                <button style={styles.editButton} onClick={() => setEditing(true)}>
                  ✏ Edit Profile
                </button>
              ) : (
                <button
                  style={{ ...styles.saveButton, background: hoverSave ? "#db2777" : "#ec4899" }}
                  onMouseEnter={() => setHoverSave(true)}
                  onMouseLeave={() => setHoverSave(false)}
                  onClick={handleSave}
                >
                  💾 Save Changes
                </button>
              )}
            </div>
          </div>

          {/* ==========================================
              Account Options Routing Links Panel Card
          ========================================== */}
          <div style={styles.optionsCard}>
            <h2 style={styles.sectionTitle}>Account Settings</h2>
            
            <button style={styles.optionButton} onClick={() => navigate("/my-orders")}>
              📦 My Orders
            </button>
            <button style={styles.optionButton} onClick={() => navigate("/forgot-password")}>
              🔒 Change Password
            </button>
            <button style={styles.optionButton} onClick={() => navigate("/gallery")}>
              ❤️ My Wishlist
            </button>
            <button style={styles.optionButton} onClick={() => navigate("/contact")}>
              📞 Contact Support
            </button>

            <button
              style={{ ...styles.logoutButton, background: hoverLogout ? "#dc2626" : "#ef4444" }}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>

          {/* ==========================================
              Engagement Stats Metric Grid Metrics
          ========================================== */}
          <div style={styles.statsSection}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📦</div>
              <h3 style={styles.statNumber}>12</h3>
              <p style={styles.statLabel}>Orders Placed</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>❤️</div>
              <h3 style={styles.statNumber}>8</h3>
              <p style={styles.statLabel}>Wishlist Items</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🌸</div>
              <h3 style={styles.statNumber}>5</h3>
              <p style={styles.statLabel}>Custom Bouquets</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>⭐</div>
              <h3 style={styles.statNumber}>4.9</h3>
              <p style={styles.statLabel}>Average Rating</p>
            </div>
          </div>

          {/* ==========================================
              Cross-App Quick Routing Portal Actions
          ========================================== */}
          <div style={styles.quickSection}>
            <h2 style={styles.sectionTitle}>Quick Actions</h2>
            <div style={styles.quickGrid}>
              
              <div style={styles.quickCard} onClick={() => navigate("/shopping")}>
                <div style={styles.quickIcon}>🛍️</div>
                <h3 style={styles.quickTitle}>Continue Shopping</h3>
                <p style={styles.quickText}>Explore our newest floral collections and seasonal bouquets.</p>
              </div>

              <div style={styles.quickCard} onClick={() => navigate("/events")}>
                <div style={styles.quickIcon}>🎉</div>
                <h3 style={styles.quickTitle}>Event Booking</h3>
                <p style={styles.quickText}>Plan weddings, birthdays and corporate floral decorations.</p>
              </div>

              <div style={styles.quickCard} onClick={() => navigate("/flowercare")}>
                <div style={styles.quickIcon}>🌿</div>
                <h3 style={styles.quickTitle}>Flower Care</h3>
                <p style={styles.quickText}>Learn how to keep your flowers fresh for longer.</p>
              </div>

              <div style={styles.quickCard} onClick={() => navigate("/contact")}>
                <div style={styles.quickIcon}>📞</div>
                <h3 style={styles.quickTitle}>Need Help?</h3>
                <p style={styles.quickText}>Contact our support team for assistance with your orders.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

/* ==========================================================
    Standalone Styles CSS-in-JS Layout Styling Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  profileHeader: { textAlign: "center", marginBottom: "40px" },
  avatar: { width: "120px", height: "120px", margin: "0 auto 20px", borderRadius: "50%", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", fontSize: "55px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 8px 20px rgba(236,72,153,0.3)" },
  title: { fontSize: "42px", fontWeight: "700", color: "#222", marginBottom: "10px" },
  subtitle: { color: "#666", fontSize: "18px" },
  successMessage: { background: "#dcfce7", color: "#166534", padding: "15px", borderRadius: "12px", marginBottom: "30px", textAlign: "center", fontWeight: "600" },
  profileCard: { background: "#fff", borderRadius: "20px", padding: "35px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", marginBottom: "35px" },
  sectionTitle: { fontSize: "28px", color: "#333", marginBottom: "25px", fontWeight: "700" },
  label: { display: "block", marginBottom: "8px", color: "#444", fontWeight: "600" },
  input: { width: "100%", padding: "14px", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", outline: "none", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "14px", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "10px", resize: "vertical", fontSize: "15px", outline: "none", boxSizing: "border-box" },
  row: { display: "flex", gap: "20px", marginBottom: "5px", flexWrap: "wrap" },
  column: { flex: 1, minWidth: "250px" },
  buttonGroup: { display: "flex", justifyContent: "center", marginTop: "20px" },
  editButton: { background: "#ec4899", color: "#fff", border: "none", padding: "15px 35px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer" },
  saveButton: { color: "#fff", border: "none", padding: "15px 35px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s ease" },
  optionsCard: { background: "#fff", borderRadius: "20px", padding: "35px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", marginBottom: "40px" },
  optionButton: { width: "100%", padding: "16px", marginBottom: "18px", border: "none", borderRadius: "10px", background: "#fdf2f8", color: "#333", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s ease" },
  logoutButton: { width: "100%", padding: "16px", border: "none", color: "#fff", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s ease" },
  statsSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "25px", marginBottom: "50px" },
  statCard: { background: "#fff", padding: "30px", borderRadius: "18px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  statIcon: { fontSize: "42px", marginBottom: "15px" },
  statNumber: { fontSize: "34px", color: "#ec4899", fontWeight: "700", marginBottom: "10px" },
  statLabel: { color: "#666", fontSize: "16px" },
  quickSection: { marginBottom: "40px" },
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "25px" },
  quickCard: { background: "#fff", padding: "30px", borderRadius: "18px", textAlign: "center", cursor: "pointer", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", transition: "0.3s ease" },
  quickIcon: { fontSize: "48px", marginBottom: "15px" },
  quickTitle: { fontSize: "22px", color: "#333", marginBottom: "12px", fontWeight: "700" },
  quickText: { color: "#666", lineHeight: "26px", fontSize: "15px" }
};