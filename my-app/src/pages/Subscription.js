// src/pages/Subscription.js

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Subscription = () => {
  const [frequency, setFrequency] = useState("monthly");
  const [tier, setTier] = useState("classic");
  const [vibe, setVibe] = useState("romantic");

  const tierDetails = {
    classic: {
      name: "Classic",
      price: 1499,
      flowers: "10–12 Fresh Seasonal Flowers",
      vase: "Standard Glass Vase",
      delivery: "Standard Delivery",
      description:
        "Perfect for homes, apartments and office desks. Fresh seasonal flowers handpicked daily.",
    },
    deluxe: {
      name: "Deluxe",
      price: 2799,
      flowers: "18–22 Premium Flowers",
      vase: "Premium Ceramic Vase",
      delivery: "Priority Delivery",
      description:
        "A luxurious bouquet featuring lilies, gerberas, carnations and imported eucalyptus.",
    },
    grand: {
      name: "Grand Luxury",
      price: 4499,
      flowers: "30+ Luxury Flowers",
      vase: "Luxury Crystal Vase",
      delivery: "Express Morning Delivery",
      description:
        "Our finest subscription with orchids, tulips, hydrangeas and exclusive imported flowers.",
    },
  };

  const frequencyPrice = {
    weekly: 1,
    biweekly: 0.95,
    monthly: 0.9,
  };

  const vibeDetails = {
    romantic: "❤️ Romantic Reds & Soft Pinks",
    boho: "🤎 Boho Chic",
    vibrant: "🌻 Vibrant Festival Colors",
    minimalist: "🤍 Elegant Minimal",
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    const finalPrice = Math.round(tierDetails[tier].price * frequencyPrice[frequency]);

    alert(
      `Subscription Added!\n\nPlan: ${tierDetails[tier].name}\nFrequency: ${frequency}\nPalette: ${vibeDetails[vibe]}\nPrice: ₹${finalPrice}`
    );

    // Future functionality:
    // Add subscription details to cart global state
    // navigate("/checkout");
  };

  return (
    <>
      <Header />

      <div style={styles.page}>
        {/* ================= HERO ================= */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>🌸 Floral Subscription Plans</h1>
          <p style={styles.heroSubtitle}>
            Fresh flowers delivered automatically to your doorstep. Choose your favourite plan and
            let every week bloom with happiness.
          </p>
          <button
            style={styles.heroButton}
            onClick={() => document.getElementById("plans").scrollIntoView({ behavior: "smooth" })}
          >
            Explore Plans
          </button>
        </section>

        <div style={styles.container}>
          {/* ================= Statistics ================= */}
          <section style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👨‍👩‍👧</div>
              <h2 style={styles.statNumber}>5,000+</h2>
              <p style={styles.statText}>Happy Subscribers</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🌸</div>
              <h2 style={styles.statNumber}>365</h2>
              <p style={styles.statText}>Fresh Deliveries</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🚚</div>
              <h2 style={styles.statNumber}>24 hrs</h2>
              <p style={styles.statText}>Same Day Delivery</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⭐</div>
              <h2 style={styles.statNumber}>4.9</h2>
              <p style={styles.statText}>Customer Rating</p>
            </div>
          </section>

          {/* ================= INTRO ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Choose a Subscription?</h2>
            <p style={styles.sectionSubtitle}>
              Whether you're decorating your home, brightening your workplace, or surprising someone
              special, our subscription service ensures fresh handcrafted bouquets are delivered
              automatically on your schedule.
            </p>
          </section>

          {/* ================= Subscription Configuration ================= */}
          <section id="plans" style={styles.section}>
            <h2 style={styles.sectionTitle}>Choose Your Subscription</h2>
            <p style={styles.sectionSubtitle}>
              Select your preferred delivery schedule and bouquet collection. You can change your plan
              anytime.
            </p>

            {/* Delivery Frequency Selection */}
            <h3 style={styles.subHeading}>Delivery Frequency</h3>
            <div style={styles.frequencyGrid}>
              {[
                { id: "weekly", title: "Weekly", subtitle: "Fresh flowers every week", icon: "📅" },
                { id: "biweekly", title: "Every 2 Weeks", subtitle: "Balanced freshness (5% Off)", icon: "🌼" },
                { id: "monthly", title: "Monthly", subtitle: "Perfect for homes (10% Off)", icon: "🌷" },
              ].map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.frequencyCard,
                    ...(frequency === item.id ? styles.activeCard : {}),
                  }}
                  onClick={() => setFrequency(item.id)}
                >
                  <div style={styles.frequencyIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Plans Selection */}
            <h3 style={styles.subHeading}>Subscription Plans</h3>
            <div style={styles.planGrid}>
              {Object.keys(tierDetails).map((key) => {
                const plan = tierDetails[key];
                return (
                  <div
                    key={key}
                    style={{
                      ...styles.planCard,
                      ...(tier === key ? styles.activeCard : {}),
                    }}
                    onClick={() => setTier(key)}
                  >
                    {key === "deluxe" && <div style={styles.badge}>⭐ Most Popular</div>}
                    <h2 style={styles.planTitle}>{plan.name}</h2>
                    <div style={styles.planPrice}>
                      ₹{Math.round(plan.price * frequencyPrice[frequency])}
                    </div>
                    <div style={styles.planSmall}>per delivery</div>
                    <ul style={styles.planList}>
                      <li>🌸 {plan.flowers}</li>
                      <li>🏺 {plan.vase}</li>
                      <li>🚚 {plan.delivery}</li>
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Selected Plan In-depth Details */}
            <div style={styles.detailsCard}>
              <h2 style={styles.detailsTitle}>📋 Selected Plan Overview</h2>
              <p style={styles.detailsDescription}>{tierDetails[tier].description}</p>
              <div style={styles.detailsGrid}>
                <div style={styles.detailBox}>
                  <strong>Flowers</strong>
                  <p style={styles.detailBoxText}>{tierDetails[tier].flowers}</p>
                </div>
                <div style={styles.detailBox}>
                  <strong>Vase Included</strong>
                  <p style={styles.detailBoxText}>{tierDetails[tier].vase}</p>
                </div>
                <div style={styles.detailBox}>
                  <strong>Delivery Mode</strong>
                  <p style={styles.detailBoxText}>{tierDetails[tier].delivery}</p>
                </div>
                <div style={styles.detailBox}>
                  <strong>Effective Rate</strong>
                  <p style={styles.detailBoxText}>
                    ₹{Math.round(tierDetails[tier].price * frequencyPrice[frequency])} / delivery
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= Floral Palette ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Choose Your Floral Palette</h2>
            <p style={styles.sectionSubtitle}>
              Personalize every delivery with a floral style that matches your personality and décor.
            </p>
            <div style={styles.vibeGrid}>
              {[
                { id: "romantic", icon: "❤️", title: "Romantic", desc: "Deep reds & soft pinks" },
                { id: "boho", icon: "🤎", title: "Boho Chic", desc: "Warm earthy neutrals" },
                { id: "vibrant", icon: "🌻", title: "Vibrant", desc: "Festival colours" },
                { id: "minimalist", icon: "🤍", title: "Minimal", desc: "Elegant white tones" },
              ].map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.vibeCard,
                    ...(vibe === item.id ? styles.activeCard : {}),
                  }}
                  onClick={() => setVibe(item.id)}
                >
                  <div style={styles.vibeIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= Subscription Summary ================= */}
          <section style={styles.section}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>📦 Subscription Summary</h2>
              <div style={styles.summaryRow}>
                <span>Plan</span>
                <strong>{tierDetails[tier].name} Tier</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Frequency</span>
                <strong>{frequency.charAt(0).toUpperCase() + frequency.slice(1)} Deliveries</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Aesthetic Palette</span>
                <strong>{vibeDetails[vibe]}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Logistics Tier</span>
                <strong>{tierDetails[tier].delivery}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Premium Vase Accent</span>
                <strong>{tierDetails[tier].vase}</strong>
              </div>
              <hr style={styles.divider} />
              <div style={styles.totalRow}>
                <span>Total Per Delivery</span>
                <strong>₹{Math.round(tierDetails[tier].price * frequencyPrice[frequency])}</strong>
              </div>
              <button style={styles.subscribeButton} onClick={handleSubscribe}>
                🌸 Add Subscription to Cart
              </button>
            </div>
          </section>

          {/* ================= Benefits ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Subscription Benefits</h2>
            <div style={styles.benefitsGrid}>
              <div style={styles.benefitCard}>
                <div style={styles.benefitIcon}>🚚</div>
                <h3 style={styles.benefitTitle}>Free Delivery</h3>
                <p style={styles.benefitText}>
                  Enjoy doorstep delivery without additional shipping charges.
                </p>
              </div>
              <div style={styles.benefitCard}>
                <div style={styles.benefitIcon}>🎁</div>
                <h3 style={styles.benefitTitle}>Exclusive Gifts</h3>
                <p style={styles.benefitText}>
                  Surprise floral accessories and seasonal gifts throughout the year.
                </p>
              </div>
              <div style={styles.benefitCard}>
                <div style={styles.benefitIcon}>🌷</div>
                <h3 style={styles.benefitTitle}>Premium Flowers</h3>
                <p style={styles.benefitText}>
                  Hand-selected fresh flowers sourced from trusted growers.
                </p>
              </div>
              <div style={styles.benefitCard}>
                <div style={styles.benefitIcon}>📅</div>
                <h3 style={styles.benefitTitle}>Flexible Schedule</h3>
                <p style={styles.benefitText}>
                  Pause, resume or modify your subscription whenever you like.
                </p>
              </div>
            </div>
          </section>

          {/* ================= Testimonials ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>What Our Subscribers Say</h2>
            <p style={styles.sectionSubtitle}>
              Thousands of flower lovers trust PetalPalette to brighten their homes and celebrate life's
              special moments.
            </p>
            <div style={styles.testimonialGrid}>
              <div style={styles.testimonialCard}>
                <div style={styles.stars}>★★★★★</div>
                <p style={styles.reviewText}>
                  "The flowers always arrive fresh and beautifully arranged. My living room feels alive
                  every single week!"
                </p>
                <h4 style={styles.reviewName}>— Riya Patel</h4>
              </div>
              <div style={styles.testimonialCard}>
                <div style={styles.stars}>★★★★★</div>
                <p style={styles.reviewText}>
                  "I subscribed for my parents and they absolutely love receiving fresh flowers every month."
                </p>
                <h4 style={styles.reviewName}>— Rahul Sharma</h4>
              </div>
              <div style={styles.testimonialCard}>
                <div style={styles.stars}>★★★★★</div>
                <p style={styles.reviewText}>
                  "The Deluxe plan is worth every rupee. Beautiful bouquets and excellent customer service."
                </p>
                <h4 style={styles.reviewName}>— Sneha Mehta</h4>
              </div>
            </div>
          </section>

          {/* ================= FAQ ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div style={styles.faqContainer}>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>Can I cancel anytime?</h3>
                <p style={styles.faqAnswer}>
                  Yes. You can pause or cancel your subscription whenever you like without additional charges.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>Can I change my plan later?</h3>
                <p style={styles.faqAnswer}>
                  Absolutely. Upgrade or downgrade your subscription at any time from your profile page.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>Are flowers always the same?</h3>
                <p style={styles.faqAnswer}>
                  No. Every delivery includes seasonal flowers to keep each bouquet unique and fresh.
                </p>
              </div>
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section style={styles.ctaSection}>
            <div style={styles.ctaCard}>
              <h2 style={styles.ctaTitle}>🌸 Never Miss Fresh Flowers Again</h2>
              <p style={styles.ctaText}>
                Let PetalPalette take care of your floral needs while you enjoy handcrafted bouquets
                delivered automatically to your doorstep.
              </p>
              <button
                style={styles.ctaButton}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                ↑ Back to Subscription Plans
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Subscription;

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px 80px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "90px 25px", borderRadius: "0 0 35px 35px", marginBottom: "70px" },
  heroTitle: { fontSize: "52px", fontWeight: "700", marginBottom: "18px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto 35px", fontSize: "19px", lineHeight: "34px" },
  heroButton: { background: "#fff", color: "#ec4899", border: "none", borderRadius: "12px", padding: "16px 34px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.2s ease-in-out" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "25px", marginBottom: "70px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "35px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  statIcon: { fontSize: "45px", marginBottom: "15px" },
  statNumber: { fontSize: "36px", color: "#ec4899", fontWeight: "700", marginBottom: "10px" },
  statText: { color: "#666", fontSize: "17px" },
  section: { marginBottom: "80px" },
  sectionTitle: { textAlign: "center", fontSize: "38px", fontWeight: "700", color: "#222", marginBottom: "15px" },
  sectionSubtitle: { maxWidth: "760px", margin: "0 auto 45px", textAlign: "center", color: "#666", fontSize: "17px", lineHeight: "30px" },
  subHeading: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "25px", marginTop: "35px" },
  activeCard: { border: "2px solid #ec4899", transform: "translateY(-4px)", boxShadow: "0 12px 25px rgba(236,72,153,.18)" },
  frequencyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px", marginBottom: "45px" },
  frequencyCard: { background: "#fff", border: "2px solid #eee", borderRadius: "18px", padding: "28px", textAlign: "center", cursor: "pointer", transition: "0.3s" },
  frequencyIcon: { fontSize: "42px", marginBottom: "12px" },
  cardTitle: { fontSize: "22px", color: "#333", fontWeight: "700", marginBottom: "10px" },
  cardText: { color: "#666", lineHeight: "26px", fontSize: "15px" },
  planGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "25px", marginTop: "20px", marginBottom: "40px" },
  planCard: { position: "relative", background: "#fff", border: "2px solid #eee", borderRadius: "22px", padding: "35px", cursor: "pointer", transition: "0.3s", boxShadow: "0 8px 18px rgba(0,0,0,.06)" },
  badge: { position: "absolute", top: "-12px", right: "18px", background: "#ec4899", color: "#fff", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "700" },
  planTitle: { fontSize: "30px", color: "#222", marginBottom: "12px", fontWeight: "700" },
  planPrice: { fontSize: "42px", color: "#ec4899", fontWeight: "700" },
  planSmall: { color: "#777", marginBottom: "22px", fontSize: "15px" },
  planList: { paddingLeft: "20px", color: "#555", lineHeight: "32px", fontSize: "16px" },
  detailsCard: { background: "#fff", borderRadius: "20px", padding: "35px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  detailsTitle: { fontSize: "30px", color: "#ec4899", marginBottom: "18px", fontWeight: "700" },
  detailsDescription: { color: "#555", lineHeight: "30px", fontSize: "16px", marginBottom: "28px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" },
  detailBox: { background: "#fff8fb", padding: "20px", borderRadius: "14px", border: "1px solid #f5d3e0" },
  detailBoxText: { margin: "5px 0 0", color: "#555", fontSize: "15px" },
  vibeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" },
  vibeCard: { background: "#fff", border: "2px solid #eee", borderRadius: "18px", padding: "28px", textAlign: "center", cursor: "pointer", transition: "0.3s", boxShadow: "0 6px 16px rgba(0,0,0,.06)" },
  vibeIcon: { fontSize: "48px", marginBottom: "14px" },
  summaryCard: { maxWidth: "700px", margin: "0 auto", background: "#fff", borderRadius: "22px", padding: "35px", boxShadow: "0 10px 24px rgba(0,0,0,.08)" },
  summaryTitle: { fontSize: "30px", color: "#ec4899", textAlign: "center", marginBottom: "30px", fontWeight: "700" },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f1f1f1", fontSize: "16px", color: "#555" },
  divider: { margin: "25px 0", border: "none", borderTop: "2px dashed #f3c1d8" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "22px", fontWeight: "700", color: "#222", marginBottom: "30px" },
  subscribeButton: { width: "100%", padding: "16px", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  benefitsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "25px" },
  benefitCard: { background: "#fff", borderRadius: "18px", padding: "30px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  benefitIcon: { fontSize: "48px", marginBottom: "18px" },
  benefitTitle: { fontSize: "22px", color: "#333", marginBottom: "12px", fontWeight: "700" },
  benefitText: { color: "#666", lineHeight: "28px", fontSize: "16px" },
  testimonialGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "25px" },
  testimonialCard: { background: "#fff", borderRadius: "18px", padding: "30px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  stars: { color: "#fbbf24", fontSize: "22px", marginBottom: "15px" },
  reviewText: { color: "#555", lineHeight: "30px", fontStyle: "italic", marginBottom: "20px" },
  reviewName: { color: "#ec4899", fontWeight: "700" },
  faqContainer: { display: "flex", flexDirection: "column", gap: "20px" },
  faqItem: { background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 6px 16px rgba(0,0,0,.06)" },
  faqQuestion: { color: "#333", fontSize: "21px", marginBottom: "10px", fontWeight: "700" },
  faqAnswer: { color: "#666", lineHeight: "30px", fontSize: "16px" },
  ctaSection: { marginTop: "80px", marginBottom: "60px" },
  ctaCard: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "70px 40px", borderRadius: "25px" },
  ctaTitle: { fontSize: "40px", fontWeight: "700", marginBottom: "18px" },
  ctaText: { maxWidth: "720px", margin: "0 auto 35px", fontSize: "18px", lineHeight: "32px" },
  ctaButton: { background: "#fff", color: "#ec4899", border: "none", borderRadius: "12px", padding: "16px 36px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
};