// src/pages/Wishlist.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { addToCart } = useCart();

  // ================= Wishlist Items =================
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Romantic Rose Bouquet",
      image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600",
      price: 2499,
      originalPrice: 2999,
      rating: 4.9,
      reviews: 142,
      category: "Roses",
    },
    {
      id: 2,
      name: "Luxury Orchid Bouquet",
      image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600",
      price: 3999,
      originalPrice: 4499,
      rating: 4.8,
      reviews: 95,
      category: "Orchids",
    },
    {
      id: 3,
      name: "Sunflower Celebration",
      image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=600",
      price: 1799,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 87,
      category: "Sunflowers",
    },
  ]);

  // ================= Remove Item =================
  const removeItem = (id) => {
    const confirmDelete = window.confirm("Remove this bouquet from your wishlist?");
    if (!confirmDelete) return;
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= Clear Wishlist =================
  const clearWishlist = () => {
    const confirmDelete = window.confirm("Clear your entire wishlist?");
    if (!confirmDelete) return;
    setWishlistItems([]);
  };

  // ================= Add To Cart =================
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
    });
    alert(`${item.name} added to cart!`);
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        {/* ================= HERO ================= */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>❤️ My Wishlist</h1>
          <p style={styles.heroSubtitle}>
            Save your favourite bouquets and floral gifts for later. Move them to your cart anytime and never miss the perfect bouquet for every occasion.
          </p>
        </section>

        <div style={styles.container}>
          {/* ================= EMPTY WISHLIST ================= */}
          {wishlistItems.length === 0 ? (
            <section style={styles.emptySection}>
              <div style={styles.emptyIcon}>💐</div>
              <h2 style={styles.emptyTitle}>Your Wishlist is Empty</h2>
              <p style={styles.emptyText}>Browse our beautiful bouquet collection and save your favourites here.</p>
              <button style={styles.shopButton} onClick={() => (window.location.href = "/shopping")}>🌸 Continue Shopping</button>
            </section>
          ) : (
            <>
              {/* ================= SUMMARY ================= */}
              <section style={styles.summaryCard}>
                <div>
                  <h2 style={styles.summaryTitle}>Wishlist Summary</h2>
                  <p style={styles.summaryText}>{wishlistItems.length} Bouquet{wishlistItems.length > 1 ? "s" : ""} saved for later.</p>
                </div>
                <button style={styles.clearButton} onClick={clearWishlist}>🗑 Clear Wishlist</button>
              </section>

              {/* ================= PRODUCT GRID ================= */}
              <section style={styles.grid}>
                {wishlistItems.map((item) => {
                  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
                  return (
                    <div key={item.id} style={styles.card}>
                      <div style={styles.imageContainer}>
                        <img src={item.image} alt={item.name} style={styles.image} />
                        <div style={styles.discountBadge}>{discount}% OFF</div>
                      </div>
                      <div style={styles.cardBody}>
                        <span style={styles.category}>{item.category}</span>
                        <h3 style={styles.productTitle}>{item.name}</h3>
                        <div style={styles.ratingRow}>
                          <span style={styles.star}>⭐</span>
                          <strong>{item.rating}</strong>
                          <span style={styles.reviewText}>({item.reviews} reviews)</span>
                        </div>
                        <div style={styles.priceRow}>
                          <span style={styles.price}>₹{item.price}</span>
                          <span style={styles.originalPrice}>₹{item.originalPrice}</span>
                        </div>
                        <div style={styles.buttonRow}>
                          <button style={styles.cartButton} onClick={() => handleAddToCart(item)}>🛒 Add to Cart</button>
                          <button style={styles.removeButton} onClick={() => removeItem(item.id)}>❤️ Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1300px", margin: "0 auto", padding: "0 20px 80px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "80px 20px", borderRadius: "0 0 35px 35px", marginBottom: "60px" },
  heroTitle: { fontSize: "52px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "700px", margin: "0 auto", fontSize: "18px", lineHeight: "32px" },
  emptySection: { background: "#fff", padding: "80px 30px", borderRadius: "25px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,.08)" },
  emptyIcon: { fontSize: "80px", marginBottom: "20px" },
  emptyTitle: { fontSize: "38px", color: "#222", marginBottom: "15px" },
  emptyText: { color: "#666", fontSize: "18px", lineHeight: "30px", marginBottom: "35px" },
  shopButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "12px", padding: "15px 35px", fontSize: "17px", fontWeight: "700", cursor: "pointer" },
  summaryCard: { background: "#fff", padding: "30px", borderRadius: "20px", marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  summaryTitle: { fontSize: "30px", color: "#222", marginBottom: "8px" },
  summaryText: { color: "#666", fontSize: "16px" },
  clearButton: { background: "#ef4444", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 25px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "30px" },
  card: { background: "#fff", borderRadius: "22px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,.08)", transition: "0.3s ease" },
  imageContainer: { position: "relative", width: "100%", height: "280px", overflow: "hidden" },
  image: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  discountBadge: { position: "absolute", top: "15px", right: "15px", background: "#ef4444", color: "#fff", padding: "8px 14px", borderRadius: "20px", fontWeight: "700", fontSize: "14px" },
  cardBody: { padding: "25px" },
  category: { display: "inline-block", background: "#fde7f3", color: "#ec4899", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "15px" },
  productTitle: { fontSize: "24px", fontWeight: "700", color: "#222", marginBottom: "15px", lineHeight: "32px" },
  ratingRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" },
  star: { color: "#fbbf24", fontSize: "18px" },
  reviewText: { color: "#777", fontSize: "14px" },
  priceRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px" },
  price: { fontSize: "28px", fontWeight: "700", color: "#ec4899" },
  originalPrice: { color: "#999", textDecoration: "line-through", fontSize: "17px" },
  buttonRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
  cartButton: { flex: 1, background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "12px", padding: "14px", fontSize: "15px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" },
  removeButton: { flex: 1, background: "#fff", color: "#ec4899", border: "2px solid #ec4899", borderRadius: "12px", padding: "14px", fontSize: "15px", fontWeight: "700", cursor: "pointer", transition: "0.3s ease" }
};