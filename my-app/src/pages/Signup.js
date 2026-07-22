// src/pages/Signup.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", form);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.fullName);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        {/* ================= Hero ================= */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>🌸 Join PetalPalette</h1>
          <p style={styles.heroSubtitle}>Create your free account and discover handcrafted floral arrangements, exclusive offers, order tracking, reminder services, and personalized gifting experiences.</p>
        </section>

        <div style={styles.container}>
          {/* ================= Statistics ================= */}
          <section style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <h2 style={styles.statNumber}>5,000+</h2>
              <p style={styles.statText}>Happy Customers</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💐</div>
              <h2 style={styles.statNumber}>500+</h2>
              <p style={styles.statText}>Bouquets Delivered</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🚚</div>
              <h2 style={styles.statNumber}>Same Day</h2>
              <p style={styles.statText}>Delivery Available</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⭐</div>
              <h2 style={styles.statNumber}>4.9</h2>
              <p style={styles.statText}>Customer Rating</p>
            </div>
          </section>

          {/* ================= Signup Form ================= */}
          <section style={styles.formSection}>
            <div style={styles.formCard}>
              <h2 style={styles.formTitle}>Create Your Account</h2>
              <p style={styles.formSubtitle}>Join thousands of happy customers and enjoy seamless flower shopping with PetalPalette.</p>
              {error && <div style={styles.errorBox}>⚠️ {error}</div>}

              <form onSubmit={handleSubmit} style={styles.form}>
                {/* Full Name */}
                <label style={styles.label}>👤 Full Name</label>
                <input type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} style={styles.input} required />

                {/* Email */}
                <label style={styles.label}>📧 Email Address</label>
                <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} style={styles.input} required />

                {/* Phone */}
                <label style={styles.label}>📱 Phone Number</label>
                <input type="tel" name="phone" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} style={styles.input} required />

                {/* Password */}
                <label style={styles.label}>🔒 Password</label>
                <input type="password" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} style={styles.input} required />

                {/* Confirm Password */}
                <label style={styles.label}>🔐 Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} style={styles.input} required />

                {/* Password Tips */}
                <div style={styles.passwordTips}>
                  <h4 style={styles.tipHeading}>Password Suggestions</h4>
                  <ul style={styles.tipList}>
                    <li>Minimum 8 characters</li>
                    <li>Include at least one uppercase letter</li>
                    <li>Include one number</li>
                    <li>Include one special character</li>
                  </ul>
                </div>

                {/* Submit */}
                <button type="submit" style={styles.signupButton}>Create Account</button>
              </form>

              <div style={styles.loginBox}>
                Already have an account?
                <Link to="/login" style={styles.loginLink}>Login Here</Link>
              </div>
            </div>
          </section>

          {/* ================= Why Join PetalPalette ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Join PetalPalette?</h2>
            <p style={styles.sectionSubtitle}>Becoming a PetalPalette member unlocks exclusive benefits that make every flower purchase more delightful.</p>
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🌸</div>
                <h3 style={styles.featureTitle}>Fresh Flowers</h3>
                <p style={styles.featureText}>Every bouquet is handcrafted using premium, farm-fresh flowers selected daily.</p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🚚</div>
                <h3 style={styles.featureTitle}>Fast Delivery</h3>
                <p style={styles.featureText}>Enjoy same-day and scheduled delivery across supported locations.</p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🎁</div>
                <h3 style={styles.featureTitle}>Exclusive Offers</h3>
                <p style={styles.featureText}>Members receive special discounts, festive coupons and early access to seasonal collections.</p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📅</div>
                <h3 style={styles.featureTitle}>Occasion Reminders</h3>
                <p style={styles.featureText}>Never miss birthdays, anniversaries or important celebrations with automatic reminders.</p>
              </div>
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section style={styles.ctaSection}>
            <div style={styles.ctaCard}>
              <h2 style={styles.ctaTitle}>🌷 Start Your Floral Journey Today</h2>
              <p style={styles.ctaText}>Join thousands of happy customers who trust PetalPalette for handcrafted bouquets, thoughtful gifting, and memorable celebrations.</p>
              <button style={styles.ctaButton} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑ Back to Top</button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px 70px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "90px 30px", borderRadius: "0 0 35px 35px", marginBottom: "70px" },
  heroTitle: { fontSize: "52px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto", fontSize: "19px", lineHeight: "34px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "25px", marginBottom: "70px" },
  statCard: { background: "#fff", padding: "35px", borderRadius: "18px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  statIcon: { fontSize: "45px", marginBottom: "15px" },
  statNumber: { fontSize: "38px", color: "#ec4899", fontWeight: "700", marginBottom: "10px" },
  statText: { color: "#666", fontSize: "17px" },
  formSection: { display: "flex", justifyContent: "center", marginBottom: "80px" },
  formCard: { width: "100%", maxWidth: "650px", background: "#fff", borderRadius: "22px", padding: "45px", boxShadow: "0 12px 30px rgba(0,0,0,.08)" },
  formTitle: { textAlign: "center", fontSize: "34px", color: "#222", marginBottom: "10px", fontWeight: "700" },
  formSubtitle: { textAlign: "center", color: "#666", lineHeight: "28px", marginBottom: "35px", fontSize: "16px" },
  errorBox: { background: "#ffe8e8", color: "#c62828", padding: "14px", borderRadius: "10px", border: "1px solid #ef9a9a", marginBottom: "25px", fontWeight: "600", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  label: { fontWeight: "600", color: "#333", fontSize: "15px", marginBottom: "-10px" },
  input: { padding: "15px 18px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "16px", outline: "none", transition: "0.3s", boxSizing: "border-box" },
  passwordTips: { background: "#fff5f8", borderLeft: "4px solid #ec4899", borderRadius: "10px", padding: "18px", marginTop: "5px", marginBottom: "10px" },
  tipHeading: { margin: "0 0 10px", color: "#ec4899", fontSize: "16px", fontWeight: "700" },
  tipList: { margin: 0, paddingLeft: "18px", color: "#666", lineHeight: "28px", fontSize: "15px" },
  signupButton: { marginTop: "10px", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "12px", padding: "16px", fontSize: "18px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  loginBox: { marginTop: "30px", textAlign: "center", color: "#555", fontSize: "16px" },
  loginLink: { color: "#ec4899", marginLeft: "8px", fontWeight: "700", textDecoration: "none" },
  section: { marginBottom: "80px" },
  sectionTitle: { textAlign: "center", fontSize: "38px", fontWeight: "700", color: "#222", marginBottom: "15px" },
  sectionSubtitle: { maxWidth: "760px", margin: "0 auto 45px", textAlign: "center", color: "#666", fontSize: "17px", lineHeight: "30px" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "25px" },
  featureCard: { background: "#fff", borderRadius: "18px", padding: "35px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)", transition: "0.3s" },
  featureIcon: { fontSize: "52px", marginBottom: "18px" },
  featureTitle: { fontSize: "22px", color: "#333", fontWeight: "700", marginBottom: "12px" },
  featureText: { color: "#666", lineHeight: "28px", fontSize: "16px" },
  ctaSection: { marginBottom: "60px" },
  ctaCard: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "70px 40px", borderRadius: "25px" },
  ctaTitle: { fontSize: "38px", fontWeight: "700", marginBottom: "18px" },
  ctaText: { maxWidth: "700px", margin: "0 auto 35px", lineHeight: "32px", fontSize: "18px" },
  ctaButton: { background: "#fff", color: "#ec4899", border: "none", borderRadius: "12px", padding: "16px 36px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  cardShadow: { boxShadow: "0 10px 25px rgba(0,0,0,.08)" },
  rounded: { borderRadius: "18px" }
};