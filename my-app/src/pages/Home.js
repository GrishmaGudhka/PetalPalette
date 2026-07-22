// src/pages/Home.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import red_rose_group from "../Pics/red_rose_group.jpg";
import white_lily_group from "../Pics/white_lily_group.jpg";
import sunflower_pink_rose_group from "../Pics/sunflower_pink_rose_group.jpg";
import white_rose_group from "../Pics/white_rose_group.jpg";
import purple_rose_group from "../Pics/purple_rose_group.jpg";
import sunflower_group from "../Pics/sunflower_group.jpg";

const Home = () => {

  const navigate = useNavigate();

  const [hoverButton, setHoverButton] = useState(false);

  const bouquets = [
    {
      id: 1,
      name: "Red Rose Bouquet",
      image: red_rose_group,
    },
    {
      id: 2,
      name: "White Lily Bouquet",
      image: white_lily_group,
    },
    {
      id: 3,
      name: "Sunflower & Pink Roses",
      image: sunflower_pink_rose_group,
    },
    {
      id: 4,
      name: "White Rose Bouquet",
      image: white_rose_group,
    },
    {
      id: 5,
      name: "Purple Rose Bouquet",
      image: purple_rose_group,
    },
    {
      id: 6,
      name: "Sunflower Bouquet",
      image: sunflower_group,
    },
  ];

  const reviews = [
    {
      name: "Neha",
      text: "PetalPalette made my anniversary unforgettable. The bouquet looked even better than the pictures.",
    },
    {
      name: "Rahul",
      text: "Fresh flowers, quick delivery and excellent customer service. Highly recommended.",
    },
    {
      name: "Priya",
      text: "The customization options are amazing. My bouquet looked exactly how I imagined it.",
    },
    {
      name: "Amit",
      text: "Affordable prices with premium quality flowers. Definitely ordering again.",
    },
    {
      name: "Sneha",
      text: "Perfect birthday surprise for my mother. She absolutely loved the arrangement.",
    },
    {
      name: "Riya",
      text: "Beautiful packaging, fresh flowers and timely delivery. Five stars!",
    },
  ];

  return (

    <>

      <Header />

      <div style={styles.page}>

        {/* ==========================================
                HERO SECTION
        ========================================== */}

        <section style={styles.hero}>

          <div style={styles.heroContent}>

            <h1 style={styles.heroTitle}>
              Fresh Flowers For Every Occasion
            </h1>

            <p style={styles.heroSubtitle}>
              Welcome to <strong>PetalPalette</strong>.
              Create beautiful customized flower bouquets,
              celebrate every occasion, and surprise your loved
              ones with premium fresh flowers delivered right to
              your doorstep.
            </p>

            <button
              style={{
                ...styles.heroButton,
                background: hoverButton
                  ? "#db2777"
                  : "#ec4899",
              }}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onClick={() => navigate("/shopping")}
            >
              Shop Now
            </button>

          </div>

        </section>

        {/* ==========================================
                STATISTICS
        ========================================== */}

        <section style={styles.statsSection}>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>5000+</h2>
            <p style={styles.statText}>
              Happy Customers
            </p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>200+</h2>
            <p style={styles.statText}>
              Flower Varieties
            </p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>1000+</h2>
            <p style={styles.statText}>
              Events Decorated
            </p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>24/7</h2>
            <p style={styles.statText}>
              Customer Support
            </p>
          </div>

        </section>

        {/* ==========================================
                WHY CHOOSE US
        ========================================== */}

        <section style={styles.section}>

          <h2 style={styles.sectionTitle}>
            Why Choose PetalPalette?
          </h2>

          <p style={styles.sectionSubtitle}>
            We combine creativity, freshness and elegance to
            create unforgettable floral experiences.
          </p>

          <div style={styles.featureGrid}>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🌹</div>

              <h3 style={styles.featureTitle}>
                Fresh Flowers
              </h3>

              <p style={styles.featureText}>
                Handpicked premium flowers sourced daily to
                ensure freshness and long-lasting beauty.
              </p>

            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🎨</div>

              <h3 style={styles.featureTitle}>
                Custom Designs
              </h3>

              <p style={styles.featureText}>
                Personalize bouquets with your favourite
                flowers, colours and wrapping styles.
              </p>

            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🚚</div>

              <h3 style={styles.featureTitle}>
                Fast Delivery
              </h3>

              <p style={styles.featureText}>
                Reliable and timely flower delivery for every
                special occasion.
              </p>

            </div>

          </div>

        </section>
                {/* ==========================================
                FEATURED BOUQUETS
        ========================================== */}

        <section style={styles.section}>

          <h2 style={styles.sectionTitle}>
            Featured Bouquets
          </h2>

          <p style={styles.sectionSubtitle}>
            Discover our most loved handcrafted floral
            arrangements designed for every celebration.
          </p>

          <div style={styles.bouquetGrid}>

            {bouquets.map((bouquet) => (

              <div
                key={bouquet.id}
                style={styles.bouquetCard}
              >

                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  style={styles.bouquetImage}
                />

                <div style={styles.bouquetContent}>

                  <h3 style={styles.bouquetTitle}>
                    {bouquet.name}
                  </h3>

                  <p style={styles.bouquetText}>
                    Beautifully handcrafted with fresh flowers,
                    elegant wrapping and premium finishing.
                  </p>

                  <button
                    style={styles.smallButton}
                    onClick={() => navigate("/shopping")}
                  >
                    View Collection
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* ==========================================
                PERFECT FOR EVERY OCCASION
        ========================================== */}

        <section style={styles.section}>

          <h2 style={styles.sectionTitle}>
            Perfect For Every Occasion
          </h2>

          <p style={styles.sectionSubtitle}>
            Whatever you're celebrating, we have flowers that
            make every moment memorable.
          </p>

          <div style={styles.occasionGrid}>

            <div style={styles.occasionCard}>
              💍
              <h3 style={styles.occasionTitle}>
                Weddings
              </h3>

              <p style={styles.occasionText}>
                Elegant floral decorations and bridal bouquets
                designed to make your big day unforgettable.
              </p>
            </div>

            <div style={styles.occasionCard}>
              🎂
              <h3 style={styles.occasionTitle}>
                Birthdays
              </h3>

              <p style={styles.occasionText}>
                Surprise your loved ones with colourful and
                cheerful handcrafted flower arrangements.
              </p>
            </div>

            <div style={styles.occasionCard}>
              ❤️
              <h3 style={styles.occasionTitle}>
                Anniversaries
              </h3>

              <p style={styles.occasionText}>
                Celebrate love with romantic roses and elegant
                premium bouquets.
              </p>
            </div>

            <div style={styles.occasionCard}>
              🎉
              <h3 style={styles.occasionTitle}>
                Special Events
              </h3>

              <p style={styles.occasionText}>
                From corporate events to family celebrations,
                we provide customized floral decorations.
              </p>
            </div>

          </div>

        </section>

        {/* ==========================================
                CUSTOMER REVIEWS
        ========================================== */}

        <section style={styles.reviewSection}>

          <h2 style={styles.sectionTitle}>
            What Our Customers Say
          </h2>

          <p style={styles.sectionSubtitle}>
            Thousands of happy customers trust PetalPalette
            for every special occasion.
          </p>

          <div style={styles.reviewGrid}>

            {reviews.map((review, index) => (

              <div
                key={index}
                style={styles.reviewCard}
              >

                <div style={styles.reviewStars}>
                  ⭐⭐⭐⭐⭐
                </div>

                <p style={styles.reviewText}>
                  "{review.text}"
                </p>

                <h4 style={styles.reviewName}>
                  — {review.name}
                </h4>

              </div>

            ))}

          </div>

        </section>
                {/* ==========================================
                CALL TO ACTION
        ========================================== */}

        <section style={styles.ctaSection}>

          <div style={styles.ctaCard}>

            <h2 style={styles.ctaTitle}>
              Ready to Brighten Someone's Day?
            </h2>

            <p style={styles.ctaText}>
              Surprise your loved ones with fresh flowers,
              elegant bouquets and premium floral gifts
              handcrafted by PetalPalette.
            </p>

            <button
              style={styles.ctaButton}
              onClick={() => navigate("/shopping")}
            >
              Shop Now
            </button>

          </div>

        </section>

      </div>

      <Footer />

    </>

  );

};

export default Home;

/* ==========================================================
    Styles
========================================================== */

const styles = {

  page: {
  minHeight: "100vh",
  background: "#fff8fb",
  paddingBottom: "60px",
},

  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px 60px",
  },

  /* Hero */

  hero: {
    background:
      "linear-gradient(135deg,#ec4899,#f472b6)",
    color: "#fff",
    textAlign: "center",
    borderRadius: "0 0 35px 35px",
    padding: "90px 30px",
    marginBottom: "70px",
  },

  heroTitle: {
    fontSize: "52px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  heroSubtitle: {
    fontSize: "20px",
    lineHeight: "34px",
    maxWidth: "760px",
    margin: "0 auto 40px",
  },

  heroButton: {
  background: "#fff",
  color: "#ec4899",
  border: "none",
  borderRadius: "12px",
  padding: "16px 38px",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "0.3s",
},

  /* Sections */

  section: {
    marginBottom: "80px",
  },

  sectionTitle: {
    fontSize: "38px",
    textAlign: "center",
    color: "#222",
    marginBottom: "15px",
    fontWeight: "700",
  },

  sectionSubtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: "17px",
    maxWidth: "720px",
    lineHeight: "30px",
    margin: "0 auto 40px",
  },

  /* Stats */

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
  },

  statCard: {
    background: "#fff",
    padding: "35px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  statNumber: {
    fontSize: "42px",
    color: "#ec4899",
    fontWeight: "700",
    marginBottom: "10px",
  },

  statLabel: {
    fontSize: "18px",
    color: "#555",
  },

  /* Features */

  featureGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
},

  featureCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  featureIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },

  featureTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "15px",
  },

  featureText: {
    color: "#666",
    lineHeight: "28px",
    fontSize: "16px",
  },

  /* Featured Bouquets */

  bouquetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "30px",
  },

  bouquetCard: {
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
transition: "0.3s",
cursor: "pointer",
  },

  bouquetImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
  },

  bouquetContent: {
    padding: "25px",
  },

  bouquetTitle: {
    fontSize: "24px",
    color: "#333",
    fontWeight: "700",
    marginBottom: "10px",
  },

  bouquetText: {
    color: "#666",
    lineHeight: "26px",
    marginBottom: "20px",
  },

  smallButton: {
    background: "#ec4899",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  /* Occasions */

  occasionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },

  occasionCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    fontSize: "45px",
  },

  occasionTitle: {
    fontSize: "22px",
    color: "#333",
    margin: "15px 0",
    fontWeight: "700",
  },

  occasionText: {
    color: "#666",
    lineHeight: "28px",
    fontSize: "16px",
  },

  /* Reviews */

  reviewSection: {
    background: "#fff0f6",
    padding: "70px 40px",
    borderRadius: "25px",
    marginBottom: "80px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },

  reviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px",
  },

  reviewCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  reviewStars: {
    fontSize: "22px",
    marginBottom: "15px",
  },

  reviewText: {
    color: "#555",
    lineHeight: "28px",
    fontStyle: "italic",
    marginBottom: "20px",
  },

  reviewName: {
    color: "#ec4899",
    fontWeight: "700",
    fontSize: "17px",
  },

  /* CTA */

  ctaSection: {
    marginBottom: "60px",
  },

  ctaCard: {
    background: "linear-gradient(135deg,#ec4899,#f472b6)",
    color: "#ffffff",
    padding: "70px 40px",
    borderRadius: "25px",
    textAlign: "center",
  },

  ctaTitle: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  ctaText: {
    fontSize: "18px",
    lineHeight: "30px",
    maxWidth: "700px",
    margin: "0 auto 35px",
  },

  ctaButton: {
    background: "#ffffff",
    color: "#ec4899",
    border: "none",
    borderRadius: "12px",
    padding: "16px 40px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },

};