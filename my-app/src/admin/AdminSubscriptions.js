import React, { useState, useMemo } from "react";

export default function AdminSubscription() {
  /* ================= INITIAL DATA ================= */
  const [subscriptions, setSubscriptions] = useState([
    {
      id: "SUB-PP001",
      customer: "Riya Patel",
      email: "riya@gmail.com",
      phone: "+91 9876543210",
      plan: "Classic",
      frequency: "Monthly",
      price: 1349,
      palette: "Romantic Reds & Soft Pinks",
      status: "Active",
      nextDelivery: "28 July 2026",
      deliveriesCompleted: 5,
      startDate: "28 February 2026",
      address: "Bandra West, Mumbai",
      vase: "Standard Glass Vase",
      flowers: "10–12 Fresh Seasonal Flowers",
    },
    {
      id: "SUB-PP002",
      customer: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9988776655",
      plan: "Deluxe",
      frequency: "Every 2 Weeks",
      price: 2659,
      palette: "Boho Chic",
      status: "Active",
      nextDelivery: "25 July 2026",
      deliveriesCompleted: 8,
      startDate: "1 March 2026",
      address: "Andheri East, Mumbai",
      vase: "Premium Ceramic Vase",
      flowers: "18–22 Premium Flowers",
    },
    {
      id: "SUB-PP003",
      customer: "Sneha Mehta",
      email: "sneha@gmail.com",
      phone: "+91 9123456789",
      plan: "Grand Luxury",
      frequency: "Weekly",
      price: 4499,
      palette: "Vibrant Festival Colors",
      status: "Paused",
      nextDelivery: "2 August 2026",
      deliveriesCompleted: 12,
      startDate: "10 January 2026",
      address: "Powai, Mumbai",
      vase: "Luxury Crystal Vase",
      flowers: "30+ Luxury Flowers",
    },
    {
      id: "SUB-PP004",
      customer: "Aarav Shah",
      email: "aarav@gmail.com",
      phone: "+91 9000011111",
      plan: "Classic",
      frequency: "Monthly",
      price: 1349,
      palette: "Elegant Minimal",
      status: "Cancelled",
      nextDelivery: "Not Scheduled",
      deliveriesCompleted: 3,
      startDate: "5 January 2026",
      address: "Worli, Mumbai",
      vase: "Standard Glass Vase",
      flowers: "10–12 Fresh Seasonal Flowers",
    },
    {
      id: "SUB-PP005",
      customer: "Neha Joshi",
      email: "neha@gmail.com",
      phone: "+91 9111122222",
      plan: "Deluxe",
      frequency: "Monthly",
      price: 2519,
      palette: "Romantic Reds & Soft Pinks",
      status: "Active",
      nextDelivery: "30 July 2026",
      deliveriesCompleted: 6,
      startDate: "30 January 2026",
      address: "Thane West, Mumbai",
      vase: "Premium Ceramic Vase",
      flowers: "18–22 Premium Flowers",
    },
  ]);

  /* ================= STATES ================= */
  const [selectedId, setSelectedId] = useState("SUB-PP001");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  /* ================= FILTER SUBSCRIPTIONS ================= */
  const filteredSubscriptions = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.customer.toLowerCase().includes(searchText) ||
        sub.id.toLowerCase().includes(searchText) ||
        sub.email.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || sub.status === statusFilter;
      const matchesPlan = planFilter === "All" || sub.plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [subscriptions, search, statusFilter, planFilter]);

  const selectedSubscription = useMemo(
    () => subscriptions.find((sub) => sub.id === selectedId) || null,
    [subscriptions, selectedId]
  );

  /* ================= UPDATE STATUS ================= */
  const updateStatus = (subscriptionId, newStatus) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
      )
    );
  };

  /* ================= DELETE SUBSCRIPTION ================= */
  const handleDelete = (subscriptionId) => {
    const target = subscriptions.find((item) => item.id === subscriptionId);
    if (!target) return;

    if (
      window.confirm(
        `Are you sure you want to delete the subscription for ${target.customer}?`
      )
    ) {
      const updated = subscriptions.filter((item) => item.id !== subscriptionId);
      setSubscriptions(updated);

      if (selectedId === subscriptionId) {
        setSelectedId(updated.length > 0 ? updated[0].id : null);
      }
    }
  };

  /* ================= METRICS ================= */
  const stats = useMemo(() => {
    const active = subscriptions.filter((s) => s.status === "Active");
    const paused = subscriptions.filter((s) => s.status === "Paused");
    const revenue = active.reduce((acc, curr) => acc + curr.price, 0);

    return {
      total: subscriptions.length,
      activeCount: active.length,
      pausedCount: paused.length,
      revenue,
    };
  }, [subscriptions]);

  /* ================= STATUS STYLING ================= */
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return { background: "#d1fae5", color: "#065f46", border: "1px solid #a7f3d0" };
      case "Paused":
        return { background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" };
      case "Cancelled":
        return { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" };
      default:
        return { background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" };
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>🌸 Subscription Management</h1>
        <p style={styles.heroSubtitle}>Manage customer flower subscriptions, monitor recurring deliveries, update subscription plans, and keep track of subscription activity.</p>
      </section>

      <div style={styles.container}>
        {/* STATISTICS */}
        <section style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#fce7f3", color: "#db2777" }}>🌸</div>
            <div>
              <h2 style={styles.statValue}>{stats.total}</h2>
              <p style={styles.statTitle}>Total Subscriptions</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#d1fae5", color: "#059669" }}>✅</div>
            <div>
              <h2 style={styles.statValue}>{stats.activeCount}</h2>
              <p style={styles.statTitle}>Active Subscriptions</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#fef3c7", color: "#d97706" }}>⏸️</div>
            <div>
              <h2 style={styles.statValue}>{stats.pausedCount}</h2>
              <p style={styles.statTitle}>Paused Subscriptions</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#dbeafe", color: "#2563eb" }}>₹</div>
            <div>
              <h2 style={styles.statValue}>₹{stats.revenue.toLocaleString("en-IN")}</h2>
              <p style={styles.statTitle}>Active Monthly Revenue</p>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTERS */}
        <section style={styles.filterSection}>
          <input type="text" placeholder="Search by customer, email or ID..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.searchInput} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.filterSelect}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)} style={styles.filterSelect}>
            <option value="All">All Plans</option>
            <option value="Classic">Classic</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Grand Luxury">Grand Luxury</option>
          </select>
        </section>

        {/* TABLE */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📋 Customer Subscriptions</h2>
          <div style={styles.tableCard}>
            {filteredSubscriptions.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🔍</div>
                <h3 style={{ margin: "0 0 4px 0" }}>No subscriptions found</h3>
                <p style={{ margin: 0, color: "#6b7280" }}>Try adjusting your search query or status filter.</p>
              </div>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>ID</th>
                      <th style={styles.tableHeader}>Customer</th>
                      <th style={styles.tableHeader}>Plan</th>
                      <th style={styles.tableHeader}>Frequency</th>
                      <th style={styles.tableHeader}>Price</th>
                      <th style={styles.tableHeader}>Next Delivery</th>
                      <th style={styles.tableHeader}>Status</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map((sub) => {
                      const isSelected = sub.id === selectedId;
                      return (
                        <tr key={sub.id} style={{ ...styles.tableRow, ...(isSelected ? styles.selectedTableRow : {}) }}>
                          <td style={styles.tableCell}><strong>{sub.id}</strong></td>
                          <td style={styles.tableCell}>
                            <div style={{ fontWeight: 600 }}>{sub.customer}</div>
                            <div style={styles.subText}>{sub.email}</div>
                          </td>
                          <td style={styles.tableCell}>{sub.plan}</td>
                          <td style={styles.tableCell}>{sub.frequency}</td>
                          <td style={styles.tableCell}>₹{sub.price.toLocaleString("en-IN")}</td>
                          <td style={styles.tableCell}>{sub.nextDelivery}</td>
                          <td style={styles.tableCell}>
                            <span style={{ ...styles.statusBadge, ...getStatusStyle(sub.status) }}>{sub.status}</span>
                          </td>
                          <td style={styles.tableCell}>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button style={{ ...styles.viewButton, ...(isSelected ? styles.activeViewButton : {}) }} onClick={() => setSelectedId(sub.id)}>{isSelected ? "Viewing" : "View"}</button>
                              <button style={styles.deleteButton} onClick={() => handleDelete(sub.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* DETAILS SECTION */}
        {selectedSubscription && (
          <div style={styles.detailsContainer}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>🌷 Subscription Details ({selectedSubscription.id})</h2>
              <div style={styles.detailsGrid}>
                {/* CUSTOMER INFORMATION */}
                <div style={styles.detailsCard}>
                  <h3 style={styles.cardHeading}>👤 Customer Information</h3>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Name</span><span style={styles.infoValue}>{selectedSubscription.customer}</span></div>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Email</span><span style={styles.infoValue}>{selectedSubscription.email}</span></div>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Phone</span><span style={styles.infoValue}>{selectedSubscription.phone}</span></div>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Address</span><span style={styles.infoValue}>{selectedSubscription.address}</span></div>
                </div>

                {/* SUBSCRIPTION INFORMATION */}
                <div style={styles.detailsCard}>
                  <h3 style={styles.cardHeading}>📦 Subscription Information</h3>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Plan Name</span><span style={styles.infoValue}>{selectedSubscription.plan}</span></div>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Frequency</span><span style={styles.infoValue}>{selectedSubscription.frequency}</span></div>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Price</span><span style={styles.infoValue}>₹{selectedSubscription.price.toLocaleString("en-IN")}</span></div>
                  <div style={styles.infoRow}><span style={styles.infoLabel}>Status</span><span style={{ ...styles.statusBadge, ...getStatusStyle(selectedSubscription.status) }}>{selectedSubscription.status}</span></div>
                </div>
              </div>
            </section>

            {/* FLORAL PREFERENCES */}
            <section style={styles.section}>
              <div style={styles.detailsCard}>
                <h3 style={styles.cardHeading}>💐 Floral Preferences</h3>
                <div style={styles.preferenceGrid}>
                  <div style={styles.preferenceBox}><span style={styles.boxLabel}>Floral Palette</span><p style={styles.boxVal}>{selectedSubscription.palette}</p></div>
                  <div style={styles.preferenceBox}><span style={styles.boxLabel}>Flowers</span><p style={styles.boxVal}>{selectedSubscription.flowers}</p></div>
                  <div style={styles.preferenceBox}><span style={styles.boxLabel}>Included Vase</span><p style={styles.boxVal}>{selectedSubscription.vase}</p></div>
                  <div style={styles.preferenceBox}><span style={styles.boxLabel}>Deliveries Completed</span><p style={styles.boxVal}>{selectedSubscription.deliveriesCompleted}</p></div>
                </div>
              </div>
            </section>

            {/* DELIVERY INFORMATION */}
            <section style={styles.section}>
              <div style={styles.detailsCard}>
                <h3 style={styles.cardHeading}>🚚 Delivery Information</h3>
                <div style={styles.deliveryGrid}>
                  <div style={styles.deliveryBox}><span style={styles.boxLabel}>Subscription Started</span><p style={styles.boxVal}>{selectedSubscription.startDate}</p></div>
                  <div style={styles.deliveryBox}><span style={styles.boxLabel}>Next Delivery</span><p style={styles.boxVal}>{selectedSubscription.nextDelivery}</p></div>
                  <div style={styles.deliveryBox}><span style={styles.boxLabel}>Frequency</span><p style={styles.boxVal}>{selectedSubscription.frequency}</p></div>
                </div>
              </div>
            </section>

            {/* ACTIONS */}
            <section style={styles.section}>
              <div style={styles.actionCard}>
                <h3 style={styles.cardHeading}>⚙️ Subscription Actions</h3>
                <p style={styles.cardDescription}>Update status for {selectedSubscription.customer}'s subscription.</p>
                <div style={styles.actionGrid}>
                  <button style={styles.activeButton} onClick={() => updateStatus(selectedSubscription.id, "Active")}>▶️ Set Active</button>
                  <button style={styles.pauseButton} onClick={() => updateStatus(selectedSubscription.id, "Paused")}>⏸️ Pause</button>
                  <button style={styles.cancelButton} onClick={() => updateStatus(selectedSubscription.id, "Cancelled")}>❌ Cancel</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* FOOTER NOTE */}
        <div style={styles.footerNote}>
          <p style={{ margin: 0 }}>🌸 Subscription management is currently using state data. Connect this view to your backend API to update live database records.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f9fafb", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: "#111827", paddingBottom: "60px" },
  hero: { backgroundColor: "#ffffff", padding: "32px 24px", borderBottom: "1px solid #e5e7eb", textAlign: "center" },
  heroTitle: { fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0", color: "#831843" },
  heroSubtitle: { fontSize: "15px", color: "#6b7280", maxWidth: "600px", margin: "0 auto", lineHeight: "1.5" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "24px 16px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" },
  statCard: { backgroundColor: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  statIcon: { width: "48px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold" },
  statValue: { fontSize: "20px", fontWeight: "700", margin: 0 },
  statTitle: { fontSize: "13px", color: "#6b7280", margin: 0 },
  filterSection: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" },
  searchInput: { flex: "1 1 240px", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  filterSelect: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "#ffffff", fontSize: "14px", outline: "none" },
  section: { marginBottom: "24px" },
  sectionTitle: { fontSize: "18px", fontWeight: "600", margin: "0 0 12px 0" },
  tableCard: { backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" },
  tableHeader: { backgroundColor: "#f9fafb", padding: "12px 16px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" },
  tableRow: { borderBottom: "1px solid #f3f4f6", transition: "background 0.15s ease" },
  selectedTableRow: { backgroundColor: "#fdf2f8" },
  tableCell: { padding: "14px 16px", verticalAlign: "middle" },
  subText: { fontSize: "12px", color: "#6b7280" },
  statusBadge: { display: "inline-block", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" },
  viewButton: { padding: "6px 12px", borderRadius: "6px", border: "1px solid #d1d5db", backgroundColor: "#ffffff", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
  activeViewButton: { backgroundColor: "#fbcfe8", borderColor: "#f472b6", color: "#831843" },
  deleteButton: { padding: "6px 12px", borderRadius: "6px", border: "1px solid #fca5a5", backgroundColor: "#fff5f5", color: "#dc2626", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
  emptyState: { padding: "48px 16px", textAlign: "center" },
  emptyIcon: { fontSize: "32px", marginBottom: "8px" },
  detailsContainer: { marginTop: "32px", borderTop: "2px stroke #f3f4f6", paddingTop: "24px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" },
  detailsCard: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  cardHeading: { fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1f2937" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: "14px" },
  infoLabel: { color: "#6b7280" },
  infoValue: { fontWeight: "500", textAlign: "right" },
  preferenceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" },
  preferenceBox: { backgroundColor: "#f9fafb", padding: "12px", borderRadius: "8px", border: "1px solid #f3f4f6" },
  deliveryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" },
  deliveryBox: { backgroundColor: "#f9fafb", padding: "12px", borderRadius: "8px", border: "1px solid #f3f4f6" },
  boxLabel: { fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" },
  boxVal: { margin: 0, fontWeight: "600", fontSize: "14px" },
  actionCard: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  cardDescription: { fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0" },
  actionGrid: { display: "flex", flexWrap: "wrap", gap: "12px" },
  activeButton: { padding: "10px 16px", borderRadius: "8px", border: "1px solid #059669", backgroundColor: "#10b981", color: "#ffffff", fontWeight: "600", cursor: "pointer" },
  pauseButton: { padding: "10px 16px", borderRadius: "8px", border: "1px solid #d97706", backgroundColor: "#f59e0b", color: "#ffffff", fontWeight: "600", cursor: "pointer" },
  cancelButton: { padding: "10px 16px", borderRadius: "8px", border: "1px solid #dc2626", backgroundColor: "#ef4444", color: "#ffffff", fontWeight: "600", cursor: "pointer" },
  footerNote: { textAlign: "center", padding: "16px", fontSize: "13px", color: "#9ca3af" },
};