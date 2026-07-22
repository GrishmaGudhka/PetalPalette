// src/components/ShopComponents.js
import React from "react";
import { Link } from "react-router-dom";

/* ==========================================================
   Section Title
========================================================== */
export const SectionTitle = ({ title, subtitle = "", center = true }) => {
  if (!title) return null;
  
  return (
    <div style={{ ...styles.sectionContainer, textAlign: center ? "center" : "left" }}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {subtitle && <p style={{ ...styles.sectionSubtitle, margin: center ? "0 auto" : "0" }}>{subtitle}</p>}
    </div>
  );
};

/* ==========================================================
   Hero Banner
========================================================== */
export const HeroBanner = ({ title, subtitle, buttonText, buttonLink, image }) => {
  return (
    <section style={styles.banner}>
      <div style={styles.bannerLeft}>
        <h1 style={styles.bannerHeading}>{title}</h1>
        <p style={styles.bannerDescription}>{subtitle}</p>
        <Link to={buttonLink || "/shopping"} style={styles.bannerButton}>{buttonText}</Link>
      </div>
      <div style={styles.bannerImageContainer}>
        <img src={image || "https://via.placeholder.com/500x500?text=Petal+Palette"} alt={title || "Hero Banner"} style={styles.bannerImage} />
      </div>
    </section>
  );
};

/* ==========================================================
   Search Bar
========================================================== */
export const SearchBar = ({ searchTerm, setSearchTerm, onSearch, placeholder = "Search bouquets..." }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <form style={styles.searchForm} onSubmit={handleSubmit}>
      <input type="text" placeholder={placeholder} value={searchTerm} onChange={(e) => setSearchTerm?.(e.target.value)} style={styles.searchInput} />
      <button type="submit" style={styles.searchButton}>Search</button>
    </form>
  );
};

/* ==========================================================
   Category Card
========================================================== */
export const CategoryCard = ({ title, description, image, link }) => {
  return (
    <div style={styles.catCard}>
      <img src={image || "https://via.placeholder.com/320x220?text=Bouquet"} alt={title || "Category"} style={styles.catImage} />
      <div style={styles.catBody}>
        <h3 style={styles.catTitle}>{title}</h3>
        <p style={styles.catDescription}>{description}</p>
        <Link to={link} style={styles.catButton}>Explore</Link>
      </div>
    </div>
  );
};

/* ==========================================================
   Testimonial Card
========================================================== */
export const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) return null;
  const rating = Math.min(Math.max(testimonial.rating || 0, 0), 5);

  return (
    <div style={styles.testCard}>
      <div style={styles.testTopSection}>
        <img src={testimonial.image || "https://via.placeholder.com/100"} alt={testimonial.name} style={styles.testImage} />
        <div>
          <div style={styles.testName}>{testimonial.name}</div>
          <div style={styles.testLocation}>{testimonial.location}</div>
        </div>
      </div>
      <div style={styles.testStars}>{"★".repeat(rating)}{"☆".repeat(5 - rating)}</div>
      <div style={styles.testReview}>"{testimonial.review}"</div>
      <div style={styles.testFooter}>
        <span>{testimonial.date}</span>
        <span style={styles.testVerified}>✔ Verified Purchase</span>
      </div>
    </div>
  );
};

/* ==========================================================
   Profile Card
========================================================== */
export const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div style={styles.profCard}>
      <img src={user.image || "https://via.placeholder.com/120"} alt={user.name} style={styles.profImage} />
      <div style={styles.profName}>{user.name}</div>
      <div style={styles.profEmail}>{user.email}</div>
      <div style={styles.profInfoBox}>
        <div style={styles.profRow}>
          <span style={styles.profLabel}>Phone</span>
          <span style={styles.profValue}>{user.phone || "-"}</span>
        </div>
        <div style={styles.profRow}>
          <span style={styles.profLabel}>City</span>
          <span style={styles.profValue}>{user.city || "-"}</span>
        </div>
        <div style={styles.profRow}>
          <span style={styles.profLabel}>Member Since</span>
          <span style={styles.profValue}>{user.memberSince || "-"}</span>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   Feature Card
========================================================== */
export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div style={styles.featCard}>
      <div style={styles.featIcon}>{icon}</div>
      <div style={styles.featTitle}>{title}</div>
      <div style={styles.featDescription}>{description}</div>
    </div>
  );
};

/* ==========================================================
   Standalone Style Declaration Object (Rule 1 & 2)
========================================================== */
const styles = {
  sectionContainer: { marginBottom: "40px" },
  sectionTitle: { fontSize: "36px", fontWeight: "700", color: "#333", marginBottom: "12px" },
  sectionSubtitle: { fontSize: "17px", color: "#666", lineHeight: "28px", maxWidth: "700px" },
  banner: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff5fa", borderRadius: "18px", padding: "50px 30px", marginBottom: "60px", flexWrap: "wrap", gap: "40px" },
  bannerLeft: { flex: 1, minWidth: "320px" },
  bannerHeading: { fontSize: "48px", color: "#333", marginBottom: "20px", lineHeight: "60px", fontWeight: "700" },
  bannerDescription: { fontSize: "18px", color: "#666", lineHeight: "30px", marginBottom: "35px", maxWidth: "600px" },
  bannerButton: { display: "inline-block", background: "#ec4899", color: "white", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px" },
  bannerImageContainer: { flex: 1, textAlign: "center", minWidth: "320px" },
  bannerImage: { width: "100%", maxWidth: "500px", borderRadius: "16px", objectFit: "cover", boxShadow: "0 4px 18px rgba(0,0,0,0.12)" },
  searchForm: { width: "100%", maxWidth: "600px", margin: "30px auto", display: "flex", alignItems: "center", gap: "10px" },
  searchInput: { flex: 1, padding: "14px 18px", borderRadius: "10px", border: "1px solid #ddd", outline: "none", fontSize: "16px" },
  searchButton: { background: "#ec4899", color: "white", border: "none", padding: "14px 24px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "16px" },
  catCard: { width: "100%", maxWidth: "320px", borderRadius: "14px", overflow: "hidden", background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.08)", transition: "0.3s", display: "flex", flexDirection: "column" },
  catImage: { width: "100%", height: "220px", objectFit: "cover" },
  catBody: { padding: "22px", display: "flex", flexDirection: "column", flex: 1 },
  catTitle: { fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "10px" },
  catDescription: { color: "#666", fontSize: "15px", lineHeight: "24px", flex: 1, marginBottom: "20px" },
  catButton: { display: "inline-block", background: "#ec4899", color: "white", padding: "12px", borderRadius: "8px", textAlign: "center", textDecoration: "none", fontWeight: "600" },
  testCard: { width: "100%", maxWidth: "320px", background: "#ffffff", borderRadius: "16px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: "18px" },
  testTopSection: { display: "flex", alignItems: "center", gap: "15px" },
  testImage: { width: "65px", height: "65px", borderRadius: "50%", objectFit: "cover", border: "3px solid #ec4899" },
  testName: { fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "4px" },
  testLocation: { fontSize: "14px", color: "#777" },
  testStars: { color: "#f59e0b", fontSize: "18px", letterSpacing: "2px" },
  testReview: { color: "#555", fontSize: "15px", lineHeight: "26px", fontStyle: "italic" },
  testFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#888", marginTop: "10px", borderTop: "1px solid #eee", paddingTop: "15px" },
  testVerified: { color: "green", fontWeight: "600" },
  profCard: { width: "340px", background: "#ffffff", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center" },
  profImage: { width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "4px solid #ec4899", marginBottom: "20px" },
  profName: { fontSize: "26px", fontWeight: "700", color: "#333", marginBottom: "8px" },
  profEmail: { fontSize: "15px", color: "#777", marginBottom: "20px" },
  profInfoBox: { background: "#fafafa", borderRadius: "10px", padding: "15px", textAlign: "left" },
  profRow: { display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "15px" },
  profLabel: { fontWeight: "600", color: "#444" },
  profValue: { color: "#666" },
  featCard: { width: "260px", padding: "30px", borderRadius: "16px", background: "#ffffff", boxShadow: "0 3px 10px rgba(0,0,0,0.08)", textAlign: "center", transition: "0.3s" },
  featIcon: { fontSize: "50px", marginBottom: "20px", color: "#ec4899" },
  featTitle: { fontSize: "22px", fontWeight: "700", color: "#333", marginBottom: "12px" },
  featDescription: { color: "#666", lineHeight: "26px", fontSize: "15px" }
};