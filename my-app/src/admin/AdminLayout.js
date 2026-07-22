import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ================= ADMIN LOGIN CHECK ================= */
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout from the Admin Panel?");
    if (!confirmLogout) return;

    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login");
  };

  /* ================= NAVIGATION ITEMS ================= */
  const navigationItems = [
    { path: "/admin", label: "Dashboard", icon: "📊", end: true },
    { path: "/admin/users", label: "Users", icon: "👥" },
    { path: "/admin/orders", label: "Orders", icon: "📦" },
    { path: "/admin/custom-orders", label: "Custom Orders", icon: "💐" },
    { path: "/admin/events", label: "Events", icon: "🎉" },
    { path: "/admin/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div style={styles.layout}>
      {/* ================= SIDEBAR ================= */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? "260px" : "80px" }}>
        {/* ================= SIDEBAR HEADER ================= */}
        <div style={styles.sidebarHeader}>
          {sidebarOpen && (
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>🌸</div>
              <div>
                <h2 style={styles.logoTitle}>PetalPalette</h2>
                <p style={styles.logoSubtitle}>Admin Panel</p>
              </div>
            </div>
          )}

          <button
            style={styles.toggleButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav style={styles.navigation}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.activeNavLink : {}),
                justifyContent: sidebarOpen ? "flex-start" : "center",
              })}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* ================= SIDEBAR FOOTER ================= */}
        <div style={styles.sidebarFooter}>
          <button
            style={{
              ...styles.logoutButton,
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}
            onClick={handleLogout}
          >
            <span style={styles.navIcon}>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main style={{ ...styles.mainContent, marginLeft: sidebarOpen ? "260px" : "80px" }}>
        {/* ================= TOP BAR ================= */}
        <header style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <button style={styles.mobileMenuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <div>
              <h1 style={styles.topBarTitle}>PetalPalette Admin</h1>
              <p style={styles.topBarSubtitle}>Manage your floral business</p>
            </div>
          </div>

          <div style={styles.adminProfile}>
            <div style={styles.adminAvatar}>👩‍💼</div>
            <div style={styles.adminInfo}>
              <strong style={styles.adminName}>Administrator</strong>
              <span style={styles.adminRole}>Admin</span>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <div style={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

/* =========================================================
   STYLES
========================================================= */
const styles = {
  /* ================= MAIN LAYOUT ================= */
  layout: { minHeight: "100vh", background: "#fff8fb", fontFamily: "Arial, Helvetica, sans-serif" },

  /* ================= SIDEBAR ================= */
  sidebar: { position: "fixed", top: 0, left: 0, bottom: 0, background: "linear-gradient(180deg,#ec4899,#db2777)", color: "#fff", display: "flex", flexDirection: "column", transition: "width 0.3s ease", zIndex: 1000, boxShadow: "4px 0 20px rgba(0,0,0,.12)", overflow: "hidden" },
  sidebarHeader: { minHeight: "90px", padding: "15px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.2)" },
  logoContainer: { display: "flex", alignItems: "center", gap: "12px", minWidth: 0 },
  logoIcon: { width: "45px", height: "45px", borderRadius: "12px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 },
  logoTitle: { margin: 0, fontSize: "18px", fontWeight: "700", whiteSpace: "nowrap" },
  logoSubtitle: { margin: "3px 0 0", fontSize: "12px", opacity: 0.8, whiteSpace: "nowrap" },
  toggleButton: { width: "35px", height: "35px", border: "none", borderRadius: "8px", background: "rgba(255,255,255,.18)", color: "#fff", cursor: "pointer", fontSize: "14px", flexShrink: 0 },

  /* ================= NAVIGATION ================= */
  navigation: { flex: 1, padding: "25px 12px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" },
  navLink: { display: "flex", alignItems: "center", gap: "15px", padding: "14px 15px", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: "600", transition: "all 0.2s ease", whiteSpace: "nowrap" },
  activeNavLink: { background: "#fff", color: "#ec4899", boxShadow: "0 5px 15px rgba(0,0,0,.12)" },
  navIcon: { width: "25px", textAlign: "center", fontSize: "21px", flexShrink: 0 },
  navLabel: { whiteSpace: "nowrap" },

  /* ================= SIDEBAR FOOTER ================= */
  sidebarFooter: { padding: "15px 12px", borderTop: "1px solid rgba(255,255,255,.2)" },
  logoutButton: { width: "100%", display: "flex", alignItems: "center", gap: "15px", padding: "14px 15px", background: "rgba(255,255,255,.12)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontSize: "15px", fontWeight: "600" },

  /* ================= MAIN CONTENT ================= */
  mainContent: { minHeight: "100vh", transition: "margin-left 0.3s ease" },

  /* ================= TOP BAR ================= */
  topBar: { height: "90px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 35px", boxShadow: "0 3px 15px rgba(0,0,0,.06)", position: "sticky", top: 0, zIndex: 900 },
  topBarLeft: { display: "flex", alignItems: "center", gap: "15px" },
  mobileMenuButton: { display: "none", background: "#fff", border: "1px solid #eee", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", fontSize: "20px" },
  topBarTitle: { margin: 0, fontSize: "24px", color: "#222", fontWeight: "700" },
  topBarSubtitle: { margin: "4px 0 0", color: "#777", fontSize: "13px" },

  /* ================= ADMIN PROFILE ================= */
  adminProfile: { display: "flex", alignItems: "center", gap: "12px" },
  adminAvatar: { width: "45px", height: "45px", borderRadius: "50%", background: "#fff0f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" },
  adminInfo: { display: "flex", flexDirection: "column", gap: "3px" },
  adminName: { color: "#333", fontSize: "14px" },
  adminRole: { color: "#ec4899", fontSize: "12px", fontWeight: "600" },

  /* ================= PAGE CONTENT ================= */
  pageContent: { padding: "35px", maxWidth: "1600px", margin: "0 auto" },
};