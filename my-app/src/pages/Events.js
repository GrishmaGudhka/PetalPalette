// src/pages/Events.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Events = () => {
  /* Form State */
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", eventType: "Wedding", eventDate: "", venue: "", guests: "", budget: "", message: "" 
  });

  const [submitted, setSubmitted] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);

  /* Handle Input */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Submit Form */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", eventType: "Wedding", eventDate: "", venue: "", guests: "", budget: "", message: "" });
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <h1 style={styles.heroTitle}>Floral Event Planning</h1>
            <p style={styles.heroSubtitle}>
              Transform your celebrations into unforgettable memories with our premium floral decorations,
              customized bouquets and elegant event styling.
            </p>
          </div>

          {/* Event Services */}
          <div style={styles.serviceGrid}>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>💍</div>
              <h3 style={styles.serviceTitle}>Wedding Decoration</h3>
              <p style={styles.serviceText}>Luxury floral arrangements for weddings, receptions and engagements.</p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🎂</div>
              <h3 style={styles.serviceTitle}>Birthday Celebrations</h3>
              <p style={styles.serviceText}>Bright and colourful flower themes for birthdays of every age.</p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🏢</div>
              <h3 style={styles.serviceTitle}>Corporate Events</h3>
              <p style={styles.serviceText}>Elegant floral décor for offices, conferences and business events.</p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>❤️</div>
              <h3 style={styles.serviceTitle}>Anniversary & Special Events</h3>
              <p style={styles.serviceText}>Romantic floral arrangements for anniversaries and private celebrations.</p>
            </div>
          </div>

          {/* Main Layout */}
          <div style={styles.layout}>
            
            {/* Consultation Form */}
            <div style={styles.formCard}>
              <h2 style={styles.sectionTitle}>Book Your Consultation</h2>
              
              <form onSubmit={handleSubmit}>
                <label style={styles.label}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" style={styles.input} required />

                <label style={styles.label}>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" style={styles.input} required />

                <label style={styles.label}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" style={styles.input} required />

                <label style={styles.label}>Event Type</label>
                <select name="eventType" value={formData.eventType} onChange={handleChange} style={styles.select}>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Corporate Event</option>
                  <option>Baby Shower</option>
                  <option>Engagement</option>
                  <option>Festival Decoration</option>
                  <option>Other</option>
                </select>

                <label style={styles.label}>Event Date</label>
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} style={styles.input} required />

                <label style={styles.label}>Venue Location</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="City, State" style={styles.input} required />

                <label style={styles.label}>Expected Guests</label>
                <input type="number" name="guests" value={formData.guests} onChange={handleChange} placeholder="Approximate number of guests" style={styles.input} required />

                <label style={styles.label}>Estimated Budget (₹)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="Enter your estimated budget" style={styles.input} required />

                <label style={styles.label}>Special Requirements</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your theme, flower preferences or any special requests..." rows={6} style={styles.textarea} />

                <button type="submit" style={{ ...styles.button, background: hoverButton ? "#db2777" : "#ec4899" }} onMouseEnter={() => setHoverButton(true)} onMouseLeave={() => setHoverButton(false)}>
                  Book Free Consultation
                </button>
              </form>

              {submitted && (
                <div style={styles.successCard}>
                  <div style={styles.successIcon}>✔</div>
                  <h3 style={styles.successTitle}>Consultation Request Submitted</h3>
                  <p style={styles.successText}>
                    Thank you for choosing <strong>PetalPalette</strong>.<br />
                    Our floral designer will contact you within 24 hours to discuss your event.
                  </p>
                </div>
              )}
            </div>

            {/* Why Choose Us Info Panel */}
            <div style={styles.infoCard}>
              <h2 style={styles.sectionTitle}>Why Choose PetalPalette?</h2>
              
              <div style={styles.featureItem}>🌸 Premium Fresh Flowers</div>
              <div style={styles.featureItem}>🎨 Fully Customized Floral Designs</div>
              <div style={styles.featureItem}>🚚 Timely Delivery & Installation</div>
              <div style={styles.featureItem}>💐 Experienced Floral Designers</div>
              <div style={styles.featureItem}>💝 Affordable Packages</div>
              <div style={styles.featureItem}>⭐ 100% Customer Satisfaction</div>

              <div style={styles.quoteBox}>
                <h3 style={styles.quoteTitle}>Our Promise</h3>
                <p style={styles.quoteText}>Every celebration deserves beautiful flowers. We carefully design each event to match your vision, theme and budget.</p>
              </div>
            </div>

          </div>

          {/* Specialization Section */}
          <div style={styles.eventSection}>
            <h2 style={styles.sectionTitle}>We Specialize In</h2>
            <div style={styles.eventGrid}>
              <div style={styles.eventCard}>
                <div style={styles.eventIcon}>💒</div>
                <h3 style={styles.eventTitle}>Wedding Decoration</h3>
                <p style={styles.eventText}>Elegant floral decorations for weddings, receptions and engagement ceremonies.</p>
              </div>

              <div style={styles.eventCard}>
                <div style={styles.eventIcon}>🏢</div>
                <h3 style={styles.eventTitle}>Corporate Events</h3>
                <p style={styles.eventText}>Professional floral arrangements for offices, conferences and business events.</p>
              </div>

              <div style={styles.eventCard}>
                <div style={styles.eventIcon}>🎉</div>
                <h3 style={styles.eventTitle}>Private Celebrations</h3>
                <p style={styles.eventText}>Birthdays, anniversaries, baby showers and every special celebration.</p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div style={styles.faqSection}>
            <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
            
            <div style={styles.faqCard}>
              <h3 style={styles.question}>Do you offer same-day event decoration?</h3>
              <p style={styles.answer}>Same-day decoration depends on the event size and flower availability. Please contact us in advance.</p>
            </div>

            <div style={styles.faqCard}>
              <h3 style={styles.question}>Can I customize the flower arrangements?</h3>
              <p style={styles.answer}>Yes. Every event package is fully customizable according to your preferred flowers, colours, theme and budget.</p>
            </div>

            <div style={styles.faqCard}>
              <h3 style={styles.question}>How early should I book?</h3>
              <p style={styles.answer}>We recommend booking at least 2–4 weeks before your event for the best availability.</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;

/* JavaScript Styles Definition Object */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  heroSection: { textAlign: "center", marginBottom: "50px" },
  heroTitle: { fontSize: "42px", fontWeight: "700", color: "#222", marginBottom: "15px" },
  heroSubtitle: { fontSize: "18px", color: "#666", lineHeight: "30px", maxWidth: "700px", margin: "0 auto" },
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "50px" },
  serviceCard: { background: "#ffffff", padding: "25px", borderRadius: "14px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  serviceIcon: { fontSize: "36px", marginBottom: "12px" },
  serviceTitle: { fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "8px" },
  serviceText: { fontSize: "14px", color: "#666", lineHeight: "22px" },
  layout: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "35px" },
  formCard: { background: "#ffffff", padding: "35px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "25px" },
  label: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" },
  input: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px", fontSize: "15px", outline: "none", boxSizing: "border-box" },
  select: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px", fontSize: "15px", outline: "none", background: "#fff", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px", fontSize: "15px", outline: "none", resize: "vertical", boxSizing: "border-box" },
  button: { width: "100%", padding: "16px", border: "none", borderRadius: "12px", color: "#ffffff", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  successCard: { marginTop: "25px", background: "#ecfdf5", color: "#166534", border: "1px solid #86efac", padding: "20px", borderRadius: "12px", textAlign: "center" },
  successIcon: { fontSize: "36px", marginBottom: "8px" },
  successTitle: { fontSize: "20px", fontWeight: "700", marginBottom: "6px" },
  successText: { fontSize: "15px", lineHeight: "24px" },
  infoCard: { background: "#ffffff", padding: "30px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", height: "fit-content" },
  featureItem: { fontSize: "16px", color: "#444", marginBottom: "14px", fontWeight: "500" },
  quoteBox: { marginTop: "30px", padding: "20px", background: "#fff0f6", borderRadius: "12px", borderLeft: "4px solid #ec4899" },
  quoteTitle: { fontSize: "18px", fontWeight: "700", color: "#db2777", marginBottom: "8px" },
  quoteText: { fontSize: "14px", color: "#666", lineHeight: "22px", fontStyle: "italic" },
  eventSection: { marginTop: "70px" },
  eventGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", marginTop: "25px" },
  eventCard: { background: "#ffffff", padding: "30px", borderRadius: "18px", textAlign: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" },
  eventIcon: { fontSize: "45px", marginBottom: "15px" },
  eventTitle: { fontSize: "22px", color: "#333", marginBottom: "12px" },
  eventText: { color: "#666", lineHeight: "26px" },
  faqSection: { marginTop: "70px", marginBottom: "30px" },
  faqTitle: { fontSize: "32px", fontWeight: "700", color: "#323232", textAlign: "center", marginBottom: "35px" },
  faqCard: { background: "#ffffff", padding: "24px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" },
  question: { fontSize: "18px", fontWeight: "700", color: "#222", marginBottom: "10px" },
  answer: { fontSize: "15px", color: "#555", lineHeight: "24px" }
};