// src/pages/Gallery.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const galleryImages = [
  { id: 1, title: "Luxury Rose Bouquet", category: "Bouquets", image: "/images/gallery/bouquet1.jpg" },
  { id: 2, title: "Elegant Wedding Stage", category: "Wedding", image: "/images/gallery/wedding1.jpg" },
  { id: 3, title: "Birthday Floral Theme", category: "Birthday", image: "/images/gallery/birthday1.jpg" },
  { id: 4, title: "Corporate Reception", category: "Corporate", image: "/images/gallery/corporate1.jpg" },
  { id: 5, title: "Anniversary Decoration", category: "Anniversary", image: "/images/gallery/anniversary1.jpg" },
  { id: 6, title: "Premium Flower Basket", category: "Bouquets", image: "/images/gallery/bouquet2.jpg" },
  { id: 7, title: "Luxury Mandap Decor", category: "Wedding", image: "/images/gallery/wedding2.jpg" },
  { id: 8, title: "Romantic Proposal Setup", category: "Special", image: "/images/gallery/proposal1.jpg" }
];

export default function Gallery() {
  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <div style={styles.heroIcon}>📸</div>
            <h1 style={styles.heroTitle}>Our Floral Gallery</h1>
            <p style={styles.heroSubtitle}>
              Explore our collection of luxurious bouquets, elegant wedding decorations, birthday themes,
              anniversary setups and premium floral creations handcrafted with love by PetalPalette.
            </p>
          </div>

          {/* Gallery Grid */}
          <div style={styles.galleryGrid}>
            {galleryImages.map((item) => (
              <div key={item.id} style={styles.galleryCard}>
                <img src={item.image} alt={item.title} style={styles.galleryImage} />
                <div style={styles.cardContent}>
                  <span style={styles.category}>{item.category}</span>
                  <h3 style={styles.imageTitle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Our Designs */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Our Floral Designs Stand Out</h2>
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🌸</div>
                <h3 style={styles.featureTitle}>Premium Fresh Flowers</h3>
                <p style={styles.featureText}>Every bouquet is handcrafted using fresh flowers sourced daily from trusted growers.</p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🎨</div>
                <h3 style={styles.featureTitle}>Customized Designs</h3>
                <p style={styles.featureText}>Every floral arrangement is designed according to your theme, colour palette and personal style.</p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>💝</div>
                <h3 style={styles.featureTitle}>Crafted With Love</h3>
                <p style={styles.featureText}>Our experienced florists carefully prepare every bouquet with attention to every tiny detail.</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
            <div style={styles.testimonialGrid}>
              <div style={styles.testimonialCard}>
                <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p style={styles.review}>"The wedding decoration was absolutely stunning. Every guest loved the floral arrangements."</p>
                <h4 style={styles.customerName}>— Priya Shah</h4>
              </div>

              <div style={styles.testimonialCard}>
                <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p style={styles.review}>"Beautiful bouquet and excellent service. Delivery was perfectly on time."</p>
                <h4 style={styles.customerName}>— Rahul Mehta</h4>
              </div>

              <div style={styles.testimonialCard}>
                <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p style={styles.review}>"Amazing quality flowers that stayed fresh for more than a week. Highly recommended."</p>
                <h4 style={styles.customerName}>— Neha Patel</h4>
              </div>
            </div>
          </div>

          {/* Call To Action */}
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Let Us Make Your Celebration Beautiful</h2>
            <p style={styles.ctaText}>
              Whether it's a wedding, birthday, anniversary or corporate event, PetalPalette is here to create unforgettable floral memories.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "1300px", margin: "0 auto" },
  heroSection: { textAlign: "center", marginBottom: "60px" },
  heroIcon: { fontSize: "70px", marginBottom: "20px" },
  heroTitle: { fontSize: "44px", fontWeight: "700", color: "#222", marginBottom: "15px" },
  heroSubtitle: { fontSize: "18px", color: "#666", lineHeight: "30px", maxWidth: "800px", margin: "0 auto" },
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "30px", marginBottom: "70px" },
  galleryCard: { background: "#ffffff", borderRadius: "18px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  galleryImage: { width: "100%", height: "260px", objectFit: "cover" },
  cardContent: { padding: "20px" },
  category: { display: "inline-block", background: "#fce7f3", color: "#db2777", padding: "6px 14px", borderRadius: "30px", fontWeight: "600", fontSize: "14px", marginBottom: "12px" },
  imageTitle: { fontSize: "22px", color: "#333", fontWeight: "700" },
  section: { marginBottom: "70px" },
  sectionTitle: { textAlign: "center", fontSize: "34px", color: "#222", marginBottom: "35px", fontWeight: "700" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" },
  featureCard: { background: "#ffffff", borderRadius: "18px", padding: "30px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", transition: "0.3s" },
  featureIcon: { fontSize: "50px", marginBottom: "18px" },
  featureTitle: { fontSize: "24px", fontWeight: "700", color: "#ec4899", marginBottom: "15px" },
  featureText: { color: "#666", lineHeight: "28px", fontSize: "16px" },
  testimonialGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "30px" },
  testimonialCard: { background: "#ffffff", borderRadius: "18px", padding: "30px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", textAlign: "center" },
  stars: { fontSize: "22px", marginBottom: "18px" },
  review: { color: "#666", lineHeight: "30px", fontSize: "16px", fontStyle: "italic", marginBottom: "20px" },
  customerName: { color: "#ec4899", fontSize: "18px", fontWeight: "700" },
  ctaSection: { background: "#ffffff", padding: "60px 40px", borderRadius: "22px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", marginBottom: "20px" },
  ctaTitle: { fontSize: "36px", fontWeight: "700", color: "#222", marginBottom: "20px" },
  ctaText: { maxWidth: "700px", margin: "0 auto", color: "#666", lineHeight: "30px", fontSize: "17px" }
};