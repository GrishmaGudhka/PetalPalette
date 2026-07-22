// src/pages/MyOrders.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyOrders = () => {
  const navigate = useNavigate();

  /* ==========================================================
      State Variables
  ========================================================== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverButton, setHoverButton] = useState("");

  /* ==========================================================
      Fetch Orders
  ========================================================== */
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  /* ==========================================================
      Conditional Renders (Loading, Error, Empty)
  ========================================================== */
  if (loading) {
    return (
      <>
        <Header />
        <div style={styles.loadingPage}>
          <div style={styles.loader}></div>
          <h2 style={styles.loadingText}>Loading Your Orders...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div style={styles.page}>
          <div style={styles.container}>
            <div style={styles.errorBox}>{error}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div style={styles.emptyPage}>
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>📦</div>
            <h2 style={styles.emptyTitle}>No Orders Yet</h2>
            <p style={styles.emptyText}>Looks like you haven't placed any flower orders yet.</p>
            <button
              style={{
                ...styles.shopButton,
                background: hoverButton === "shop" ? "#db2777" : "#ec4899",
              }}
              onMouseEnter={() => setHoverButton("shop")}
              onMouseLeave={() => setHoverButton("")}
              onClick={() => navigate("/shopping")}
            >
              Start Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ==========================================================
      Main Render Layout
  ========================================================== */
  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          
          <div style={styles.heroSection}>
            <h1 style={styles.heroTitle}>My Orders</h1>
            <p style={styles.heroSubtitle}>
              View your complete order history, payment details, delivery address, purchased bouquets and current delivery status.
            </p>
          </div>

          <div style={styles.ordersContainer}>
            {orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                
                {/* Order Header */}
                <div style={styles.orderHeader}>
                  <div>
                    <h2 style={styles.orderNumber}>Order #{order._id.slice(-8)}</h2>
                    <p style={styles.orderDate}>
                      Ordered on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background:
                        order.status === "Delivered" ? "#dcfce7" : order.status === "Cancelled" ? "#fee2e2" : "#fef3c7",
                      color:
                        order.status === "Delivered" ? "#15803d" : order.status === "Cancelled" ? "#dc2626" : "#b45309",
                    }}
                  >
                    {order.status || "Processing"}
                  </div>
                </div>

                {/* Optional Grid Meta details if present on order object */}
                {(order.address || order.paymentType) && (
                  <div style={styles.infoGrid}>
                    {order.address && (
                      <div style={styles.infoBox}>
                        <h3 style={styles.infoHeading}>Delivery Address</h3>
                        <p style={styles.infoText}>{order.address}</p>
                        <p style={styles.infoText}>{order.city && `${order.city}, `}{order.state}</p>
                        {order.pincode && <p style={styles.infoText}>{order.pincode}</p>}
                      </div>
                    )}
                    {order.paymentType && (
                      <div style={styles.infoBox}>
                        <h3 style={styles.infoHeading}>Payment Method</h3>
                        <p style={styles.infoText}>{order.paymentType}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Ordered Items */}
                <div style={styles.itemsSection}>
                  <h3 style={styles.itemsTitle}>Ordered Items</h3>
                  {order.items.map((item, index) => (
                    <div key={index} style={styles.itemRow}>
                      <div>
                        <div style={styles.itemName}>{item.name}</div>
                        <div style={styles.itemQty}>Quantity : {item.quantity}</div>
                      </div>
                      <div style={styles.itemPrice}>
                        ₹ {Number(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>

                <hr style={styles.divider} />

                {/* Order Footer Summary Breakdown */}
                <div style={styles.orderFooter}>
                  <div>
                    <div style={styles.totalLabel}>Total Amount</div>
                    <div style={styles.totalAmount}>
                      ₹ {Number(order.totalAmount).toLocaleString("en-IN")}
                    </div>
                  </div>
                  {order.paymentType && <div style={styles.payment}>{order.paymentType}</div>}
                </div>

              </div>
            ))}
          </div>

          <div style={styles.bottomSection}>
            <button
              style={{
                ...styles.shopButton,
                background: hoverButton === "continue" ? "#db2777" : "#ec4899",
              }}
              onMouseEnter={() => setHoverButton("continue")}
              onMouseLeave={() => setHoverButton("")}
              onClick={() => navigate("/shopping")}
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;

/* ==========================================================
    Standalone Styles Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  loadingPage: { minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff8fb" },
  emptyPage: { minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff8fb", padding: "20px" },
  container: { maxWidth: "1100px", margin: "0 auto" },
  heroSection: { textAlign: "center", marginBottom: "45px" },
  heroTitle: { fontSize: "42px", color: "#ec4899", marginBottom: "10px", fontWeight: "700" },
  heroSubtitle: { color: "#666", fontSize: "18px", maxWidth: "650px", margin: "0 auto", lineHeight: "30px" },
  loader: { border: "5px solid #f3f3f3", borderTop: "5px solid #ec4899", borderRadius: "50%", width: "50px", height: "50px", animation: "spin 1s linear infinite", marginBottom: "20px" },
  loadingText: { fontSize: "20px", fontWeight: "600", color: "#ec4899" },
  errorBox: { background: "#fee2e2", color: "#dc2626", padding: "20px", borderRadius: "15px", textAlign: "center", fontWeight: "600", fontSize: "18px" },
  emptyCard: { background: "#ffffff", padding: "70px 40px", borderRadius: "20px", textAlign: "center", boxShadow: "0 8px 25px rgba(0,0,0,0.08)", maxWidth: "500px", width: "100%" },
  emptyIcon: { fontSize: "70px", marginBottom: "20px" },
  emptyTitle: { fontSize: "32px", color: "#333", marginBottom: "15px" },
  emptyText: { color: "#666", fontSize: "18px", marginBottom: "35px", lineHeight: "30px" },
  shopButton: { background: "#ec4899", color: "#fff", border: "none", padding: "14px 35px", borderRadius: "10px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  ordersContainer: { display: "flex", flexDirection: "column", gap: "30px" },
  orderCard: { background: "#ffffff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", marginBottom: "20px" },
  orderHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" },
  orderNumber: { fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "6px" },
  orderDate: { color: "#777", fontSize: "15px" },
  statusBadge: { padding: "10px 20px", borderRadius: "30px", fontWeight: "700", fontSize: "15px" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "25px", padding: "20px", background: "#fafafa", borderRadius: "12px" },
  infoBox: { display: "flex", flexDirection: "column", gap: "4px" },
  infoHeading: { fontSize: "15px", fontWeight: "700", color: "#555", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },
  infoText: { fontSize: "14px", color: "#666", margin: 0, lineHeight: "20px" },
  itemsSection: { display: "flex", flexDirection: "column", gap: "18px" },
  itemsTitle: { fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "5px" },
  itemRow: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "15px", borderBottom: "1px solid #f3f3f3" },
  itemName: { fontSize: "18px", fontWeight: "600", color: "#333" },
  itemQty: { color: "#777", marginTop: "6px", fontSize: "15px" },
  itemPrice: { fontSize: "18px", color: "#ec4899", fontWeight: "700" },
  divider: { border: "none", borderTop: "1px solid #ececec", margin: "25px 0" },
  orderFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" },
  totalLabel: { color: "#666", fontSize: "15px", marginBottom: "6px" },
  totalAmount: { fontSize: "30px", color: "#ec4899", fontWeight: "700" },
  payment: { background: "#fff0f6", color: "#ec4899", padding: "12px 20px", borderRadius: "12px", fontWeight: "600", fontSize: "15px" },
  bottomSection: { display: "flex", justifyContent: "center", marginTop: "40px" }
};