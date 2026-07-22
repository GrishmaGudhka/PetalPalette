// src/pages/NotFound.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {

  const navigate = useNavigate();

  const [hoverHome, setHoverHome] = useState(false);
  const [hoverShop, setHoverShop] = useState(false);

  return (
    <>

      <Header />

      <div style={styles.page}>

        <div style={styles.container}>

          {/* 404 Number */}

          <div style={styles.errorNumber}>
            404
          </div>

          {/* Title */}

          <h1 style={styles.title}>
            Oops! Page Not Found
          </h1>

          {/* Description */}

          <p style={styles.description}>
            The page you're looking for doesn't exist,
            may have been moved, or the link is incorrect.
          </p>

          {/* Flower Illustration */}

          <div style={styles.flower}>
            🌸 🌷 🌹 🌼 🌺
          </div>

          {/* Buttons */}

          <div style={styles.buttonGroup}>

            <button
              style={{
                ...styles.primaryButton,
                background: hoverHome
                  ? "#db2777"
                  : "#ec4899",
              }}
              onMouseEnter={() => setHoverHome(true)}
              onMouseLeave={() => setHoverHome(false)}
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>

            <button
              style={{
                ...styles.secondaryButton,
                background: hoverShop
                  ? "#ec4899"
                  : "#ffffff",
                color: hoverShop
                  ? "#ffffff"
                  : "#ec4899",
              }}
              onMouseEnter={() => setHoverShop(true)}
              onMouseLeave={() => setHoverShop(false)}
              onClick={() => navigate("/shopping")}
            >
              Shop Flowers
            </button>

          </div>

          {/* Helpful Links */}

          <div style={styles.linksSection}>

            <h3 style={styles.linksTitle}>
              You may be looking for:
            </h3>

            <div style={styles.linksGrid}>

              <div
                style={styles.linkCard}
                onClick={() => navigate("/shopping")}
              >
                🌸 Shopping
              </div>

              <div
                style={styles.linkCard}
                onClick={() => navigate("/gallery")}
              >
                📸 Gallery
              </div>

              <div
                style={styles.linkCard}
                onClick={() => navigate("/events")}
              >
                💐 Events
              </div>

              <div
                style={styles.linkCard}
                onClick={() => navigate("/contact")}
              >
                📞 Contact
              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );

};

export default NotFound;
const styles = {

  page: { minHeight: "100vh", background: "#fff8fb", display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 20px", },

  container: { maxWidth: "900px", width: "100%", background: "#ffffff", borderRadius: "25px", padding: "60px 40px", textAlign: "center", boxShadow: "0 12px 30px rgba(0,0,0,0.08)", },

  errorNumber: { fontSize: "140px", fontWeight: "800", color: "#ec4899", lineHeight: "1", marginBottom: "15px", letterSpacing: "6px", },

  title: { fontSize: "42px", color: "#333", fontWeight: "700", marginBottom: "20px", },

  description: { fontSize: "18px", color: "#666", lineHeight: "32px", maxWidth: "650px", margin: "0 auto 35px", },

  flower: { fontSize: "42px", marginBottom: "40px", letterSpacing: "10px", },

  buttonGroup: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "55px", },

  primaryButton: { padding: "15px 35px", border: "none", borderRadius: "12px", color: "#ffffff", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s", },

  secondaryButton: { padding: "15px 35px", border: "2px solid #ec4899", borderRadius: "12px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s", },

  linksSection: { marginTop: "10px", },

  linksTitle: { fontSize: "26px", color: "#333", marginBottom: "30px", fontWeight: "700", },

  linksGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", },

  linkCard: { background: "#fff0f6", padding: "25px", borderRadius: "16px", fontSize: "18px", fontWeight: "600", color: "#ec4899", cursor: "pointer", transition: "0.3s", boxShadow: "0 6px 15px rgba(0,0,0,0.06)", },

};