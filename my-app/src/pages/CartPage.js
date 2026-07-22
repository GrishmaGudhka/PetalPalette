// src/pages/CartPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState("");

  /* ==========================================================
      Calculations
  ========================================================== */
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const deliveryCharge = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const gst = subtotal * 0.05;
  const discount = 0;
  const grandTotal = subtotal + deliveryCharge + gst - discount;

  /* ==========================================================
      Checkout
  ========================================================== */
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Heading */}
          <div style={styles.headingContainer}>
            <h1 style={styles.heading}>Shopping Cart</h1>
            <p style={styles.subHeading}>{`${cartItems.length} Item${cartItems.length !== 1 ? "Item" : "Items"} in your cart`}</p>
          </div>

          {cartItems.length === 0 ? (
            <div style={styles.emptyCart}>
              <div style={styles.emptyIcon}>🛒</div>
              <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
              <p style={styles.emptyText}>It looks like you haven't added any beautiful bouquets yet.</p>
              <Link to="/shopping" style={styles.shoppingButton}>Continue Shopping</Link>
            </div>
          ) : (
            <div style={styles.mainContent}>
              {/* Left Side */}
              <div style={styles.cartSection}>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.cartCard}>
                    {/* Product Image */}
                    <img src={item.image} alt={item.name} style={styles.productImage} />

                    {/* Product Details */}
                    <div style={styles.productInfo}>
                      <h2 style={styles.productName}>{item.name}</h2>
                      <p style={styles.productPrice}>₹ {Number(item.price).toLocaleString("en-IN")}</p>
                      <p style={styles.productCategory}>{item.category || "Flower Bouquet"}</p>

                      {/* Quantity */}
                      <div style={styles.quantityContainer}>
                        <span style={styles.quantityLabel}>Quantity</span>
                        <div style={styles.quantityBox}>
                          <button style={styles.quantityButton} onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>−</button>
                          <span style={styles.quantityValue}>{item.quantity}</span>
                          <button style={styles.quantityButton} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div style={styles.itemTotal}>
                        Total : <span style={styles.totalPrice}>₹ {(Number(item.price) * item.quantity).toLocaleString("en-IN")}</span>
                      </div>

                      {/* Remove */}
                      <button
                        style={{ ...styles.removeButton, background: hoveredButton === item.id ? "#db2777" : "#ec4899" }}
                        onMouseEnter={() => setHoveredButton(item.id)}
                        onMouseLeave={() => setHoveredButton("")}
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑 Remove Item
                      </button>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <div style={styles.continueShoppingContainer}>
                  <Link to="/shopping" style={styles.continueShopping}>← Continue Shopping</Link>
                </div>
              </div>

              <div style={styles.summarySection}>
                <div style={styles.summaryCard}>
                  <h2 style={styles.summaryTitle}>Order Summary</h2>
                  
                  <div style={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div style={styles.summaryRow}>
                    <span>Delivery Charges</span>
                    <span style={{ color: deliveryCharge === 0 ? "#16a34a" : "#333", fontWeight: "600" }}>
                      {deliveryCharge === 0 ? "FREE" : `₹ ${deliveryCharge}`}
                    </span>
                  </div>

                  <div style={styles.summaryRow}>
                    <span>GST (5%)</span>
                    <span>₹ {gst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div style={styles.summaryRow}>
                    <span>Discount</span>
                    <span>₹ {discount}</span>
                  </div>

                  <hr style={styles.divider} />

                  <div style={styles.totalRow}>
                    <span>Grand Total</span>
                    <span>₹ {grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div style={styles.deliveryBanner}>
                    🚚 {deliveryCharge === 0 ? " Congratulations! You have unlocked FREE Delivery." : " Spend ₹999 or more to get FREE Delivery."}
                  </div>

                  <button
                    style={{ ...styles.checkoutButton, background: hoveredButton === "checkout" ? "#db2777" : "#ec4899" }}
                    onMouseEnter={() => setHoveredButton("checkout")}
                    onMouseLeave={() => setHoveredButton("")}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "40px 20px" },
  container: { maxWidth: "1400px", margin: "0 auto" },
  headingContainer: { textAlign: "center", marginBottom: "45px" },
  heading: { fontSize: "42px", fontWeight: "700", color: "#222", marginBottom: "10px" },
  subHeading: { fontSize: "18px", color: "#777" },
  emptyCart: { background: "#ffffff", borderRadius: "20px", padding: "80px 40px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  emptyIcon: { fontSize: "80px", marginBottom: "20px" },
  emptyTitle: { fontSize: "34px", fontWeight: "700", color: "#333", marginBottom: "15px" },
  emptyText: { color: "#777", fontSize: "17px", marginBottom: "35px" },
  shoppingButton: { display: "inline-block", background: "#ec4899", color: "#fff", textDecoration: "none", padding: "15px 35px", borderRadius: "10px", fontWeight: "600", fontSize: "17px" },
  mainContent: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "35px", alignItems: "flex-start" },
  cartSection: { display: "flex", flexDirection: "column", gap: "25px" },
  summarySection: { alignSelf: "start" },
  cartCard: { display: "flex", gap: "25px", background: "#ffffff", borderRadius: "18px", padding: "25px", boxShadow: "0 6px 15px rgba(0,0,0,0.08)" },
  productImage: { width: "180px", height: "180px", objectFit: "cover", borderRadius: "16px" },
  productInfo: { flex: 1, display: "flex", flexDirection: "column" },
  productName: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "10px" },
  productPrice: { fontSize: "24px", color: "#ec4899", fontWeight: "700", marginBottom: "8px" },
  productCategory: { color: "#777", marginBottom: "25px" },
  quantityContainer: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" },
  quantityLabel: { fontWeight: "600", color: "#333" },
  quantityBox: { display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" },
  quantityButton: { width: "45px", height: "45px", border: "none", background: "#fafafa", cursor: "pointer", fontSize: "20px", fontWeight: "700" },
  quantityValue: { width: "60px", textAlign: "center", fontSize: "18px", fontWeight: "600" },
  itemTotal: { marginTop: "15px", marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#444" },
  totalPrice: { color: "#ec4899", fontWeight: "700", marginLeft: "8px", fontSize: "20px" },
  removeButton: { width: "180px", padding: "12px 18px", border: "none", borderRadius: "10px", color: "#ffffff", cursor: "pointer", fontWeight: "600", fontSize: "15px", transition: "0.3s" },
  continueShoppingContainer: { marginTop: "15px" },
  continueShopping: { display: "inline-block", textDecoration: "none", color: "#ec4899", fontWeight: "700", fontSize: "17px", transition: "0.3s" },
  summaryCard: { position: "sticky", top: "30px" },
  summaryTitle: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "30px", textAlign: "center" },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", fontSize: "17px", color: "#555" },
  divider: { border: "none", borderTop: "1px solid #e5e5e5", margin: "25px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "24px", fontWeight: "700", color: "#222", marginBottom: "25px" },
  deliveryBanner: { background: "#fdf2f8", border: "1px solid #f9a8d4", borderRadius: "10px", padding: "14px", color: "#be185d", fontSize: "15px", lineHeight: "24px", marginBottom: "25px" },
  checkoutButton: { width: "100%", padding: "16px", border: "none", borderRadius: "12px", color: "#ffffff", fontSize: "18px", fontWeight: "700", cursor: "pointer", transition: "0.3s" }
};