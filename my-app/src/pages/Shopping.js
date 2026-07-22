// src/pages/Shopping.js

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PremadeBouquets from "./PremadeBouquets";
import CustomBouquet from "./CustomBouquet";

const Shopping = () => {
  const [view, setView] = useState("premade");

  return (
    <>
      <Header />

      <div style={styles.page}>
        
        {/* =====================================
              Hero Jumbotron Banner
        ===================================== */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>🌸 Shop Beautiful Bouquets</h1>
          <p style={styles.heroSubtitle}>
            Whether you're celebrating love, friendship, birthdays, anniversaries or simply making someone's
            day brighter, PetalPalette offers handcrafted floral arrangements made with the freshest flowers.
          </p>
          <button
            style={styles.heroButton}
            onClick={() => document.getElementById("shopping-options")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Shopping
          </button>
        </section>

        <div style={styles.container}>
          
          {/* =====================================
                Statistics Metrics Grid
          ===================================== */}
          <section style={styles.statsSection}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💐</div>
              <h2 style={styles.statNumber}>500+</h2>
              <p style={styles.statText}>Bouquets Delivered</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🌹</div>
              <h2 style={styles.statNumber}>100+</h2>
              <p style={styles.statText}>Flower Varieties</p>
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

          {/* =====================================
                Value Propositions / Benefits
          ===================================== */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Choose PetalPalette?</h2>
            <p style={styles.sectionSubtitle}>
              We believe every bouquet should tell a beautiful story. From premium flowers to elegant packaging, 
              every order is carefully handcrafted with love and attention to detail.
            </p>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🌸</div>
                <h3 style={styles.featureTitle}>Fresh Flowers</h3>
                <p style={styles.featureText}>
                  Fresh flowers sourced daily from trusted growers to ensure vibrant colors and long-lasting beauty.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🎨</div>
                <h3 style={styles.featureTitle}>Custom Designs</h3>
                <p style={styles.featureText}>
                  Personalize your bouquet by choosing your favorite flowers, wrapping style, and message card.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🚚</div>
                <h3 style={styles.featureTitle}>Fast Delivery</h3>
                <p style={styles.featureText}>
                  Same-day and scheduled deliveries are available so your flowers arrive fresh and on time.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>💝</div>
                <h3 style={styles.featureTitle}>Premium Packaging</h3>
                <p style={styles.featureText}>
                  Elegant wrapping, ribbons, and premium presentation make every bouquet extra special.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================
                Flower Collections Showcase
          ===================================== */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Popular Flower Collections</h2>
            <div style={styles.categoryGrid}>
              <div style={styles.categoryCard}>
                <div style={styles.categoryEmoji}>🌹</div>
                <h3 style={styles.categoryTitle}>Roses</h3>
                <p style={styles.categoryText}>Classic symbols of love and romance.</p>
              </div>

              <div style={styles.categoryCard}>
                <div style={styles.categoryEmoji}>🌻</div>
                <h3 style={styles.categoryTitle}>Sunflowers</h3>
                <p style={styles.categoryText}>Bright, cheerful blooms full of happiness.</p>
              </div>

              <div style={styles.categoryCard}>
                <div style={styles.categoryEmoji}>🌼</div>
                <h3 style={styles.categoryTitle}>Lilies</h3>
                <p style={styles.categoryText}>Elegant flowers for every celebration.</p>
              </div>

              <div style={styles.categoryCard}>
                <div style={styles.categoryEmoji}>💐</div>
                <h3 style={styles.categoryTitle}>Mixed Bouquets</h3>
                <p style={styles.categoryText}>Beautiful combinations crafted by our florists.</p>
              </div>
            </div>
          </section>

          {/* =====================================
                Occasions Filters Grid
          ===================================== */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Perfect for Every Occasion</h2>
            <div style={styles.occasionGrid}>
              <div style={styles.occasionCard}>
                <div style={styles.occasionEmoji}>🎂</div>
                <h3 style={styles.occasionTitle}>Birthdays</h3>
              </div>

              <div style={styles.occasionCard}>
                <div style={styles.occasionEmoji}>❤️</div>
                <h3 style={styles.occasionTitle}>Anniversaries</h3>
              </div>

              <div style={styles.occasionCard}>
                <div style={styles.occasionEmoji}>🎓</div>
                <h3 style={styles.occasionTitle}>Congratulations</h3>
              </div>

              <div style={styles.occasionCard}>
                <div style={styles.occasionEmoji}>🙏</div>
                <h3 style={styles.occasionTitle}>Thank You</h3>
              </div>
            </div>
          </section>

          {/* =====================================
                Logistics & Delivery Info Card
          ===================================== */}
          <section style={styles.deliveryBanner}>
            <h2 style={styles.deliveryTitle}>🚚 Same-Day Delivery Available</h2>
            <p style={styles.deliveryText}>
              Place your order before <strong>5:00 PM</strong> and we'll deliver fresh flowers on the same day across selected cities.
              Every bouquet is carefully packed to maintain freshness and beauty.
            </p>
          </section>

          {/* =====================================
                Interactive Shopping Mode Toggle
          ===================================== */}
          <section id="shopping-options" style={styles.section}>
            <h2 style={styles.sectionTitle}>Choose Your Shopping Experience</h2>
            <p style={styles.sectionSubtitle}>
              Select a ready-made bouquet designed by our expert florists or unleash your creativity by designing your own custom bouquet from scratch.
            </p>

            <div style={styles.optionGrid}>
              {/* Ready-made Option Card */}
              <div
                onClick={() => setView("premade")}
                style={{
                  ...styles.optionCard,
                  ...(view === "premade" ? styles.activeCard : {}),
                }}
              >
                <div style={styles.optionIcon}>💐</div>
                <h3 style={styles.optionTitle}>Premade Bouquets</h3>
                <p style={styles.optionText}>
                  Browse professionally designed floral arrangements perfect for birthdays, anniversaries, weddings and every special celebration.
                </p>
                <button
                  style={{
                    ...styles.optionButton,
                    background: view === "premade" ? "#ec4899" : "#f8bbd0",
                    color: view === "premade" ? "#fff" : "#333",
                  }}
                >
                  Browse Collection
                </button>
              </div>

              {/* Bespoke Custom Option Card */}
              <div
                onClick={() => setView("custom")}
                style={{
                  ...styles.optionCard,
                  ...(view === "custom" ? styles.activeCard : {}),
                }}
              >
                <div style={styles.optionIcon}>🎨</div>
                <h3 style={styles.optionTitle}>Custom Bouquet</h3>
                <p style={styles.optionText}>
                  Choose your own flowers, wrapping style, bouquet size, greeting card and build a completely personalized gift.
                </p>
                <button
                  style={{
                    ...styles.optionButton,
                    background: view === "custom" ? "#ec4899" : "#f8bbd0",
                    color: view === "custom" ? "#fff" : "#333",
                  }}
                >
                  Start Designing
                </button>
              </div>
            </div>
          </section>

          {/* =====================================
                Conditional View Panel Container
          ===================================== */}
          <section style={styles.productSection}>
            {view === "premade" && <PremadeBouquets />}
            {view === "custom" && <CustomBouquet />}
          </section>

          {/* =====================================
                Call to Action Segment
          ===================================== */}
          <section style={styles.ctaSection}>
            <div style={styles.ctaCard}>
              <h2 style={styles.ctaTitle}>🌸 Make Every Moment Bloom</h2>
              <p style={styles.ctaText}>
                Every bouquet is handcrafted with fresh flowers, wrapped elegantly, and delivered with care to create unforgettable memories.
              </p>
              <button
                style={styles.ctaButton}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                ↑ Back to Top
              </button>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shopping;

/* ==========================================================
    CSS-in-JS Cleaned Object Declarations
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1400px", margin: "0 auto", padding: "0 20px 70px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "90px 30px", borderRadius: "0 0 35px 35px", marginBottom: "70px" },
  heroTitle: { fontSize: "52px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto 35px", lineHeight: "34px", fontSize: "19px" },
  heroButton: { background: "#fff", color: "#ec4899", border: "none", padding: "16px 40px", borderRadius: "12px", cursor: "pointer", fontSize: "18px", fontWeight: "700" },
  statsSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "25px", marginBottom: "80px" },
  statCard: { background: "#fff", padding: "35px", borderRadius: "18px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  statIcon: { fontSize: "45px", marginBottom: "15px" },
  statNumber: { fontSize: "38px", color: "#ec4899", fontWeight: "700", marginBottom: "10px" },
  statText: { color: "#666", fontSize: "17px" },
  section: { marginBottom: "80px" },
  sectionTitle: { textAlign: "center", fontSize: "38px", fontWeight: "700", marginBottom: "15px", color: "#222" },
  sectionSubtitle: { textAlign: "center", maxWidth: "760px", margin: "0 auto 45px", color: "#666", fontSize: "17px", lineHeight: "30px" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "25px" },
  featureCard: { background: "#fff", padding: "35px", borderRadius: "18px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  featureIcon: { fontSize: "50px", marginBottom: "20px" },
  featureTitle: { fontSize: "23px", fontWeight: "700", marginBottom: "15px", color: "#333" },
  featureText: { color: "#666", lineHeight: "28px", fontSize: "16px" },
  categoryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "25px" },
  categoryCard: { background: "#fff", padding: "35px", borderRadius: "18px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  categoryEmoji: { fontSize: "48px", marginBottom: "15px" },
  categoryTitle: { fontSize: "22px", color: "#333", fontWeight: "700", marginBottom: "10px" },
  categoryText: { color: "#666", lineHeight: "28px", fontSize: "16px" },
  occasionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "25px" },
  occasionCard: { background: "#fff", borderRadius: "18px", padding: "35px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  occasionEmoji: { fontSize: "52px", marginBottom: "15px" },
  occasionTitle: { fontSize: "22px", color: "#333", fontWeight: "700" },
  deliveryBanner: { background: "linear-gradient(135deg,#fdf2f8,#ffe4ec)", borderRadius: "22px", padding: "50px", textAlign: "center", marginBottom: "80px" },
  deliveryTitle: { fontSize: "34px", color: "#ec4899", marginBottom: "20px", fontWeight: "700" },
  deliveryText: { color: "#555", maxWidth: "850px", margin: "0 auto", lineHeight: "32px", fontSize: "18px" },
  optionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: "30px" },
  optionCard: { background: "#fff", padding: "40px", borderRadius: "20px", textAlign: "center", cursor: "pointer", border: "3px solid transparent", transition: "0.3s", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  activeCard: { border: "3px solid #ec4899", transform: "translateY(-5px)", boxShadow: "0 15px 30px rgba(236,72,153,.25)" },
  optionIcon: { fontSize: "55px", marginBottom: "20px" },
  optionTitle: { fontSize: "28px", color: "#333", marginBottom: "15px", fontWeight: "700" },
  optionText: { color: "#666", lineHeight: "30px", marginBottom: "25px", fontSize: "16px" },
  optionButton: { border: "none", padding: "14px 30px", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },
  productSection: { marginTop: "60px", marginBottom: "80px" },
  ctaSection: { marginBottom: "50px" },
  ctaCard: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "70px 40px", borderRadius: "25px" },
  ctaTitle: { fontSize: "40px", fontWeight: "700", marginBottom: "20px" },
  ctaText: { maxWidth: "720px", margin: "0 auto 35px", lineHeight: "32px", fontSize: "18px" },
  ctaButton: { background: "#fff", color: "#ec4899", border: "none", padding: "16px 38px", borderRadius: "12px", fontSize: "17px", fontWeight: "700", cursor: "pointer" }
};