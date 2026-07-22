// src/pages/CheckoutPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  /* User Details */
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /* Delivery Details */
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  /* Payment Details */
  const [paymentType, setPaymentType] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("");

  /* Load Logged In User */
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (!storedUserId) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    setUserId(storedUserId);
    setName(storedName || "");
    setEmail(storedEmail || "");
  }, [navigate]);

  /* Price Calculation */
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const deliveryCharge = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const gst = subtotal * 0.05;
  const discount = 0;
  const grandTotal = subtotal + deliveryCharge + gst - discount;

  /* Place Order */
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      userId,
      customerName: name,
      customerEmail: email,
      address,
      city,
      state,
      pincode,
      paymentType,
      subtotal,
      deliveryCharge,
      gst,
      discount,
      totalAmount: grandTotal,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      if (response.status === 201) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  /* Empty Cart View */
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div style={styles.emptyPage}>
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>🛒</div>
            <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
            <p style={styles.emptyText}>
              Add some beautiful bouquets before proceeding to checkout.
            </p>
            <Link to="/shopping" style={styles.shoppingButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* Main Checkout Page View */
  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.pageHeader}>
            <h1 style={styles.title}>Checkout</h1>
            <p style={styles.subtitle}>Complete your order securely.</p>
          </div>

          {/* Form wraps the entire layout so inputs match with the submit button */}
          <form onSubmit={handlePlaceOrder} style={styles.checkoutGrid}>
            {/* Billing Details */}
            <div style={styles.formCard}>
              <h2 style={styles.sectionTitle}>Billing Details</h2>

              {/* Full Name */}
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={styles.input}
                required
              />

              {/* Email */}
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={styles.input}
                required
              />

              {/* Address */}
              <label style={styles.label}>Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No., Building, Street..."
                style={styles.textarea}
                required
              />

              {/* City */}
              <label style={styles.label}>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                style={styles.input}
                required
              />

              {/* State */}
              <label style={styles.label}>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
                style={styles.input}
                required
              />

              {/* Pincode */}
              <label style={styles.label}>Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                style={styles.input}
                required
              />

              {/* Payment Method */}
              <h2 style={{ ...styles.sectionTitle, marginTop: "40px" }}>
                Payment Method
              </h2>
              <div style={styles.paymentContainer}>
                {["Cash on Delivery", "UPI", "Credit Card", "Debit Card"].map(
                  (method) => (
                    <label key={method} style={styles.radioLabel}>
                      <input
                        type="radio"
                        value={method}
                        checked={paymentType === method}
                        onChange={(e) => setPaymentType(e.target.value)}
                      />
                      {method}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div style={styles.summarySection}>
              <div style={styles.summaryCard}>
                <h2 style={styles.summaryTitle}>Order Summary</h2>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.orderItem}>
                    <div>
                      <div style={styles.itemName}>{item.name}</div>
                      <div style={styles.itemQuantity}>
                        Qty : {item.quantity}
                      </div>
                    </div>
                    <div style={styles.itemPrice}>
                      ₹{" "}
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>
                ))}

                <hr style={styles.divider} />

                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div style={styles.summaryRow}>
                  <span>Delivery Charges</span>
                  <span
                    style={{
                      color: deliveryCharge === 0 ? "#16a34a" : "#333",
                      fontWeight: "600",
                    }}
                  >
                    {deliveryCharge === 0 ? "FREE" : `₹ ${deliveryCharge}`}
                  </span>
                </div>

                <div style={styles.summaryRow}>
                  <span>GST (5%)</span>
                  <span>₹ {gst.toFixed(2)}</span>
                </div>

                <div style={styles.summaryRow}>
                  <span>Discount</span>
                  <span>₹ {discount.toFixed(2)}</span>
                </div>

                <hr style={styles.divider} />

                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.placeOrderButton,
                    background:
                      hoveredButton === "place" ? "#db2777" : "#ec4899",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={() => setHoveredButton("place")}
                  onMouseLeave={() => setHoveredButton("")}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;

/* Styles Object */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "50px 20px" },
  container: { maxWidth: "1400px", margin: "0 auto" },
  pageHeader: { textAlign: "center", marginBottom: "40px" },
  title: { fontSize: "42px", fontWeight: "700", color: "#222", marginBottom: "10px" },
  subtitle: { fontSize: "18px", color: "#777" },
  checkoutGrid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "35px", alignItems: "flex-start" },
  formCard: { background: "#ffffff", padding: "35px", borderRadius: "18px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "25px" },
  label: { display: "block", fontSize: "15px", fontWeight: "600", color: "#444", marginBottom: "8px" },
  input: { width: "100%", padding: "14px", fontSize: "15px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px", outline: "none", boxSizing: "border-box" },
  textarea: { width: "100%", minHeight: "120px", padding: "14px", fontSize: "15px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px", resize: "vertical", outline: "none", boxSizing: "border-box" },
  paymentContainer: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px", marginBottom: "30px" },
  radioLabel: { display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "#444", cursor: "pointer" },
  summarySection: { position: "sticky", top: "30px" },
  summaryCard: { background: "#ffffff", padding: "30px", borderRadius: "18px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" },
  summaryTitle: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "25px", textAlign: "center" },
  orderItem: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" },
  itemName: { fontWeight: "600", color: "#333", marginBottom: "5px" },
  itemQuantity: { fontSize: "14px", color: "#777" },
  itemPrice: { color: "#ec4899", fontWeight: "700", fontSize: "16px" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "16px", color: "#555" },
  divider: { border: "none", borderTop: "1px solid #e5e5e5", margin: "20px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", fontSize: "24px", fontWeight: "700", color: "#222", marginBottom: "25px" },
  placeOrderButton: { width: "100%", padding: "16px", border: "none", borderRadius: "12px", background: "#ec4899", color: "#ffffff", fontSize: "18px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  emptyPage: { minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff8fb", padding: "20px" },
  emptyCard: { background: "#ffffff", padding: "60px 40px", borderRadius: "20px", textAlign: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", maxWidth: "500px", width: "100%" },
  emptyIcon: { fontSize: "70px", marginBottom: "20px" },
  emptyTitle: { fontSize: "32px", fontWeight: "700", color: "#333", marginBottom: "15px" },
  emptyText: { fontSize: "16px", color: "#777", lineHeight: "28px", marginBottom: "30px" },
  shoppingButton: { display: "inline-block", padding: "14px 30px", background: "#ec4899", color: "#ffffff", textDecoration: "none", borderRadius: "10px", fontWeight: "600", fontSize: "16px" },
};