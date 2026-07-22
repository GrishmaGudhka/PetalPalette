// src/pages/ProductDetails.js

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

// Import Product Images
import redRose from "../Pics/red_rose_group.jpg";
import whiteLily from "../Pics/white_lily_group.jpg";
import sunflowerRose from "../Pics/sunflower_pink_rose_group.jpg";
import whiteRose from "../Pics/white_rose_group.jpg";
import purpleRose from "../Pics/purple_rose_group.jpg";
import sunflower from "../Pics/sunflower_group.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  /* ==========================================
      Product Data Source Repository
  ========================================== */
  const products = [
    {
      id: 1,
      name: "Red Rose Bouquet",
      image: redRose,
      category: "Romantic Collection",
      price: 1499,
      originalPrice: 1799,
      rating: 4.9,
      reviews: 248,
      stock: "In Stock",
      description: "A luxurious bouquet of premium long-stem fresh red roses wrapped elegantly for anniversaries, proposals and romantic celebrations.",
      meaning: "Red roses symbolize everlasting love, passion and deep affection."
    },
    {
      id: 2,
      name: "White Lily Bouquet",
      image: whiteLily,
      category: "Elegant Collection",
      price: 1699,
      originalPrice: 1999,
      rating: 4.8,
      reviews: 181,
      stock: "In Stock",
      description: "Beautiful fresh white lilies carefully arranged with seasonal greenery for a graceful and sophisticated appearance.",
      meaning: "White lilies symbolize purity, peace and new beginnings."
    },
    {
      id: 3,
      name: "Sunflower & Pink Roses",
      image: sunflowerRose,
      category: "Premium Collection",
      price: 1899,
      originalPrice: 2299,
      rating: 5.0,
      reviews: 321,
      stock: "Limited Stock",
      description: "A cheerful bouquet combining bright sunflowers with elegant pink roses, perfect for birthdays and celebrations.",
      meaning: "Represents happiness, positivity and admiration."
    },
    {
      id: 4,
      name: "White Rose Bouquet",
      image: whiteRose,
      category: "Classic Collection",
      price: 1399,
      originalPrice: 1699,
      rating: 4.8,
      reviews: 166,
      stock: "In Stock",
      description: "Premium white roses wrapped with elegant paper and satin ribbon for timeless beauty.",
      meaning: "White roses express innocence, respect and elegance."
    },
    {
      id: 5,
      name: "Purple Rose Bouquet",
      image: purpleRose,
      category: "Luxury Collection",
      price: 1999,
      originalPrice: 2499,
      rating: 4.9,
      reviews: 197,
      stock: "Only Few Left",
      description: "Rare purple roses designed for unforgettable luxury gifting experiences.",
      meaning: "Purple roses symbolize royalty, admiration and enchantment."
    },
    {
      id: 6,
      name: "Sunflower Bouquet",
      image: sunflower,
      category: "Bright Collection",
      price: 1299,
      originalPrice: 1499,
      rating: 4.7,
      reviews: 139,
      stock: "In Stock",
      description: "Fresh vibrant sunflowers carefully arranged to brighten every occasion.",
      meaning: "Sunflowers symbolize joy, hope and positive energy."
    }
  ];

  /* ==========================================
      Find Selected Product Configuration
  ========================================== */
  const product = products.find((item) => item.id === Number(id)) || products[0];

  /* ==========================================
      Component State Hooks
  ========================================== */
  const [quantity, setQuantity] = useState(1);
  const [hoverCart, setHoverCart] = useState(false);
  const [hoverBuy, setHoverBuy] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");

  /* ==========================================
      Quantity Modifier Methods
  ========================================== */
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  /* ==========================================
      Action Event Handlers
  ========================================== */
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage("🌸 Product added to cart successfully!");
    setTimeout(() => setAddedMessage(""), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>

          {/* ==========================================
              Breadcrumb Navigation Route
          ========================================== */}
          <div style={styles.breadcrumb}>
            Home / Shopping / {product.name}
          </div>

          {/* ==========================================
              Primary Main Product Section Showcase
          ========================================== */}
          <div style={styles.productSection}>
            
            {/* Left Column Layout Side - Asset Display Image */}
            <div style={styles.imageSection}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <div style={styles.discountBadge}>
                Save ₹{product.originalPrice - product.price}
              </div>
            </div>

            {/* Right Column Layout Side - Descriptive Core Details */}
            <div style={styles.detailsSection}>
              <span style={styles.category}>{product.category}</span>
              <h1 style={styles.productTitle}>{product.name}</h1>

              <div style={styles.ratingRow}>
                <span style={styles.stars}>⭐⭐⭐⭐⭐</span>
                <span style={styles.rating}>{product.rating}</span>
                <span style={styles.reviewCount}>({product.reviews} Reviews)</span>
              </div>

              <div style={styles.priceRow}>
                <span style={styles.price}>₹{product.price}</span>
                <span style={styles.originalPrice}>₹{product.originalPrice}</span>
              </div>

              <div style={styles.stockBox}>✅ {product.stock}</div>
              <p style={styles.description}>{product.description}</p>

              <div style={styles.meaningBox}>
                <h3 style={styles.meaningTitle}>🌸 Flower Meaning</h3>
                <p style={styles.meaningText}>{product.meaning}</p>
              </div>

              {/* Counter Step Quantity Input Block Controller */}
              <div style={styles.quantitySection}>
                <h3 style={styles.quantityTitle}>Quantity</h3>
                <div style={styles.quantityBox}>
                  <button style={styles.quantityButton} onClick={decreaseQuantity}>−</button>
                  <span style={styles.quantity}>{quantity}</span>
                  <button style={styles.quantityButton} onClick={increaseQuantity}>+</button>
                </div>
              </div>

              {/* Transactional Operational Execution Actions Buttons */}
              <div style={styles.buttonRow}>
                <button
                  style={{ ...styles.cartButton, background: hoverCart ? "#db2777" : "#ec4899" }}
                  onMouseEnter={() => setHoverCart(true)}
                  onMouseLeave={() => setHoverCart(false)}
                  onClick={handleAddToCart}
                >
                  🛒 Add To Cart
                </button>

                <button
                  style={{ ...styles.buyButton, background: hoverBuy ? "#222" : "#444" }}
                  onMouseEnter={() => setHoverBuy(true)}
                  onMouseLeave={() => setHoverBuy(false)}
                  onClick={handleBuyNow}
                >
                  ⚡ Buy Now
                </button>
              </div>

              {addedMessage && <div style={styles.successMessage}>{addedMessage}</div>}
            </div>
          </div>

          {/* ==========================================
              Post-Purchase Delivery & Care Instructions Info Section
          ========================================== */}
          <div style={styles.infoSection}>
            <div style={styles.infoCard}>
              <h2 style={styles.infoHeading}>🚚 Delivery Information</h2>
              
              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>✅</span>
                <div>
                  <strong>Same Day Delivery</strong>
                  <p style={styles.infoText}>Order before 3 PM and receive your bouquet today.</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>🌙</span>
                <div>
                  <strong>Midnight Surprise Delivery</strong>
                  <p style={styles.infoText}>Perfect for birthdays, anniversaries and special celebrations.</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>📦</span>
                <div>
                  <strong>Safe Packaging</strong>
                  <p style={styles.infoText}>Every bouquet is packed carefully to maintain freshness throughout delivery.</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>💳</span>
                <div>
                  <strong>Secure Payments</strong>
                  <p style={styles.infoText}>UPI, Cards, Net Banking and Cash on Delivery supported.</p>
                </div>
              </div>
            </div>

            <div style={styles.infoCard}>
              <h2 style={styles.infoHeading}>🌸 Flower Care Tips</h2>
              <div style={styles.careItem}>✂ Trim stems diagonally before placing them in water.</div>
              <div style={styles.careItem}>💧 Change water every 2 days for maximum freshness.</div>
              <div style={styles.careItem}>☀ Keep flowers away from direct sunlight.</div>
              <div style={styles.careItem}>🍃 Remove wilted leaves regularly.</div>
              <div style={styles.careItem}>❄ Store in a cool room for longer vase life.</div>
            </div>
          </div>

          {/* ==========================================
              Filtered Cross-Sell Related Products Carousel
          ========================================== */}
          <section style={styles.relatedSection}>
            <h2 style={styles.relatedTitle}>You May Also Like</h2>
            <div style={styles.relatedGrid}>
              {products
                .filter((item) => item.id !== product.id)
                .slice(0, 4)
                .map((item) => (
                  <div key={item.id} style={styles.relatedCard}>
                    <img src={item.image} alt={item.name} style={styles.relatedImage} />
                    <div style={styles.relatedContent}>
                      <h3 style={styles.relatedName}>{item.name}</h3>
                      <p style={styles.relatedPrice}>₹{item.price}</p>
                      <button style={styles.relatedButton} onClick={() => navigate(`/product/${item.id}`)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* ==========================================
              Social Proof Product Reviews Content Grid
          ========================================== */}
          <section style={styles.reviewSection}>
            <h2 style={styles.reviewHeading}>⭐ Customer Reviews</h2>
            <div style={styles.reviewGrid}>
              <div style={styles.reviewCard}>
                <div style={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                <p style={styles.reviewText}>Beautiful bouquet! The flowers were fresh, fragrant and delivered exactly on time.</p>
                <h4 style={styles.reviewUser}>— Priya S.</h4>
              </div>

              <div style={styles.reviewCard}>
                <div style={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                <p style={styles.reviewText}>Excellent packaging and premium quality. My wife absolutely loved the roses.</p>
                <h4 style={styles.reviewUser}>— Rahul M.</h4>
              </div>

              <div style={styles.reviewCard}>
                <div style={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                <p style={styles.reviewText}>Worth every rupee. Highly recommended for birthdays and anniversaries.</p>
                <h4 style={styles.reviewUser}>— Sneha P.</h4>
              </div>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

/* ==========================================================
    Standalone Styles CSS-in-JS Layout Styling Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb", padding: "40px 20px 70px" },
  container: { maxWidth: "1300px", margin: "0 auto" },
  breadcrumb: { color: "#666", marginBottom: "30px", fontSize: "15px" },
  productSection: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "start", marginBottom: "70px" },
  imageSection: { position: "relative", background: "#ffffff", padding: "20px", borderRadius: "22px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  productImage: { width: "100%", borderRadius: "18px", objectFit: "cover" },
  discountBadge: { position: "absolute", top: "25px", left: "25px", background: "#ec4899", color: "#fff", padding: "10px 18px", borderRadius: "30px", fontWeight: "700", fontSize: "14px" },
  detailsSection: { background: "#ffffff", padding: "35px", borderRadius: "22px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  category: { display: "inline-block", background: "#fce7f3", color: "#ec4899", padding: "8px 18px", borderRadius: "20px", fontWeight: "600", marginBottom: "18px" },
  productTitle: { fontSize: "40px", color: "#222", marginBottom: "18px", fontWeight: "700" },
  ratingRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" },
  stars: { fontSize: "20px" },
  rating: { fontWeight: "700", color: "#333" },
  reviewCount: { color: "#666" },
  priceRow: { display: "flex", alignItems: "center", gap: "18px", marginBottom: "20px" },
  price: { fontSize: "34px", color: "#ec4899", fontWeight: "700" },
  originalPrice: { textDecoration: "line-through", color: "#999", fontSize: "22px" },
  stockBox: { display: "inline-block", background: "#ecfdf5", color: "#16a34a", padding: "10px 18px", borderRadius: "10px", marginBottom: "25px", fontWeight: "600" },
  description: { color: "#555", lineHeight: "30px", fontSize: "17px", marginBottom: "30px" },
  meaningBox: { background: "#fff0f6", padding: "25px", borderRadius: "15px", marginBottom: "30px" },
  meaningTitle: { color: "#ec4899", marginBottom: "10px", fontSize: "22px" },
  meaningText: { color: "#555", lineHeight: "28px" },
  quantitySection: { marginBottom: "30px" },
  quantityTitle: { marginBottom: "12px", color: "#333" },
  quantityBox: { display: "flex", alignItems: "center", gap: "15px" },
  quantityButton: { width: "42px", height: "42px", border: "none", borderRadius: "10px", background: "#ec4899", color: "#fff", fontSize: "24px", cursor: "pointer", fontWeight: "700" },
  quantity: { fontSize: "22px", fontWeight: "700", width: "30px", textAlign: "center" },
  buttonRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
  cartButton: { flex: 1, border: "none", color: "#fff", padding: "16px", borderRadius: "12px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  buyButton: { flex: 1, border: "none", color: "#fff", padding: "16px", borderRadius: "12px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  successMessage: { marginTop: "25px", background: "#dcfce7", color: "#166534", padding: "15px", borderRadius: "10px", fontWeight: "600", textAlign: "center" },
  infoSection: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "70px" },
  infoCard: { background: "#ffffff", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  infoHeading: { fontSize: "28px", marginBottom: "25px", color: "#333" },
  infoItem: { display: "flex", gap: "18px", marginBottom: "22px" },
  infoIcon: { fontSize: "28px" },
  infoText: { marginTop: "5px", color: "#666", lineHeight: "26px" },
  careItem: { background: "#fff8fb", padding: "15px", borderRadius: "10px", marginBottom: "15px", color: "#555", fontWeight: "500" },
  relatedSection: { marginBottom: "70px" },
  relatedTitle: { textAlign: "center", fontSize: "36px", marginBottom: "40px", color: "#222" },
  relatedGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "25px" },
  relatedCard: { background: "#fff", borderRadius: "18px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  relatedImage: { width: "100%", height: "240px", objectFit: "cover" },
  relatedContent: { padding: "20px" },
  relatedName: { fontSize: "22px", marginBottom: "12px", color: "#333" },
  relatedPrice: { color: "#ec4899", fontSize: "24px", fontWeight: "700", marginBottom: "18px" },
  relatedButton: { width: "100%", border: "none", background: "#ec4899", color: "#fff", padding: "14px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" },
  reviewSection: { marginBottom: "60px" },
  reviewHeading: { textAlign: "center", fontSize: "36px", marginBottom: "35px", color: "#222" },
  reviewGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "25px" },
  reviewCard: { background: "#ffffff", padding: "30px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
  reviewStars: { fontSize: "22px", marginBottom: "15px" },
  reviewText: { color: "#555", lineHeight: "28px", fontStyle: "italic", marginBottom: "20px" },
  reviewUser: { color: "#ec4899", fontWeight: "700" }
};