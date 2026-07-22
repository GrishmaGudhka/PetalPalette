import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* ================= ADMIN AUTHENTICATION ================= */
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isAdminLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  /* ================= NAVIGATION ================= */
  const goToPage = (path) => {
    navigate(path);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.page}>
      {/* ================= SIDEBAR ================= */}
      <aside style={styles.sidebar}>
        {/* Logo */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🌸</div>
          <div>
            <h2 style={styles.logoTitle}>PetalPalette</h2>
            <p style={styles.logoSubtitle}>Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={styles.navigation}>
          <button style={{ ...styles.navButton, ...styles.activeNavButton }} onClick={() => goToPage("/admin-dashboard")}>
            <span style={styles.navIcon}>📊</span> Dashboard
          </button>
          <button style={styles.navButton} onClick={() => goToPage("/admin-analytics")}>
            <span style={styles.navIcon}>📈</span> Analytics
          </button>
          <button style={styles.navButton} onClick={() => goToPage("/admin-users")}>
            <span style={styles.navIcon}>👥</span> Users
          </button>
          <button style={styles.navButton} onClick={() => goToPage("/admin-orders")}>
            <span style={styles.navIcon}>📦</span> Orders
          </button>
          <button style={styles.navButton} onClick={() => goToPage("/admin-custom-orders")}>
            <span style={styles.navIcon}>💐</span> Custom Orders
          </button>
        </nav>

        {/* Bottom Sidebar */}
        <div style={styles.sidebarBottom}>
          <button style={styles.storeButton} onClick={() => goToPage("/")}>🏠 View Store</button>
          <button style={styles.logoutButton} onClick={handleLogout}>🚪 Logout</button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main style={styles.mainContent}>
        {/* ================= TOP HEADER ================= */}
        <header style={styles.topHeader}>
          <div>
            <h1 style={styles.pageTitle}>Admin Dashboard</h1>
            <p style={styles.pageSubtitle}>Welcome back! Here's what's happening with PetalPalette today.</p>
          </div>
          <div style={styles.adminProfile}>
            <div style={styles.adminAvatar}>👤</div>
            <div>
              <strong style={styles.adminName}>Administrator</strong>
              <p style={styles.adminRole}>Admin</p>
            </div>
          </div>
        </header>

        {/* ================= STATISTICS ================= */}
        <section style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#fce7f3" }}>👥</div>
            <div>
              <p style={styles.statLabel}>Total Users</p>
              <h2 style={styles.statValue}>5,248</h2>
              <span style={styles.statGrowth}>↑ 12.5% this month</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#dbeafe" }}>📦</div>
            <div>
              <p style={styles.statLabel}>Total Orders</p>
              <h2 style={styles.statValue}>1,284</h2>
              <span style={styles.statGrowth}>↑ 8.2% this month</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#dcfce7" }}>💰</div>
            <div>
              <p style={styles.statLabel}>Total Revenue</p>
              <h2 style={styles.statValue}>₹8.45L</h2>
              <span style={styles.statGrowth}>↑ 15.8% this month</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#fef3c7" }}>💐</div>
            <div>
              <p style={styles.statLabel}>Custom Orders</p>
              <h2 style={styles.statValue}>86</h2>
              <span style={styles.statGrowth}>↑ 6.4% this month</span>
            </div>
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <div style={styles.quickActionsGrid}>
            <button style={styles.quickActionCard} onClick={() => goToPage("/admin-analytics")}>
              <div style={styles.quickActionIcon}>📈</div>
              <div>
                <h3 style={styles.quickActionTitle}>View Analytics</h3>
                <p style={styles.quickActionText}>Check sales and business performance</p>
              </div>
            </button>

            <button style={styles.quickActionCard} onClick={() => goToPage("/admin-orders")}>
              <div style={styles.quickActionIcon}>📦</div>
              <div>
                <h3 style={styles.quickActionTitle}>Manage Orders</h3>
                <p style={styles.quickActionText}>View and manage customer orders</p>
              </div>
            </button>

            <button style={styles.quickActionCard} onClick={() => goToPage("/admin-custom-orders")}>
              <div style={styles.quickActionIcon}>💐</div>
              <div>
                <h3 style={styles.quickActionTitle}>Custom Orders</h3>
                <p style={styles.quickActionText}>Manage personalized bouquet requests</p>
              </div>
            </button>

            <button style={styles.quickActionCard} onClick={() => goToPage("/admin-users")}>
              <div style={styles.quickActionIcon}>👥</div>
              <div>
                <h3 style={styles.quickActionTitle}>Manage Users</h3>
                <p style={styles.quickActionText}>View and manage registered users</p>
              </div>
            </button>
          </div>
        </section>

        {/* ================= RECENT ORDERS ================= */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Recent Orders</h2>
              <p style={styles.sectionSubtitle}>Latest orders placed by customers</p>
            </div>
            <button style={styles.viewAllButton} onClick={() => goToPage("/admin-orders")}>View All Orders →</button>
          </div>

          <div style={styles.ordersCard}>
            <div style={styles.orderRow}>
              <div style={styles.orderInfo}>
                <div style={styles.orderIcon}>🌹</div>
                <div>
                  <strong>#PP-10245</strong>
                  <p style={styles.orderCustomer}>Riya Patel</p>
                </div>
              </div>
              <div style={styles.orderDetails}>Classic Rose Bouquet</div>
              <strong>₹1,499</strong>
              <span style={{ ...styles.statusBadge, background: "#dcfce7", color: "#15803d" }}>Delivered</span>
            </div>

            <div style={styles.orderRow}>
              <div style={styles.orderInfo}>
                <div style={styles.orderIcon}>🌷</div>
                <div>
                  <strong>#PP-10246</strong>
                  <p style={styles.orderCustomer}>Rahul Sharma</p>
                </div>
              </div>
              <div style={styles.orderDetails}>Deluxe Spring Bouquet</div>
              <strong>₹2,799</strong>
              <span style={{ ...styles.statusBadge, background: "#dbeafe", color: "#2563eb" }}>Processing</span>
            </div>

            <div style={styles.orderRow}>
              <div style={styles.orderInfo}>
                <div style={styles.orderIcon}>💐</div>
                <div>
                  <strong>#PP-C003</strong>
                  <p style={styles.orderCustomer}>Sneha Mehta</p>
                </div>
              </div>
              <div style={styles.orderDetails}>Custom Luxury Wedding Bouquet</div>
              <strong>₹7,800</strong>
              <span style={{ ...styles.statusBadge, background: "#fef3c7", color: "#b45309" }}>Ready</span>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer style={styles.footer}>
          <p>© 2026 PetalPalette Admin Panel. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;

/* =========================================================
   STYLES
========================================================= */
const styles = {
  page: { minHeight: "100vh", display: "flex", background: "#fff8fb", fontFamily: "Arial, Helvetica, sans-serif" },
  sidebar: { width: "260px", minHeight: "100vh", background: "#ffffff", borderRight: "1px solid #f1dce6", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 10 },
  logoSection: { display: "flex", alignItems: "center", gap: "12px", padding: "28px 22px", borderBottom: "1px solid #f5e5ec" },
  logoIcon: { width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg,#ec4899,#f472b6)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "25px" },
  logoTitle: { margin: 0, fontSize: "20px", color: "#ec4899" },
  logoSubtitle: { margin: "4px 0 0", fontSize: "12px", color: "#888" },
  navigation: { padding: "25px 15px", display: "flex", flexDirection: "column", gap: "8px" },
  navButton: { width: "100%", padding: "14px 18px", border: "none", background: "transparent", borderRadius: "12px", cursor: "pointer", textAlign: "left", fontSize: "15px", fontWeight: "600", color: "#555", display: "flex", alignItems: "center", gap: "12px", transition: "0.3s" },
  activeNavButton: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", boxShadow: "0 6px 15px rgba(236,72,153,.25)" },
  navIcon: { fontSize: "20px", width: "25px" },
  sidebarBottom: { marginTop: "auto", padding: "20px 15px", borderTop: "1px solid #f5e5ec" },
  storeButton: { width: "100%", padding: "13px", marginBottom: "10px", border: "1px solid #ec4899", background: "#fff", color: "#ec4899", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  logoutButton: { width: "100%", padding: "13px", border: "none", background: "#fff1f2", color: "#e11d48", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  mainContent: { marginLeft: "260px", width: "calc(100% - 260px)", padding: "35px 45px", boxSizing: "border-box" },
  topHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", gap: "20px" },
  pageTitle: { margin: 0, fontSize: "36px", color: "#222" },
  pageSubtitle: { marginTop: "10px", color: "#777", fontSize: "16px" },
  adminProfile: { display: "flex", alignItems: "center", gap: "12px", background: "#fff", padding: "10px 18px", borderRadius: "14px", boxShadow: "0 5px 15px rgba(0,0,0,.06)" },
  adminAvatar: { width: "42px", height: "42px", borderRadius: "50%", background: "#fce7f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
  adminName: { color: "#333" },
  adminRole: { margin: "3px 0 0", fontSize: "12px", color: "#888" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "22px", marginBottom: "45px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "25px", display: "flex", alignItems: "center", gap: "18px", boxShadow: "0 8px 20px rgba(0,0,0,.06)" },
  statIcon: { width: "58px", height: "58px", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "27px", flexShrink: 0 },
  statLabel: { margin: 0, color: "#777", fontSize: "14px" },
  statValue: { margin: "7px 0", fontSize: "28px", color: "#222" },
  statGrowth: { fontSize: "12px", color: "#10b981", fontWeight: "600" },
  section: { marginBottom: "45px" },
  sectionTitle: { margin: 0, fontSize: "25px", color: "#222" },
  sectionSubtitle: { margin: "8px 0 0", color: "#888", fontSize: "14px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "20px" },
  quickActionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px", marginTop: "20px" },
  quickActionCard: { background: "#fff", border: "1px solid #f2e1e8", borderRadius: "16px", padding: "22px", display: "flex", alignItems: "center", gap: "18px", cursor: "pointer", textAlign: "left", transition: "0.3s" },
  quickActionIcon: { width: "52px", height: "52px", borderRadius: "14px", background: "#fce7f3", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "25px", flexShrink: 0 },
  quickActionTitle: { margin: 0, color: "#333", fontSize: "17px" },
  quickActionText: { margin: "7px 0 0", color: "#888", fontSize: "13px", lineHeight: "20px" },
  viewAllButton: { border: "none", background: "transparent", color: "#ec4899", fontWeight: "700", cursor: "pointer", fontSize: "14px" },
  ordersCard: { background: "#fff", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,.06)", overflow: "hidden" },
  orderRow: { display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", alignItems: "center", gap: "20px", padding: "20px 25px", borderBottom: "1px solid #f3f3f3" },
  orderInfo: { display: "flex", alignItems: "center", gap: "12px" },
  orderIcon: { width: "45px", height: "45px", borderRadius: "12px", background: "#fff1f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" },
  orderCustomer: { margin: "5px 0 0", fontSize: "13px", color: "#888" },
  orderDetails: { color: "#555", fontSize: "14px" },
  statusBadge: { padding: "7px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", textAlign: "center" },
  footer: { textAlign: "center", padding: "30px 0 10px", color: "#999", fontSize: "13px" },
};