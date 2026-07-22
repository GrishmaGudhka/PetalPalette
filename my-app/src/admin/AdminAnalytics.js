// src/pages/AdminAnalytics.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie,
  Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const AdminAnalytics = () => {
  /* ===========================
      Dashboard Statistics
  ============================ */
  const dashboardStats = [
    { title: "Total Revenue", value: "₹12,48,500", growth: "+18.4%", icon: "💰", color: "#ec4899" },
    { title: "Total Orders", value: "1,286", growth: "+11.2%", icon: "📦", color: "#8b5cf6" },
    { title: "Customers", value: "924", growth: "+9.8%", icon: "👥", color: "#10b981" },
    { title: "Products", value: "148", growth: "+4.3%", icon: "🌸", color: "#f59e0b" },
    { title: "Subscriptions", value: "356", growth: "+14.5%", icon: "💐", color: "#06b6d4" },
    { title: "Pending Orders", value: "29", growth: "-5%", icon: "🚚", color: "#ef4444" },
  ];

  /* ===========================
      Monthly Revenue
  ============================ */
  const revenueData = [
    { month: "Jan", revenue: 480000 }, { month: "Feb", revenue: 560000 },
    { month: "Mar", revenue: 610000 }, { month: "Apr", revenue: 720000 },
    { month: "May", revenue: 810000 }, { month: "Jun", revenue: 900000 },
    { month: "Jul", revenue: 980000 }, { month: "Aug", revenue: 1120000 },
    { month: "Sep", revenue: 1180000 }, { month: "Oct", revenue: 1260000 },
    { month: "Nov", revenue: 1410000 }, { month: "Dec", revenue: 1590000 },
  ];

  /* ===========================
      Monthly Orders
  ============================ */
  const ordersData = [
    { month: "Jan", orders: 68 }, { month: "Feb", orders: 81 },
    { month: "Mar", orders: 96 }, { month: "Apr", orders: 108 },
    { month: "May", orders: 121 }, { month: "Jun", orders: 138 },
    { month: "Jul", orders: 151 }, { month: "Aug", orders: 164 },
    { month: "Sep", orders: 178 }, { month: "Oct", orders: 201 },
    { month: "Nov", orders: 223 }, { month: "Dec", orders: 248 },
  ];

  /* ===========================
      Bouquet Categories
  ============================ */
  const categoryData = [
    { name: "Roses", value: 38 }, { name: "Lilies", value: 22 },
    { name: "Orchids", value: 16 }, { name: "Mixed", value: 17 },
    { name: "Custom", value: 7 },
  ];

  /* ===========================
      Order Status
  ============================ */
  const orderStatus = [
    { name: "Delivered", value: 71 }, { name: "Preparing", value: 12 },
    { name: "Out For Delivery", value: 9 }, { name: "Cancelled", value: 8 },
  ];

  /* ===========================
      Best Selling Products
  ============================ */
  const topProducts = [
    { id: 1, name: "Red Romance Bouquet", sold: 245, revenue: "₹4,65,500", rating: 4.9 },
    { id: 2, name: "Pink Elegance", sold: 198, revenue: "₹3,84,200", rating: 4.8 },
    { id: 3, name: "White Lily Basket", sold: 176, revenue: "₹3,05,600", rating: 4.8 },
    { id: 4, name: "Luxury Orchid Collection", sold: 142, revenue: "₹5,18,700", rating: 5.0 },
  ];

  /* ===========================
      Inventory Alerts
  ============================ */
  const inventoryAlerts = [
    { item: "Red Roses", stock: 12, status: "Low" },
    { item: "White Lilies", stock: 7, status: "Critical" },
    { item: "Glass Vase", stock: 23, status: "Medium" },
    { item: "Ribbon Wrap", stock: 180, status: "Healthy" },
  ];

  /* ===========================
      Upcoming Deliveries
  ============================ */
  const deliveries = [
    { customer: "Riya Patel", bouquet: "Classic Roses", date: "Today" },
    { customer: "Rahul Sharma", bouquet: "Luxury Orchids", date: "Tomorrow" },
    { customer: "Sneha Mehta", bouquet: "Mixed Bouquet", date: "Tomorrow" },
    { customer: "Aman Shah", bouquet: "Premium Lilies", date: "Friday" },
  ];

  const pieColors = ["#ec4899", "#8b5cf6", "#10b981", "#f59e0b", "#06b6d4", "#ef4444"];

  const yearlyRevenue = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <>
      <Header />
      <div style={styles.page}>
        {/* ================= HERO ================= */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>📊 Admin Analytics Dashboard</h1>
          <p style={styles.heroSubtitle}>Monitor your store performance, customer activity, bouquet sales, subscriptions, inventory and revenue from one beautiful dashboard.</p>
        </section>

        <div style={styles.container}>
          {/* ================= OVERVIEW ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Business Overview</h2>
            <p style={styles.sectionSubtitle}>Real-time statistics for your PetalPalette store.</p>
            <div style={styles.statsGrid}>
              {dashboardStats.map((item, index) => (
                <div key={index} style={styles.statCard}>
                  <div style={{ ...styles.statIcon, background: item.color }}>{item.icon}</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statValue}>{item.value}</h3>
                    <p style={styles.statTitle}>{item.title}</p>
                    <span style={{ ...styles.growth, color: item.growth.includes("-") ? "#ef4444" : "#10b981" }}>{item.growth} this month</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= REVENUE SUMMARY ================= */}
          <section style={styles.section}>
            <div style={styles.revenueCard}>
              <div>
                <h2 style={styles.revenueTitle}>Total Annual Revenue</h2>
                <p style={styles.revenueAmount}>₹{yearlyRevenue.toLocaleString("en-IN")}</p>
                <p style={styles.revenueText}>Based on monthly sales for the current year.</p>
              </div>
              <div style={styles.revenueInfo}>
                <div style={styles.infoBox}>
                  <span style={styles.infoLabel}>Average Monthly</span>
                  <strong style={styles.infoValue}>₹{Math.round(yearlyRevenue / 12).toLocaleString("en-IN")}</strong>
                </div>
                <div style={styles.infoBox}>
                  <span style={styles.infoLabel}>Growth</span>
                  <strong style={{ ...styles.infoValue, color: "#10b981" }}>+18.4%</strong>
                </div>
                <div style={styles.infoBox}>
                  <span style={styles.infoLabel}>Best Month</span>
                  <strong style={styles.infoValue}>December</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ================= CHARTS ================= */}
          <section style={styles.section}>
            <div style={styles.chartGrid}>
              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>📈 Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#ec4899" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>📦 Monthly Orders</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* ================= CATEGORY & ORDER STATUS ================= */}
          <section style={styles.section}>
            <div style={styles.chartGrid}>
              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>🌸 Bouquet Categories</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                      {categoryData.map((entry, index) => <Cell key={index} fill={pieColors[index % pieColors.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>🚚 Order Status</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={orderStatus} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                      {orderStatus.map((entry, index) => <Cell key={index} fill={pieColors[index % pieColors.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* ================= TOP PRODUCTS ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>🌹 Best Selling Bouquets</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Product</th>
                    <th style={styles.tableHeader}>Sold</th>
                    <th style={styles.tableHeader}>Revenue</th>
                    <th style={styles.tableHeader}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id}>
                      <td style={styles.tableCell}>{product.name}</td>
                      <td style={styles.tableCell}>{product.sold}</td>
                      <td style={styles.tableCell}>{product.revenue}</td>
                      <td style={styles.tableCell}>⭐ {product.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= CUSTOMER ANALYTICS ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>👥 Customer Insights</h2>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#10b981" }}>🆕</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>142</h2><p style={styles.statTitle}>New Customers</p></div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#3b82f6" }}>🔁</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>618</h2><p style={styles.statTitle}>Returning Customers</p></div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#f59e0b" }}>💐</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>356</h2><p style={styles.statTitle}>Subscribers</p></div>
              </div>
            </div>
          </section>

          {/* ================= INVENTORY & DELIVERIES ================= */}
          <section style={styles.section}>
            <div style={styles.doubleGrid}>
              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>📦 Inventory Alerts</h2>
                {inventoryAlerts.map((item, index) => (
                  <div key={index} style={styles.inventoryRow}>
                    <div><strong>{item.item}</strong><p style={styles.smallText}>Stock : {item.stock}</p></div>
                    <span style={{ ...styles.statusBadge, background: item.status === "Critical" ? "#ef4444" : item.status === "Low" ? "#f59e0b" : "#10b981" }}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>🚚 Upcoming Deliveries</h2>
                {deliveries.map((delivery, index) => (
                  <div key={index} style={styles.deliveryRow}>
                    <div><strong>{delivery.customer}</strong><p style={styles.smallText}>{delivery.bouquet}</p></div>
                    <span style={styles.deliveryDate}>{delivery.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= REVENUE BREAKDOWN ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>💰 Revenue Breakdown</h2>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#10b981" }}>☀️</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>₹48,250</h2><p style={styles.statTitle}>Today's Revenue</p></div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#3b82f6" }}>📅</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>₹2,96,800</h2><p style={styles.statTitle}>Weekly Revenue</p></div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#ec4899" }}>📈</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>₹12,48,500</h2><p style={styles.statTitle}>Monthly Revenue</p></div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: "#f59e0b" }}>🏆</div>
                <div style={styles.statContent}><h2 style={styles.statValue}>₹1.24 Cr</h2><p style={styles.statTitle}>Yearly Revenue</p></div>
              </div>
            </div>
          </section>

          {/* ================= RECENT ACTIVITY ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📝 Recent Activities</h2>
            <div style={styles.activityContainer}>
              {[
                { icon: "🛒", title: "New Order Received", text: "Order #PP10245 placed by Riya Patel.", time: "5 mins ago" },
                { icon: "💐", title: "Subscription Purchased", text: "Rahul Sharma subscribed to Deluxe Plan.", time: "18 mins ago" },
                { icon: "⭐", title: "New Review", text: "Pink Elegance received a 5-star review.", time: "42 mins ago" },
                { icon: "📦", title: "Inventory Updated", text: "Fresh Roses stock increased by 200 stems.", time: "1 hour ago" },
                { icon: "🚚", title: "Delivery Completed", text: "Luxury Orchid Collection delivered successfully.", time: "2 hours ago" },
              ].map((activity, index) => (
                <div key={index} style={styles.activityCard}>
                  <div style={styles.activityIcon}>{activity.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={styles.activityTitle}>{activity.title}</h3>
                    <p style={styles.activityText}>{activity.text}</p>
                  </div>
                  <span style={styles.activityTime}>{activity.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= QUICK ACTIONS ================= */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>⚡ Quick Actions</h2>
            <div style={styles.quickGrid}>
              <button style={styles.quickButton}>➕ Add Product</button>
              <button style={styles.quickButton}>📦 Manage Orders</button>
              <button style={styles.quickButton}>👥 View Customers</button>
              <button style={styles.quickButton}>💐 Manage Subscriptions</button>
              <button style={styles.quickButton}>📈 Sales Report</button>
              <button style={styles.quickButton}>⚙ Settings</button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminAnalytics;

const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1350px", margin: "0 auto", padding: "0 20px 80px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "90px 25px", borderRadius: "0 0 35px 35px", marginBottom: "70px" },
  heroTitle: { fontSize: "52px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto", fontSize: "19px", lineHeight: "34px" },
  section: { marginBottom: "80px" },
  sectionTitle: { textAlign: "center", fontSize: "38px", fontWeight: "700", color: "#222", marginBottom: "18px" },
  sectionSubtitle: { maxWidth: "760px", margin: "0 auto 45px", textAlign: "center", color: "#666", fontSize: "17px", lineHeight: "30px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "25px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "25px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 10px 24px rgba(0,0,0,.08)", transition: "0.3s" },
  statIcon: { width: "70px", height: "70px", borderRadius: "18px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "34px", color: "#fff", flexShrink: 0 },
  statContent: { display: "flex", flexDirection: "column" },
  statValue: { fontSize: "32px", fontWeight: "700", color: "#222", margin: 0 },
  statTitle: { fontSize: "17px", color: "#666", marginTop: "8px", marginBottom: "6px" },
  growth: { fontWeight: "600", fontSize: "14px" },
  revenueCard: { background: "linear-gradient(135deg,#ffffff,#fff3f8)", borderRadius: "22px", padding: "35px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "35px", flexWrap: "wrap", boxShadow: "0 10px 24px rgba(0,0,0,.08)" },
  revenueTitle: { fontSize: "28px", fontWeight: "700", color: "#222", marginBottom: "10px" },
  revenueAmount: { fontSize: "52px", fontWeight: "700", color: "#ec4899", marginBottom: "12px" },
  revenueText: { color: "#666", fontSize: "16px" },
  revenueInfo: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "18px", flex: 1 },
  infoBox: { background: "#fff", padding: "22px", borderRadius: "16px", boxShadow: "0 5px 14px rgba(0,0,0,.05)", textAlign: "center" },
  infoLabel: { display: "block", color: "#888", fontSize: "14px", marginBottom: "8px" },
  infoValue: { fontSize: "22px", color: "#222", fontWeight: "700" },
  chartGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(520px,1fr))", gap: "30px" },
  chartCard: { background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 22px rgba(0,0,0,.08)" },
  chartTitle: { fontSize: "26px", color: "#222", fontWeight: "700", marginBottom: "25px" },
  tableContainer: { overflowX: "auto", background: "#fff", borderRadius: "18px", boxShadow: "0 8px 18px rgba(0,0,0,.08)" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "700px" },
  tableHeader: { background: "#ec4899", color: "#fff", padding: "18px", textAlign: "left", fontSize: "16px", fontWeight: "700" },
  tableCell: { padding: "18px", borderBottom: "1px solid #f2f2f2", color: "#555", fontSize: "15px" },
  smallText: { color: "#777", fontSize: "14px", marginTop: "6px" },
  statusBadge: { color: "#fff", padding: "6px 14px", borderRadius: "20px", fontWeight: "600", fontSize: "13px" },
  deliveryDate: { color: "#ec4899", fontWeight: "700", fontSize: "15px" },
  doubleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(450px,1fr))", gap: "30px" },
  inventoryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: "1px solid #f3f3f3" },
  deliveryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: "1px solid #f3f3f3" },
  activityContainer: { display: "flex", flexDirection: "column", gap: "18px" },
  activityCard: { background: "#fff", borderRadius: "18px", padding: "22px 24px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 6px 16px rgba(0,0,0,.04)" },
  activityIcon: { fontSize: "26px", background: "#fdf2f8", padding: "12px", borderRadius: "12px" },
  activityTitle: { fontSize: "18px", fontWeight: "700", color: "#222", margin: 0 },
  activityText: { color: "#666", fontSize: "15px", marginTop: "5px", marginBottom: 0 },
  activityTime: { color: "#999", fontSize: "14px" },
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" },
  quickButton: { background: "#fff", color: "#222", border: "2px solid #f0f0f0", borderRadius: "14px", padding: "18px 10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,.03)" }
};