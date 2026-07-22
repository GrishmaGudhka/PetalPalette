// src/pages/FlowerCare.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const flowerTips = [
  { icon: "✂️", title: "Trim the Stems", description: "Cut 1–2 inches off the stems at a 45° angle before placing flowers into clean water. This improves water absorption and helps flowers stay fresh longer." },
  { icon: "💧", title: "Change Water Daily", description: "Replace the vase water every day and rinse the vase thoroughly. Fresh water prevents bacteria from growing and keeps flowers healthy." },
  { icon: "🍃", title: "Remove Lower Leaves", description: "Any leaves sitting below the waterline should be removed. This prevents rotting and keeps the water cleaner for longer." },
  { icon: "☀️", title: "Keep Away From Heat", description: "Avoid direct sunlight, kitchen heat, air conditioners and ceiling fans. Flowers stay fresh much longer in cool surroundings." },
  { icon: "🌸", title: "Use Flower Food", description: "Add the flower food packet provided with your bouquet. It supplies nutrients while preventing bacterial growth." },
  { icon: "🍎", title: "Keep Away From Fruits", description: "Ripening fruits release ethylene gas, which causes flowers to wilt much faster." }
];

const extraTips = [
  "Mist delicate petals with water once daily.",
  "Wash the vase before refilling fresh water.",
  "Remove wilted flowers immediately.",
  "Re-cut stems every 2–3 days.",
  "Display flowers in a cool room.",
  "Avoid placing bouquets near electronic appliances."
];

const faqs = [
  { question: "How long do fresh flowers last?", answer: "Most bouquets stay fresh for 5–10 days with proper care." },
  { question: "Should I refrigerate my flowers?", answer: "Yes. Keeping flowers in a cool place overnight can significantly extend their freshness." },
  { question: "Can I use sugar instead of flower food?", answer: "Flower food is recommended because it contains nutrients and antibacterial agents that plain sugar cannot provide." }
];

export default function FlowerCare() {
  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <div style={styles.heroIcon}>🌸</div>
            <h1 style={styles.heroTitle}>Flower Care Guide</h1>
            <p style={styles.heroSubtitle}>Keep your beautiful PetalPalette bouquets fresh, vibrant and blooming for as long as possible with our expert flower care tips.</p>
          </div>

          {/* Care Tips */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Essential Flower Care Tips</h2>
            <div style={styles.tipGrid}>
              {flowerTips.map((tip, index) => (
                <div key={index} style={styles.tipCard}>
                  <div style={styles.tipIcon}>{tip.icon}</div>
                  <h3 style={styles.tipTitle}>{tip.title}</h3>
                  <p style={styles.tipText}>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Care Tips */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Extra Care Tips</h2>
            <div style={styles.extraTipsCard}>
              {extraTips.map((tip, index) => (
                <div key={index} style={styles.extraTip}>
                  <span style={styles.checkIcon}>✔</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqCard}>
                <h3 style={styles.faqQuestion}>{faq.question}</h3>
                <p style={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  heroSection: { textAlign: "center", marginBottom: "60px" },
  heroIcon: { fontSize: "70px", marginBottom: "20px" },
  heroTitle: { fontSize: "44px", fontWeight: "700", color: "#222", marginBottom: "18px" },
  heroSubtitle: { fontSize: "18px", color: "#666", lineHeight: "32px", maxWidth: "700px", margin: "0 auto" },
  section: { marginBottom: "70px" },
  sectionTitle: { fontSize: "34px", textAlign: "center", color: "#333", marginBottom: "35px", fontWeight: "700" },
  tipGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "30px" },
  tipCard: { background: "#ffffff", padding: "30px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", transition: "0.3s", textAlign: "center" },
  tipIcon: { fontSize: "50px", marginBottom: "20px" },
  tipTitle: { fontSize: "24px", color: "#ec4899", fontWeight: "700", marginBottom: "15px" },
  tipText: { color: "#666", lineHeight: "28px", fontSize: "16px" },
  extraTipsCard: { background: "#ffffff", padding: "35px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "18px" },
  extraTip: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", fontSize: "17px", color: "#444" },
  checkIcon: { color: "#ec4899", fontSize: "22px", fontWeight: "700" },
  faqCard: { background: "#ffffff", padding: "28px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", marginBottom: "25px" },
  faqQuestion: { fontSize: "22px", fontWeight: "700", color: "#ec4899", marginBottom: "12px" },
  faqAnswer: { fontSize: "16px", color: "#666", lineHeight: "28px" },
  mobileNotice: { display: "none" }
};