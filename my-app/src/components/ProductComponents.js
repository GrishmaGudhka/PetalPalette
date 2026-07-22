// src/components/ProductComponents.js
import React from "react";
import { Link } from "react-router-dom";

/* ==========================================================
   Bouquet Card
========================================================== */
export const BouquetCard = ({ bouquet }) => {
  if (!bouquet) return null;

  return (
    <div style={styles.card}>
      <img src={bouquet.image} alt={bouquet.name} style={styles.image} />
      <div style={styles.body}>
        <h2 style={styles.title}>{bouquet.name}</h2>
        <div style={styles.category}>{bouquet.category}</div>
        <p style={styles.description}>{bouquet.description}</p>
        <div style={styles.price}>₹ {bouquet.price}</div>
        <Link to={`/product/${bouquet.id}`} style={styles.bouquetButton}>View Details</Link>
      </div>
    </div>
  );
};

/* ==========================================================
   Quantity Selector
========================================================== */
export const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div style={styles.qtyContainer}>
      <button style={styles.qtyButton} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
      <span style={styles.quantity}>{quantity}</span>
      <button style={styles.qtyButton} onClick={() => setQuantity((q) => q + 1)}>+</button>
    </div>
  );
};

/* ==========================================================
   Product Image Gallery
========================================================== */
export const ProductImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0] || "");

  React.useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div style={styles.galleryContainer}>
      <div style={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            style={{
              ...styles.thumbnail,
              border: selectedImage === image ? "2px solid #ec4899" : "2px solid #eee",
            }}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <img src={selectedImage} alt="Bouquet" style={styles.mainImage} />
    </div>
  );
};

/* ==========================================================
   Product Information
========================================================== */
export const ProductInfo = ({ bouquet }) => {
  if (!bouquet) return null;

  return (
    <div style={styles.infoContainer}>
      <h1 style={styles.infoTitle}>{bouquet.name}</h1>
      <div style={styles.infoCategory}>{bouquet.category}</div>
      <div style={styles.infoPrice}>₹ {bouquet.price}</div>
      <p style={styles.infoDescription}>{bouquet.description}</p>
      <div style={styles.detailBox}>
        <div style={styles.detailRow}>
          <span style={styles.label}>Flower Type</span>
          <span style={styles.value}>{bouquet.flowerType || "Mixed Flowers"}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Wrapping</span>
          <span style={styles.value}>{bouquet.wrapping || "Premium Wrap"}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Occasion</span>
          <span style={styles.value}>{bouquet.occasion || "Any Occasion"}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Delivery</span>
          <span style={styles.value}>Same Day Available</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Availability</span>
          <span style={bouquet.stock > 0 ? styles.stockAvailable : styles.stockUnavailable}>
            {bouquet.stock > 0 ? `${bouquet.stock} In Stock` : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   Review Card
========================================================== */
export const ReviewCard = ({ review }) => {
  if (!review) return null;

  return (
    <div style={styles.reviewCard}>
      <div style={styles.reviewHeader}>
        <div style={styles.reviewName}>{review.name}</div>
        <div style={styles.rating}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
      </div>
      <p style={styles.comment}>{review.comment}</p>
      <div style={styles.date}>{review.date}</div>
    </div>
  );
};

/* ==========================================================
   Order Summary
========================================================== */
export const OrderSummary = ({ cartItems = [] }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + tax;

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.summaryHeading}>Order Summary</h2>
      <div style={styles.summaryRow}>
        <span>Subtotal</span>
        <span>₹ {subtotal}</span>
      </div>
      <div style={styles.summaryRow}>
        <span>Delivery</span>
        <span style={deliveryCharge === 0 ? styles.freeDelivery : {}}>
          {deliveryCharge === 0 ? "FREE" : `₹ ${deliveryCharge}`}
        </span>
      </div>
      <div style={styles.summaryRow}>
        <span>GST (5%)</span>
        <span>₹ {tax}</span>
      </div>
      <div style={styles.summaryDivider}></div>
      <div style={styles.summaryTotal}>
        <span>Total</span>
        <span>₹ {total}</span>
      </div>
    </div>
  );
};

/* ==========================================================
   Price Row (Reusable internal helper)
========================================================== */
const PriceRow = ({ label, value, isTotal = false }) => {
  return (
    <div style={{ ...styles.priceRow, fontSize: isTotal ? "20px" : "16px", fontWeight: isTotal ? "700" : "500", color: isTotal ? "#ec4899" : "#555" }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

/* ==========================================================
   Payment Summary
========================================================== */
export const PaymentSummary = ({ cartItems = [], paymentMethod = "Online Payment" }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = subtotal >= 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  return (
    <div style={styles.paymentContainer}>
      <h2 style={styles.paymentHeading}>Payment Summary</h2>
      <div style={styles.method}>Payment Method : {paymentMethod}</div>
      <div style={styles.itemContainer}>
        {cartItems.length === 0 ? (
          <div style={styles.empty}>No items available.</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} style={styles.item}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>
      <div style={styles.paymentDivider}></div>
      <PriceRow label="Subtotal" value={`₹ ${subtotal}`} />
      <PriceRow label="Delivery" value={deliveryCharge === 0 ? "FREE" : `₹ ${deliveryCharge}`} />
      <PriceRow label="GST (5%)" value={`₹ ${gst}`} />
      <div style={styles.paymentDivider}></div>
      <PriceRow label="Grand Total" value={`₹ ${total}`} isTotal={true} />
    </div>
  );
};

/* ==========================================================
   Standalone Style Declaration Object (Rule 1 & 2)
========================================================== */
const styles = {
  card: { width: "300px", background: "#ffffff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "0.3s", display: "flex", flexDirection: "column" },
  image: { width: "100%", height: "240px", objectFit: "cover" },
  body: { padding: "18px" },
  title: { fontSize: "20px", fontWeight: "600", marginBottom: "10px", color: "#333" },
  category: { color: "#888", fontSize: "14px", marginBottom: "10px" },
  description: { color: "#666", fontSize: "14px", lineHeight: "22px", minHeight: "60px" },
  price: { marginTop: "15px", color: "#ec4899", fontSize: "24px", fontWeight: "700" },
  bouquetButton: { marginTop: "18px", display: "inline-block", background: "#ec4899", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", textAlign: "center" },
  qtyContainer: { display: "flex", alignItems: "center", gap: "15px", margin: "20px 0" },
  qtyButton: { width: "40px", height: "40px", border: "none", background: "#ec4899", color: "white", borderRadius: "8px", cursor: "pointer", fontSize: "20px", fontWeight: "bold" },
  quantity: { width: "40px", textAlign: "center", fontSize: "18px", fontWeight: "600" },
  galleryContainer: { display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "30px" },
  thumbnails: { display: "flex", flexDirection: "column", gap: "12px" },
  thumbnail: { width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px", cursor: "pointer", border: "2px solid #eee" },
  mainImage: { width: "450px", height: "450px", objectFit: "cover", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.12)" },
  infoContainer: { display: "flex", flexDirection: "column", gap: "18px", maxWidth: "550px" },
  infoTitle: { fontSize: "34px", fontWeight: "700", color: "#333" },
  infoCategory: { color: "#777", fontSize: "16px" },
  infoPrice: { color: "#ec4899", fontSize: "32px", fontWeight: "700" },
  infoDescription: { color: "#555", lineHeight: "28px", fontSize: "16px" },
  detailBox: { background: "#fafafa", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", border: "1px solid #eee" },
  detailRow: { display: "flex", justifyContent: "space-between", fontSize: "15px" },
  label: { fontWeight: "600", color: "#444" },
  value: { color: "#666" },
  stockAvailable: { color: "green", fontWeight: "600" },
  stockUnavailable: { color: "red", fontWeight: "600" },
  reviewCard: { background: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "12px", padding: "20px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  reviewHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  reviewName: { fontSize: "18px", fontWeight: "600", color: "#333" },
  rating: { color: "#f59e0b", fontSize: "18px", fontWeight: "600" },
  comment: { color: "#555", lineHeight: "24px", marginBottom: "15px" },
  date: { fontSize: "13px", color: "#888" },
  summaryContainer: { background: "#ffffff", border: "1px solid #ececec", borderRadius: "12px", padding: "25px", width: "100%", maxWidth: "400px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  summaryHeading: { fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "20px" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", color: "#555" },
  summaryDivider: { borderTop: "1px solid #ddd", margin: "18px 0" },
  summaryTotal: { display: "flex", justifyContent: "space-between", fontSize: "22px", fontWeight: "700", color: "#ec4899" },
  freeDelivery: { color: "green", fontWeight: "600" },
  priceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" },
  paymentContainer: { width: "100%", maxWidth: "450px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e6e6e6", padding: "25px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  paymentHeading: { fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "20px" },
  paymentDivider: { borderTop: "1px solid #ddd", margin: "15px 0" },
  method: { background: "#fff5fa", padding: "12px", borderRadius: "8px", color: "#ec4899", fontWeight: "600", marginBottom: "20px" },
  itemContainer: { marginBottom: "20px" },
  item: { display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#555", fontSize: "15px" },
  empty: { textAlign: "center", color: "#777", padding: "20px" }
};