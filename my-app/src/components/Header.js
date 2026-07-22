// src/components/Header.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { useCart } from "./CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    alert("Logged out successfully.");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/shopping?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <header style={styles.header}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        PP
      </Link>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/shopping" style={styles.navLink}>Shop</Link>
        <Link to="/subscription" style={styles.navLink}>Subscription</Link>
        <Link to="/events" style={styles.navLink}>Events</Link>
        <Link to="/gallery" style={styles.navLink}>Gallery</Link>
        <Link to="/reviews" style={styles.navLink}>Reviews</Link>
        <Link to="/about" style={styles.navLink}>About</Link>
        <Link to="/contact" style={styles.navLink}>Contact</Link>
      </nav>

      {/* Right Side */}
      <div style={styles.rightSection}>
        {/* Search */}
        <form style={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search bouquets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            <FaSearch />
          </button>
        </form>

        {/* Wishlist */}
        <Link to="/wishlist" style={styles.iconLink} title="Wishlist">
          <FaHeart />
        </Link>

        {/* Cart */}
        <Link to="/cart" style={styles.iconLink} title="Shopping Cart">
          <FaShoppingCart />
          {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
        </Link>

        {/* Login / Profile */}
        {isLoggedIn ? (
          <div style={styles.profileContainer}>
            <Link to="/profile" style={styles.profileLink}>
              <FaUserCircle size={24} />
              {user?.name || "Profile"}
            </Link>
            <button style={styles.logoutButton} onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={styles.loginButton}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: { width: "100%", background: "#ec4899", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 40px", boxSizing: "border-box", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  logo: { fontSize: "32px", fontWeight: "bold", color: "white", textDecoration: "none", letterSpacing: "2px" },
  nav: { display: "flex", alignItems: "center", gap: "22px", marginLeft: "30px" },
  navLink: { color: "white", textDecoration: "none", fontSize: "15px", fontWeight: "500" },
  rightSection: { display: "flex", alignItems: "center", gap: "18px" },
  searchForm: { display: "flex", alignItems: "center", background: "white", borderRadius: "30px", overflow: "hidden", width: "280px" },
  searchInput: { flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px" },
  searchButton: { border: "none", background: "#ffffff", cursor: "pointer", padding: "10px 14px", color: "#ec4899", fontSize: "16px" },
  iconLink: { color: "white", textDecoration: "none", fontSize: "22px", position: "relative" },
  cartBadge: { position: "absolute", top: "-8px", right: "-10px", background: "#ffffff", color: "#ec4899", borderRadius: "50%", minWidth: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" },
  loginButton: { background: "white", color: "#ec4899", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: "600", cursor: "pointer", textDecoration: "none" },
  profileContainer: { display: "flex", alignItems: "center", gap: "10px" },
  profileLink: { color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" },
  logoutButton: { border: "none", background: "white", color: "#ec4899", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" }
};