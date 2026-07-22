// src/pages/Contact.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);

  /* ==========================================================
      Handle Input
  ========================================================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ==========================================================
      Submit Form
  ========================================================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <h1 style={styles.title}>Contact PetalPalette</h1>
            <p style={styles.subtitle}>We'd love to hear from you. Whether you have a question about bouquets, deliveries, custom flower arrangements or your recent order, our team is always happy to help.</p>
          </div>

          {/* Main Layout */}
          <div style={styles.mainContent}>
            {/* Contact Information */}
            <div style={styles.infoCard}>
              <h2 style={styles.cardTitle}>Get in Touch</h2>

              <div style={styles.infoItem}>
                <div style={styles.icon}>📞</div>
                <div>
                  <div style={styles.infoHeading}>Phone</div>
                  <div style={styles.infoText}>+91 98765 43210</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.icon}>✉️</div>
                <div>
                  <div style={styles.infoHeading}>Email</div>
                  <div style={styles.infoText}>support@petalpalette.com</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.icon}>📍</div>
                <div>
                  <div style={styles.infoHeading}>Address</div>
                  <div style={styles.infoText}>123 Blossom Street,<br />Mumbai, Maharashtra, India</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.icon}>🕒</div>
                <div>
                  <div style={styles.infoHeading}>Working Hours</div>
                  <div style={styles.infoText}>Monday - Saturday<br />9:00 AM - 8:00 PM</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={styles.formCard}>
              <h2 style={styles.cardTitle}>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <label style={styles.label}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" style={styles.input} required />

                <label style={styles.label}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" style={styles.input} required />

                <label style={styles.label}>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Order, Feedback, Support..." style={styles.input} required />

                <label style={styles.label}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." style={styles.textarea} rows={6} required />

                <button
                  type="submit"
                  style={{ ...styles.submitButton, background: hoveredButton ? "#db2777" : "#ec4899" }}
                  onMouseEnter={() => setHoveredButton(true)}
                  onMouseLeave={() => setHoveredButton(false)}
                >
                  Send Message
                </button>
              </form>

              {/* Success Message */}
              {submitted && (
                <div style={styles.successCard}>
                  <div style={styles.successIcon}>✔</div>
                  <h3 style={styles.successTitle}>Message Sent Successfully</h3>
                  <p style={styles.successText}>Thank you for contacting <strong> PetalPalette</strong>.<br />Our support team will get back to you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "1400px", margin: "0 auto" },
  heroSection: { textAlign: "center", marginBottom: "60px" },
  title: { fontSize: "46px", fontWeight: "700", color: "#222", marginBottom: "20px" },
  subtitle: { maxWidth: "750px", margin: "0 auto", fontSize: "18px", color: "#666", lineHeight: "32px" },
  mainContent: { display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "40px", alignItems: "start" },
  infoCard: { background: "#ffffff", padding: "35px", borderRadius: "18px", boxShadow: "0 8px 18px rgba(0,0,0,0.08)" },
  formCard: { background: "#ffffff", padding: "35px", borderRadius: "18px", boxShadow: "0 8px 18px rgba(0,0,0,0.08)" },
  cardTitle: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "30px" },
  infoItem: { display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "30px" },
  icon: { width: "55px", height: "55px", background: "#fde7f3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 },
  infoHeading: { fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "6px" },
  infoText: { color: "#666", fontSize: "16px", lineHeight: "28px" },
  label: { display: "block", marginBottom: "8px", marginTop: "18px", fontWeight: "600", color: "#444", fontSize: "15px" },
  input: { width: "100%", padding: "14px 16px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", outline: "none", boxSizing: "border-box", transition: "0.3s" },
  textarea: { width: "100%", padding: "14px 16px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", resize: "vertical", minHeight: "150px", outline: "none", boxSizing: "border-box", transition: "0.3s" },
  submitButton: { width: "100%", padding: "16px", marginTop: "30px", border: "none", borderRadius: "12px", color: "#ffffff", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s", boxShadow: "0 6px 15px rgba(236,72,153,0.25)" },
  successCard: { marginTop: "30px", background: "#ecfdf5", border: "1px solid #86efac", borderRadius: "14px", padding: "25px", textAlign: "center" },
  successIcon: { fontSize: "42px", marginBottom: "10px" },
  successTitle: { fontSize: "22px", color: "#15803d", fontWeight: "700", marginBottom: "10px" },
  successText: { color: "#166534", lineHeight: "28px", fontSize: "16px" },
  mobileNotice: { display: "none" }
};