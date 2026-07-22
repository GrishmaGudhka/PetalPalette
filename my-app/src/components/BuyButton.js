// src/components/BuyButton.js
import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";

export default function BuyButton({ bouquet }) {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);

  // Prevent rendering if no bouquet is passed
  if (!bouquet) return null;

  // Add bouquet to cart
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }

    addToCart(bouquet, quantity);
    alert(`${quantity} × ${bouquet.name} added to your cart.`);
  };

  return (
    <div style={styles.buySection}>
      {/* Quantity Selector */}
      <div style={styles.quantityContainer}>
        <span style={styles.quantityLabel}>Quantity:</span>

        <div style={styles.quantityBox}>
          <button
            style={styles.qtyButton}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>

          <span style={styles.qtyDisplay}>{quantity}</span>

          <button
            style={styles.qtyButton}
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        style={{
          ...styles.addButton,
          backgroundColor: bouquet.stock === 0 ? "#9ca3af" : "#ec4899",
          cursor: bouquet.stock === 0 ? "not-allowed" : "pointer"
        }}
        onClick={handleAddToCart}
        disabled={bouquet.stock === 0}
      >
        {bouquet.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

const styles = {
  buySection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "20px",
    gap: "15px"
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  quantityLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333"
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    border: "2px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  qtyButton: {
    width: "40px",
    height: "40px",
    border: "none",
    backgroundColor: "#f7f7f7",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold"
  },
  qtyDisplay: {
    width: "50px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "40px",
    borderLeft: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    backgroundColor: "#fff"
  },
  addButton: {
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s"
  }
};