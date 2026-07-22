// src/pages/TrackOrder.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  // ================= Mock Orders =================
  const orders = {
    "PP-98375": {
      id: "PP-98375",
      customer: "Riya Patel",
      bouquet: "Premium Rose Bouquet",
      amount: "₹2,499",
      payment: "Paid",
      address: "Mumbai, Maharashtra",
      deliveryDate: "Tomorrow",
      deliveryTime: "2:00 PM - 5:00 PM",
      partner: "Rahul Sharma",
      status: "Out for Delivery",
    },
    "PP-56789": {
      id: "PP-56789",
      customer: "Sneha Mehta",
      bouquet: "Luxury Orchid Bouquet",
      amount: "₹4,999",
      payment: "Paid",
      address: "Pune, Maharashtra",
      deliveryDate: "Today",
      deliveryTime: "11:00 AM - 2:00 PM",
      partner: "Amit Verma",
      status: "Bouquet Being Prepared",
    },
    "PP-12345": {
      id: "PP-12345",
      customer: "Rahul Sharma",
      bouquet: "Sunflower Celebration",
      amount: "₹1,799",
      payment: "Cash on Delivery",
      address: "Ahmedabad, Gujarat",
      deliveryDate: "Tomorrow",
      deliveryTime: "10:00 AM - 1:00 PM",
      partner: "Not Assigned",
      status: "Order Confirmed",
    },
    "PP-11111": {
      id: "PP-11111",
      customer: "Priya Shah",
      bouquet: "Grand Luxury Subscription",
      amount: "₹4,499",
      payment: "Paid",
      address: "Surat, Gujarat",
      deliveryDate: "Delivered",
      deliveryTime: "Completed",
      partner: "Karan Patel",
      status: "Delivered",
    },
  };

  // ================= Timeline =================
  const stages = [
    "Order Confirmed",
    "Bouquet Being Prepared",
    "Out for Delivery",
    "Delivered",
  ];

  // ================= Track Order =================
  const handleTrackOrder = (e) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();

    if (!id) {
      alert("Please enter your Order ID.");
      return;
    }

    if (!id.startsWith("PP-")) {
      alert("Invalid Order ID.\nExample: PP-98375");
      return;
    }

    const foundOrder = orders[id];

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setOrder(null);
      alert("Order not found.");
    }
  };

  // ================= Progress =================
  const getStageStatus = (stage) => {
    return stages.indexOf(order.status) >= stages.indexOf(stage);
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        {/* ================= HERO ================= */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>📦 Track Your Order</h1>
          <p style={styles.heroSubtitle}>
            Enter your PetalPalette Order ID to view the latest delivery updates, bouquet details, payment information and estimated arrival time.
          </p>
        </section>

        <div style={styles.container}>
          {/* ================= TRACK FORM ================= */}
          <section style={styles.searchSection}>
            <form onSubmit={handleTrackOrder} style={styles.searchForm}>
              <input
                type="text"
                placeholder="Enter Order ID (Example: PP-98375)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.trackButton}>🔍 Track Order</button>
            </form>
          </section>

          {/* ================= EMPTY STATE ================= */}
          {!order && (
            <section style={styles.emptyState}>
              <div style={styles.emptyIcon}>📦</div>
              <h2 style={styles.emptyTitle}>Track Your Bouquet</h2>
              <p style={styles.emptyText}>
                Enter your Order ID above to check delivery progress, payment status, estimated arrival time and bouquet details.
              </p>
            </section>
          )}

          {/* ================= ORDER DETAILS ================= */}
          {order && (
            <>
              <section style={styles.summaryCard}>
                <h2 style={styles.summaryTitle}>Order Summary</h2>
                <div style={styles.summaryGrid}>
                  <div style={styles.summaryItem}>
                    <span style={styles.label}>Order ID</span>
                    <strong>{order.id}</strong>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.label}>Customer</span>
                    <strong>{order.customer}</strong>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.label}>Bouquet</span>
                    <strong>{order.bouquet}</strong>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.label}>Amount</span>
                    <strong>{order.amount}</strong>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.label}>Payment</span>
                    <strong style={{ color: order.payment === "Paid" ? "#16a34a" : "#f97316" }}>{order.payment}</strong>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.label}>Current Status</span>
                    <strong style={{ color: "#ec4899" }}>{order.status}</strong>
                  </div>
                </div>
              </section>

              {/* ================= ORDER TIMELINE ================= */}
              <section style={styles.timelineSection}>
                <h2 style={styles.sectionTitle}>Delivery Progress</h2>
                <div style={styles.timeline}>
                  {stages.map((stage, index) => {
                    const completed = getStageStatus(stage);
                    const current = order.status === stage;

                    return (
                      <div key={index} style={styles.timelineItem}>
                        <div style={{ ...styles.timelineCircle, backgroundColor: completed ? "#ec4899" : "#ddd" }}>
                          {completed ? "✓" : index + 1}
                        </div>
                        <div style={styles.timelineContent}>
                          <h3 style={{ ...styles.timelineTitle, color: current ? "#ec4899" : "#333" }}>{stage}</h3>
                          <p style={styles.timelineText}>{current ? "Current Status" : completed ? "Completed" : "Pending"}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ================= DELIVERY DETAILS ================= */}
              <section style={styles.detailsGrid}>
                <div style={styles.infoCard}>
                  <h2 style={styles.cardHeading}>🚚 Delivery Information</h2>
                  <div style={styles.infoRow}>
                    <span>Estimated Delivery</span>
                    <strong>{order.deliveryDate}</strong>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Delivery Time</span>
                    <strong>{order.deliveryTime}</strong>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Delivery Partner</span>
                    <strong>{order.partner}</strong>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Delivery Address</span>
                    <strong>{order.address}</strong>
                  </div>
                </div>

                <div style={styles.infoCard}>
                  <h2 style={styles.cardHeading}>💳 Payment Information</h2>
                  <div style={styles.infoRow}>
                    <span>Payment Status</span>
                    <strong style={{ color: order.payment === "Paid" ? "#16a34a" : "#f97316" }}>{order.payment}</strong>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Order Value</span>
                    <strong>{order.amount}</strong>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Order Type</span>
                    <strong>Bouquet Delivery</strong>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Support</span>
                    <strong>support@petalpalette.com</strong>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackOrder;

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "80px 20px", borderRadius: "0 0 30px 30px", marginBottom: "60px" },
  heroTitle: { fontSize: "50px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto", fontSize: "18px", lineHeight: "32px" },
  searchSection: { marginBottom: "50px" },
  searchForm: { display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" },
  input: { flex: "1", minWidth: "280px", maxWidth: "600px", padding: "16px 20px", border: "2px solid #f2d5df", borderRadius: "12px", fontSize: "16px", outline: "none" },
  trackButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "12px", padding: "16px 30px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },
  emptyState: { background: "#fff", borderRadius: "20px", padding: "70px 30px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  emptyIcon: { fontSize: "70px", marginBottom: "20px" },
  emptyTitle: { fontSize: "34px", color: "#222", marginBottom: "15px", fontWeight: "700" },
  emptyText: { maxWidth: "550px", margin: "0 auto", color: "#666", lineHeight: "30px", fontSize: "17px" },
  summaryCard: { background: "#fff", borderRadius: "20px", padding: "35px", marginBottom: "50px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  summaryTitle: { textAlign: "center", color: "#ec4899", fontSize: "32px", fontWeight: "700", marginBottom: "30px" },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" },
  summaryItem: { background: "#fff8fb", padding: "20px", borderRadius: "14px", border: "1px solid #f3d4df" },
  label: { display: "block", color: "#888", marginBottom: "8px", fontSize: "14px" },
  timelineSection: { background: "#fff", padding: "35px", borderRadius: "20px", marginBottom: "50px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  sectionTitle: { textAlign: "center", fontSize: "32px", color: "#222", marginBottom: "35px", fontWeight: "700" },
  timeline: { display: "flex", flexDirection: "column", gap: "28px" },
  timelineItem: { display: "flex", alignItems: "center", gap: "20px" },
  timelineCircle: { width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "18px", flexShrink: 0 },
  timelineContent: { flex: 1, borderBottom: "1px solid #f1f1f1", paddingBottom: "16px" },
  timelineTitle: { fontSize: "20px", fontWeight: "700", marginBottom: "6px" },
  timelineText: { color: "#666", fontSize: "15px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "25px", marginBottom: "50px" },
  infoCard: { background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  cardHeading: { fontSize: "26px", color: "#ec4899", fontWeight: "700", marginBottom: "25px" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f2f2f2", fontSize: "16px", color: "#555" },
  button: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "12px", padding: "15px 28px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  secondaryButton: { background: "#fff", color: "#ec4899", border: "2px solid #ec4899", borderRadius: "12px", padding: "15px 28px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  statusBadge: { display: "inline-block", padding: "8px 18px", borderRadius: "20px", background: "#fde7f1", color: "#ec4899", fontWeight: "700", fontSize: "14px" },
  divider: { border: "none", borderTop: "1px solid #eee", margin: "20px 0" },
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
  textMuted: { color: "#777" },
  highlight: { color: "#ec4899", fontWeight: "700" },
  success: { color: "#16a34a", fontWeight: "700" },
  warning: { color: "#f97316", fontWeight: "700" },
  danger: { color: "#dc2626", fontWeight: "700" }
};