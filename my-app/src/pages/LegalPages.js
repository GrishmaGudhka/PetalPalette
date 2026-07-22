// src/pages/LegalPages.js

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ==========================================================
   Reusable Layout Component
========================================================== */
const LegalLayout = ({ title, lastUpdated, children }) => {
  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <h1 style={styles.heroTitle}>{title}</h1>
            <p style={styles.heroSubtitle}>Last Updated : {lastUpdated}</p>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

/* ==========================================================
   Refund & Substitution Policy
========================================================== */
export const Policies = () => {
  return (
    <LegalLayout title="Refund & Substitution Policy" lastUpdated="June 2026">
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>1. Perishable Goods</h2>
        <p style={styles.cardText}>Flowers are natural and highly perishable products. Because every bouquet is freshly handcrafted after an order is placed, flowers cannot be resold or returned once delivered.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>2. Quality Guarantee</h2>
        <p style={styles.cardText}>We carefully inspect every bouquet before dispatch. If your flowers arrive damaged, wilted or in poor condition, please contact our support team within <strong> 24 hours </strong> of delivery along with your Order ID and clear photographs.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>3. Refund Eligibility</h2>
        <p style={styles.cardText}>After reviewing the issue, PetalPalette may provide one of the following:</p>
        <ul style={styles.list}>
          <li>Free replacement bouquet</li>
          <li>Store credit for future purchases</li>
          <li>Partial or full refund (where applicable)</li>
        </ul>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>4. Seasonal Flower Substitution</h2>
        <p style={styles.cardText}>Due to seasonal availability, certain flower varieties may occasionally be unavailable. When this happens, our floral designers substitute them with flowers of equal or higher value while maintaining the same colour palette, bouquet size and overall design.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>5. Cancellation Policy</h2>
        <p style={styles.cardText}>Orders may be cancelled before bouquet preparation begins. Once the flowers have been arranged or dispatched for delivery, cancellations cannot be accepted because of the perishable nature of our products.</p>
      </div>
    </LegalLayout>
  );
};

/* ==========================================================
   Terms & Conditions
========================================================== */
export const TermsAndConditions = () => {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="June 2026">
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>1. Acceptance of Terms</h2>
        <p style={styles.cardText}>By accessing or using the PetalPalette website, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, please discontinue the use of our services.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>2. Product Availability</h2>
        <p style={styles.cardText}>All bouquets, floral arrangements and gifts are subject to seasonal availability. While we strive to match every order exactly, substitutions may occasionally be necessary to maintain quality and freshness.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>3. Pricing & Payment</h2>
        <p style={styles.cardText}>All prices displayed on our website are in Indian Rupees (₹). Payments must be completed successfully before an order enters the preparation stage.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>4. Delivery Policy</h2>
        <p style={styles.cardText}>Delivery times are estimates and may vary due to weather conditions, traffic or unforeseen operational circumstances. PetalPalette is not responsible for delays caused by incorrect delivery information provided by customers.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>5. Intellectual Property</h2>
        <p style={styles.cardText}>All website content including logos, product images, floral designs, graphics and text are the intellectual property of PetalPalette and may not be copied, reproduced or distributed without prior written permission.</p>
      </div>
    </LegalLayout>
  );
};

/* ==========================================================
   Privacy Policy
========================================================== */
export const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 2026">
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>1. Information We Collect</h2>
        <p style={styles.cardText}>We collect information such as your name, email address, phone number, delivery address and order history to process purchases and provide customer support.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>2. How We Use Your Information</h2>
        <p style={styles.cardText}>Your information is used to process orders, provide delivery updates, improve our services and communicate important information related to your purchases.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>3. Data Security</h2>
        <p style={styles.cardText}>We implement appropriate security measures to protect your personal information against unauthorized access, misuse or disclosure.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>4. Sharing Information</h2>
        <p style={styles.cardText}>PetalPalette never sells your personal information. Limited information may be shared only with trusted delivery partners for order fulfillment or when required by law.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>5. Your Rights</h2>
        <p style={styles.cardText}>You may request to update, correct or delete your personal information by contacting our customer support team. We will respond to your request within a reasonable period.</p>
      </div>
    </LegalLayout>
  );
};

/* ==========================================================
   Disclaimer
========================================================== */
export const Disclaimer = () => {
  return (
    <LegalLayout title="Legal Disclaimer" lastUpdated="June 2026">
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>1. Product Images</h2>
        <p style={styles.cardText}>Images displayed on the PetalPalette website are for illustration purposes only. Since flowers are natural products, colours, bloom sizes and arrangements may vary slightly depending on seasonal availability.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>2. Flower Allergies</h2>
        <p style={styles.cardText}>Some flowers naturally contain pollen or strong fragrances that may cause allergic reactions. Customers should inform us of any allergies before placing an order.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>3. Website Information</h2>
        <p style={styles.cardText}>While every effort is made to ensure the accuracy of information published on our website, PetalPalette does not guarantee that all content is completely error-free or continuously available.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>4. External Links</h2>
        <p style={styles.cardText}>Our website may contain links to third-party websites for additional services or payment processing. PetalPalette is not responsible for the privacy practices or content of external websites.</p>
      </div>
    </LegalLayout>
  );
};

/* ==========================================================
   FAQ & Delivery Information
========================================================== */
export const FAQ = () => {
  return (
    <LegalLayout title="Frequently Asked Questions" lastUpdated="June 2026">
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Do you offer same-day delivery?</h2>
        <p style={styles.cardText}>Yes. Same-day delivery is available for selected locations when orders are placed before our daily cut-off time.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>What if the recipient is not available?</h2>
        <p style={styles.cardText}>Our delivery executive will contact the recipient. If they are unavailable, the bouquet may be left with a neighbour, security desk or reception whenever it is safe to do so.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Can I customize my bouquet?</h2>
        <p style={styles.cardText}>Absolutely. PetalPalette specializes in custom floral arrangements where you can choose flower types, colours, wrapping style and add-ons.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Which cities do you deliver to?</h2>
        <p style={styles.cardText}>We currently deliver across Mumbai, Navi Mumbai, Thane and selected nearby locations. Additional cities will be added soon.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>How can I contact customer support?</h2>
        <p style={styles.cardText}>You can reach our customer support team by email, phone or through the Contact Us page. We are available Monday to Saturday from 9:00 AM to 8:00 PM.</p>
      </div>
    </LegalLayout>
  );
};

// Default export wrapper mapping out individual legal pages
const LegalPages = { Policies, TermsAndConditions, PrivacyPolicy, Disclaimer, FAQ };
export default LegalPages;

/* ==========================================================
   Standalone Styles Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "40px 20px 60px" },
  container: { maxWidth: "1000px", margin: "0 auto" },
  hero: { textAlign: "center", marginBottom: "40px" },
  heroTitle: { fontSize: "42px", fontWeight: "700", color: "#ec4899", marginBottom: "12px" },
  heroSubtitle: { fontSize: "16px", color: "#777", marginBottom: "10px" },
  card: { background: "#ffffff", borderRadius: "16px", padding: "28px", marginBottom: "25px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", borderLeft: "6px solid #ec4899", transition: "0.3s ease" },
  cardTitle: { fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "15px" },
  cardText: { fontSize: "16px", color: "#555", lineHeight: "30px" },
  list: { marginTop: "15px", paddingLeft: "22px", color: "#555", lineHeight: "30px", fontSize: "16px" },
};