// src/pages/PaymentStatus.js

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ==========================================
      Payment Details
  ========================================== */
  const payment = location.state || {
    status: "Success",
    orderId: "PP20260001",
    paymentId: "PAY123456789",
    amount: 2499,
    paymentMethod: "UPI",
    customer: "Guest User",
    date: new Date().toLocaleString(),
  };

  /* ==========================================
      Hover States
  ========================================== */
  const [hoverOrders, setHoverOrders] = useState(false);
  const [hoverShop, setHoverShop] = useState(false);
  const [hoverRetry, setHoverRetry] = useState(false);

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          
          {/* ==========================================
              Payment Result Card
          ========================================== */}
          <div style={styles.statusCard}>
            
            {/* Status Icon Indicator */}
            <div style={styles.icon}>
              {payment.status === "Success" ? "✅" : payment.status === "Failed" ? "❌" : "⏳"}
            </div>

            {/* Status Heading Text */}
            <h1 style={styles.title}>
              {payment.status === "Success" ? "Payment Successful" : payment.status === "Failed" ? "Payment Failed" : "Payment Pending"}
            </h1>

            {/* Status Informational Subtitle */}
            <p style={styles.subtitle}>
              {payment.status === "Success" && "Thank you for shopping with PetalPalette. Your order has been placed successfully."}
              {payment.status === "Failed" && "Unfortunately your payment could not be completed. Please try again."}
              {payment.status === "Pending" && "Your payment is currently being verified. This may take a few minutes."}
            </p>

            {/* ==========================================
                Detailed Meta Invoicing Data Card
            ========================================== */}
            <div style={styles.detailsCard}>
              <h2 style={styles.detailsTitle}>Payment Details</h2>

              <div style={styles.detailRow}>
                <span style={styles.label}>Order ID</span>
                <span style={styles.value}>{payment.orderId}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Payment ID</span>
                <span style={styles.value}>{payment.paymentId}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Customer</span>
                <span style={styles.value}>{payment.customer}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Payment Method</span>
                <span style={styles.value}>{payment.paymentMethod}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Amount Paid</span>
                <span style={{ ...styles.value, color: "#ec4899", fontWeight: "700" }}>
                  ₹ {Number(payment.amount).toLocaleString("en-IN")}
                </span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Date & Time</span>
                <span style={styles.value}>{payment.date}</span>
              </div>
            </div>

            {/* ==========================================
                Dynamic Action Row Management Buttons
            ========================================== */}
            <div style={styles.buttonContainer}>
              {payment.status === "Success" && (
                <>
                  <button
                    style={{ ...styles.primaryButton, background: hoverOrders ? "#db2777" : "#ec4899" }}
                    onMouseEnter={() => setHoverOrders(true)}
                    onMouseLeave={() => setHoverOrders(false)}
                    onClick={() => navigate("/my-orders")}
                  >
                    View My Orders
                  </button>

                  <button
                    style={{
                      ...styles.secondaryButton,
                      background: hoverShop ? "#ec4899" : "#ffffff",
                      color: hoverShop ? "#ffffff" : "#ec4899",
                    }}
                    onMouseEnter={() => setHoverShop(true)}
                    onMouseLeave={() => setHoverShop(false)}
                    onClick={() => navigate("/shopping")}
                  >
                    Continue Shopping
                  </button>
                </>
              )}

              {payment.status === "Failed" && (
                <button
                  style={{ ...styles.primaryButton, background: hoverRetry ? "#dc2626" : "#ef4444" }}
                  onMouseEnter={() => setHoverRetry(true)}
                  onMouseLeave={() => setHoverRetry(false)}
                  onClick={() => navigate("/checkout")}
                >
                  Try Payment Again
                </button>
              )}

              {payment.status === "Pending" && (
                <button
                  style={{ ...styles.primaryButton, background: hoverOrders ? "#ca8a04" : "#eab308", color: "#ffffff" }}
                  onMouseEnter={() => setHoverOrders(true)}
                  onMouseLeave={() => setHoverOrders(false)}
                  onClick={() => navigate("/my-orders")}
                >
                  Check Order Status
                </button>
              )}
            </div>

            {/* ==========================================
                Helpful Post-Payment Next Step Hints
            ========================================== */}
            <div style={styles.infoCard}>
              <h2 style={styles.infoTitle}>What's Next?</h2>

              {payment.status === "Success" && (
                <>
                  <p style={styles.infoText}>• A confirmation email has been sent to your registered email address.</p>
                  <p style={styles.infoText}>• Your order is now being prepared by our floral designers.</p>
                  <p style={styles.infoText}>• You'll receive delivery updates once your bouquet is dispatched.</p>
                  <p style={styles.infoText}>• You can track your order anytime from the <strong>My Orders</strong> page.</p>
                </>
              )}

              {payment.status === "Failed" && (
                <>
                  <p style={styles.infoText}>• No amount has been deducted if the transaction failed.</p>
                  <p style={styles.infoText}>• If the amount was debited, it is usually refunded within 5–7 business days.</p>
                  <p style={styles.infoText}>• Please verify your payment details and try again.</p>
                </>
              )}

              {payment.status === "Pending" && (
                <>
                  <p style={styles.infoText}>• Your payment is currently under verification.</p>
                  <p style={styles.infoText}>• Please do not make another payment until the current transaction is completed.</p>
                  <p style={styles.infoText}>• If the status does not update within 30 minutes, please contact our support team.</p>
                </>
              )}
            </div>

            {/* ==========================================
                Customer Support Footer Card Block
            ========================================== */}
            <div style={styles.supportCard}>
              <h2 style={styles.supportTitle}>Need Help?</h2>
              <p style={styles.supportText}>
                Our customer support team is available to assist you with payment issues, delivery updates, or any questions regarding your order.
              </p>
              <div style={styles.supportDetails}>
                <p style={{ margin: "5px 0" }}>📞 +91 98765 43210</p>
                <p style={{ margin: "5px 0" }}>✉ support@petalpalette.com</p>
                <p style={{ margin: "5px 0" }}>🕘 Monday – Sunday | 9:00 AM – 9:00 PM</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentStatus;

/* ==========================================================
    Standalone Styles Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "900px", margin: "0 auto" },
  statusCard: { background: "#ffffff", borderRadius: "22px", padding: "45px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", textAlign: "center" },
  icon: { fontSize: "80px", marginBottom: "20px" },
  title: { fontSize: "38px", color: "#ec4899", fontWeight: "700", marginBottom: "15px" },
  subtitle: { color: "#666", fontSize: "17px", lineHeight: "30px", maxWidth: "650px", margin: "0 auto 40px" },
  detailsCard: { background: "#fff0f6", padding: "30px", borderRadius: "18px", textAlign: "left", marginBottom: "40px" },
  detailsTitle: { color: "#ec4899", fontSize: "26px", fontWeight: "700", marginBottom: "25px", textAlign: "center" },
  detailRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #f8c7dd", flexWrap: "wrap", gap: "10px" },
  label: { color: "#555", fontWeight: "600", fontSize: "16px" },
  value: { color: "#333", fontWeight: "500", fontSize: "16px", textAlign: "right" },
  buttonContainer: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "45px" },
  primaryButton: { border: "none", color: "#ffffff", padding: "15px 35px", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  secondaryButton: { border: "2px solid #ec4899", padding: "15px 35px", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  infoCard: { background: "#ffffff", borderRadius: "18px", padding: "30px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", textAlign: "left", marginBottom: "35px" },
  infoTitle: { color: "#ec4899", fontSize: "24px", fontWeight: "700", marginBottom: "20px" },
  infoText: { color: "#555", fontSize: "16px", lineHeight: "28px", marginBottom: "12px" },
  supportCard: { background: "#fff0f6", borderRadius: "18px", padding: "30px", textAlign: "center" },
  supportTitle: { color: "#ec4899", fontSize: "26px", fontWeight: "700", marginBottom: "18px" },
  supportText: { color: "#666", fontSize: "16px", lineHeight: "28px", marginBottom: "25px" },
  supportDetails: { color: "#333", fontSize: "16px", lineHeight: "32px", fontWeight: "500" }
};