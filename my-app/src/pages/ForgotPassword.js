// src/pages/ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ForgotPassword() {
  /* ==========================================
      States
  ========================================== */
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hoverButton, setHoverButton] = useState(false);

  /* ==========================================
      Submit
  ========================================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    /*
      Backend API will be connected here.
      Example:
      axios.post("/api/auth/forgot-password", { email });
    */

    setSuccessMessage(
      "A password reset link has been sent to your registered email address."
    );
    setEmail("");
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <div style={styles.heroIcon}>🔒</div>
            <h1 style={styles.heroTitle}>Forgot Password</h1>
            <p style={styles.heroSubtitle}>
              Don't worry! Enter your registered email address and we'll send you a password reset link.
            </p>
          </div>

          {/* Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Reset Your Password</h2>
            
            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />

              <button
                type="submit"
                style={{
                  ...styles.button,
                  background: hoverButton ? "#db2777" : "#ec4899",
                }}
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
              >
                Send Reset Link
              </button>
            </form>

            {successMessage && (
              <div style={styles.successBox}>
                {successMessage}
              </div>
            )}

            <div style={styles.bottomText}>
              Remember your password?
              <Link to="/login" style={styles.loginLink}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "60px 20px" },
  container: { maxWidth: "650px", margin: "0 auto" },
  heroSection: { textAlign: "center", marginBottom: "40px" },
  heroIcon: { fontSize: "70px", marginBottom: "15px" },
  heroTitle: { fontSize: "42px", fontWeight: "700", color: "#222", marginBottom: "15px" },
  heroSubtitle: { fontSize: "18px", color: "#666", lineHeight: "30px", maxWidth: "520px", margin: "0 auto" },
  card: { background: "#ffffff", borderRadius: "20px", padding: "40px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  cardTitle: { textAlign: "center", fontSize: "30px", color: "#333", marginBottom: "30px", fontWeight: "700" },
  label: { display: "block", marginBottom: "10px", fontWeight: "600", color: "#444", fontSize: "16px" },
  input: { width: "100%", padding: "15px", border: "1px solid #ddd", borderRadius: "10px", outline: "none", fontSize: "16px", marginBottom: "25px", boxSizing: "border-box" },
  button: { width: "100%", padding: "16px", border: "none", borderRadius: "10px", color: "#fff", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  successBox: { marginTop: "25px", background: "#ecfdf5", border: "1px solid #86efac", color: "#166534", padding: "16px", borderRadius: "10px", textAlign: "center", fontWeight: "600", lineHeight: "26px" },
  bottomText: { marginTop: "30px", textAlign: "center", color: "#666", fontSize: "16px" },
  loginLink: { marginLeft: "8px", color: "#ec4899", fontWeight: "700", textDecoration: "none" },
};