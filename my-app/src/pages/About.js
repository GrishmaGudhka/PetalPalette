// src/pages/About.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const values = [
    {
      icon: "🌸",
      title: "Creativity",
      text: "Designing unique and elegant bouquets that match every emotion and occasion."
    },
    {
      icon: "❤️",
      title: "Customer First",
      text: "Every bouquet is crafted with care to exceed our customers' expectations."
    },
    {
      icon: "🌿",
      title: "Freshness",
      text: "We use premium-quality flowers sourced carefully to ensure freshness."
    },
    {
      icon: "🤝",
      title: "Trust",
      text: "Honest pricing, reliable delivery, and long-lasting customer relationships."
    }
  ];

  const features = [
    "Premium Fresh Flowers",
    "100% Custom Bouquet Builder",
    "Same-Day Delivery Available",
    "Secure Online Payments",
    "Expert Florists",
    "Affordable Luxury"
  ];

  return (
    <>
      <Header />
      <div style={styles.page}>
        
        {/* Hero */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>About Petal Palette</h1>
          <p style={styles.heroText}>
            Creating unforgettable moments through beautifully handcrafted flower bouquets made with love, creativity, and care.
          </p>
        </section>

        {/* Main Card */}
        <div style={styles.container}>
          
          {/* Story */}
          <section style={styles.section}>
            <h2 style={styles.heading}>Our Story</h2>
            <p style={styles.paragraph}>
              Petal Palette was created with one simple belief — every flower tells a story. Whether it's celebrating love, expressing gratitude, or making someone's day brighter, we help people communicate emotions through flowers.
            </p>
            <p style={styles.paragraph}>
              Along with beautifully designed ready-made bouquets, we also offer a unique bouquet customization experience where customers can create their own floral arrangements exactly the way they imagine.
            </p>
          </section>

          {/* Mission */}
          <section style={styles.section}>
            <div style={styles.twoColumn}>
              <div style={styles.infoCard}>
                <h2 style={styles.heading}>Our Mission</h2>
                <p style={styles.paragraph}>
                  To spread happiness by delivering fresh, personalized flower bouquets that create lasting memories for every occasion.
                </p>
              </div>
              <div style={styles.infoCard}>
                <h2 style={styles.heading}>Our Vision</h2>
                <p style={styles.paragraph}>
                  To become India's most trusted online florist by combining creativity, quality, innovation, and outstanding customer service.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section style={styles.section}>
            <h2 style={styles.headingCenter}>Our Core Values</h2>
            <div style={styles.valueGrid}>
              {values.map((item, index) => (
                <div key={index} style={styles.valueCard}>
                  <div style={styles.valueIcon}>{item.icon}</div>
                  <h3 style={styles.valueTitle}>{item.title}</h3>
                  <p style={styles.valueText}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose */}
          <section style={styles.section}>
            <h2 style={styles.headingCenter}>Why Choose Petal Palette?</h2>
            <div style={styles.featureGrid}>
              {features.map((feature, index) => (
                <div key={index} style={styles.featureCard}>
                  ✓ {feature}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={styles.cta}>
            <h2 style={styles.ctaTitle}>Ready to Create Your Perfect Bouquet?</h2>
            <p style={styles.ctaText}>
              Browse our premium collection or design your own custom bouquet today.
            </p>
            <Link to="/shopping" style={styles.button}>
              Shop Now
            </Link>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

/* JavaScript Styles Definition Object */
const styles = {
  page: { background: "#fff8fb", minHeight: "100vh", padding: "50px 20px" },
  hero: { maxWidth: "1100px", margin: "0 auto 50px", background: "linear-gradient(135deg,#ffe4ef,#fff)", borderRadius: "20px", padding: "70px 40px", textAlign: "center", boxShadow: "0 5px 18px rgba(0,0,0,0.08)" },
  heroTitle: { fontSize: "48px", color: "#ec4899", marginBottom: "20px", fontWeight: "700" },
  heroText: { fontSize: "20px", color: "#555", lineHeight: "34px", maxWidth: "850px", margin: "0 auto" },
  container: { maxWidth: "1100px", margin: "0 auto", background: "#fff", borderRadius: "20px", padding: "60px", boxShadow: "0 5px 18px rgba(0,0,0,0.08)" },
  section: { marginBottom: "60px" },
  heading: { color: "#ec4899", fontSize: "30px", marginBottom: "20px" },
  headingCenter: { textAlign: "center", color: "#ec4899", fontSize: "32px", marginBottom: "40px" },
  paragraph: { fontSize: "17px", color: "#555", lineHeight: "32px", marginBottom: "18px" },
  twoColumn: { display: "flex", gap: "30px", flexWrap: "wrap" },
  infoCard: { flex: "1", minWidth: "300px", background: "#fff8fb", padding: "30px", borderRadius: "15px" },
  valueGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "25px" },
  valueCard: { background: "#fff", padding: "30px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  valueIcon: { fontSize: "48px", marginBottom: "15px" },
  valueTitle: { color: "#333", fontSize: "22px", marginBottom: "15px" },
  valueText: { color: "#666", lineHeight: "28px", fontSize: "15px" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" },
  featureCard: { background: "#fff5fa", padding: "20px", borderRadius: "12px", textAlign: "center", fontWeight: "600", color: "#444", fontSize: "16px" },
  cta: { background: "#ec4899", color: "#fff", borderRadius: "20px", padding: "60px 30px", textAlign: "center" },
  ctaTitle: { fontSize: "36px", marginBottom: "20px" },
  ctaText: { fontSize: "18px", lineHeight: "30px", marginBottom: "35px" },
  button: { display: "inline-block", background: "#fff", color: "#ec4899", textDecoration: "none", padding: "14px 34px", borderRadius: "10px", fontWeight: "700", fontSize: "17px" }
};