// src/pages/Reminders.js

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Reminders = () => {
  const defaultReminders = [
    {
      id: 1,
      name: "Mom's Birthday",
      type: "Birthday",
      relation: "Mother",
      date: "2026-05-14",
    },
    {
      id: 2,
      name: "Wedding Anniversary",
      type: "Anniversary",
      relation: "Spouse",
      date: "2026-10-24",
    },
  ];

  const [reminders, setReminders] = useState([]);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [newReminder, setNewReminder] = useState({
    name: "",
    type: "Birthday",
    relation: "Mother",
    date: "",
  });

  /* ======================================
      Lifecycle Hook - Load from LocalStorage
  ====================================== */
  useEffect(() => {
    const saved = localStorage.getItem("petal_reminders");
    if (saved) {
      setReminders(JSON.parse(saved));
    } else {
      setReminders(defaultReminders);
    }
  }, []);

  /* ======================================
      Lifecycle Hook - Save to LocalStorage
  ====================================== */
  useEffect(() => {
    localStorage.setItem("petal_reminders", JSON.stringify(reminders));
  }, [reminders]);

  /* ======================================
      Form Input Controls & Handlers
  ====================================== */
  const handleChange = (e) => {
    setNewReminder({
      ...newReminder,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReminder.name || !newReminder.date) return;

    const reminder = {
      id: Date.now(),
      ...newReminder,
    };

    setReminders((prev) =>
      [...prev, reminder].sort((a, b) => new Date(a.date) - new Date(b.date))
    );

    setSuccess("🎉 Reminder saved successfully!");
    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setNewReminder({
      name: "",
      type: "Birthday",
      relation: "Mother",
      date: "",
    });
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((item) => item.id !== id));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* ======================================
      Filtering Logic
  ====================================== */
  const filteredReminders = reminders.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div style={styles.page}>
        
        {/* ======================================
            Hero Section Jumbotron
        ====================================== */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>📅 Never Miss A Special Moment</h1>
          <p style={styles.heroSubtitle}>
            Save birthdays, anniversaries and celebrations. PetalPalette helps you remember every important occasion
            so your loved ones always receive beautiful flowers on time.
          </p>
        </section>

        <div style={styles.container}>
          
          {/* ======================================
              Statistics Grid Metrics
          ====================================== */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <h2 style={styles.statNumber}>{reminders.length}</h2>
              <p style={styles.statText}>Total Reminders</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🎂</div>
              <h2 style={styles.statNumber}>
                {reminders.filter((item) => item.type === "Birthday").length}
              </h2>
              <p style={styles.statText}>Birthdays</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>💍</div>
              <h2 style={styles.statNumber}>
                {reminders.filter((item) => item.type === "Anniversary").length}
              </h2>
              <p style={styles.statText}>Anniversaries</p>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🌸</div>
              <h2 style={styles.statNumber}>{filteredReminders.length}</h2>
              <p style={styles.statText}>Upcoming Events</p>
            </div>
          </div>

          {/* ======================================
              Main Content Splitted Layout
          ====================================== */}
          <div style={styles.mainLayout}>
            
            {/* Form Management Module */}
            <div style={styles.formCard}>
              <h2 style={styles.sectionTitle}>➕ Add New Reminder</h2>
              {success && <div style={styles.successBox}>{success}</div>}

              <form onSubmit={handleSubmit}>
                <label style={styles.label}>Occasion Title</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Example: Mom's Birthday"
                  value={newReminder.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <label style={styles.label}>Occasion Type</label>
                <select name="type" value={newReminder.type} onChange={handleChange} style={styles.select}>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Wedding</option>
                  <option>Baby Shower</option>
                  <option>Graduation</option>
                  <option>Festival</option>
                  <option>Other</option>
                </select>

                <label style={styles.label}>Relationship</label>
                <select name="relation" value={newReminder.relation} onChange={handleChange} style={styles.select}>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Spouse</option>
                  <option>Partner</option>
                  <option>Friend</option>
                  <option>Colleague</option>
                  <option>Grandmother</option>
                  <option>Grandfather</option>
                  <option>Teacher</option>
                  <option>Other</option>
                </select>

                <label style={styles.label}>Celebration Date</label>
                <input
                  type="date"
                  name="date"
                  value={newReminder.date}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <button type="submit" style={styles.addButton}>
                  💖 Save Reminder
                </button>
              </form>
            </div>

            {/* List Display Module */}
            <div style={styles.listCard}>
              <h2 style={styles.sectionTitle}>📋 Your Celebrations</h2>
              <input
                type="text"
                placeholder="🔍 Search reminders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />

              {filteredReminders.length === 0 ? (
                <div style={styles.emptyCard}>
                  <div style={styles.emptyIcon}>🎁</div>
                  <h3 style={styles.emptyTitle}>No Reminders Found</h3>
                  <p style={styles.emptyText}>
                    Add your first reminder to receive timely notifications for birthdays, anniversaries, and other special occasions.
                  </p>
                </div>
              ) : (
                filteredReminders.map((item) => (
                  <div key={item.id} style={styles.reminderCard}>
                    <div>
                      <div style={styles.reminderTitle}>{item.name}</div>
                      <div style={styles.reminderMeta}>
                        <span style={styles.badge}>{item.type}</span>
                        <span style={styles.badge}>{item.relation}</span>
                      </div>
                      <div style={styles.reminderDate}>📅 {formatDate(item.date)}</div>
                    </div>
                    <button style={styles.deleteButton} onClick={() => removeReminder(item.id)}>
                      🗑 Remove
                    </button>
                  </div>
                ))
              )}

              {/* marketing / Call-To-Action Element */}
              <div style={styles.subscriptionCard}>
                <h3 style={styles.subscriptionTitle}>🌸 Never Forget Again</h3>
                <p style={styles.subscriptionText}>
                  Join our Floral Subscription and we'll automatically prepare and deliver a beautiful bouquet before every saved celebration.
                </p>
                <button style={styles.subscriptionButton}>Explore Subscriptions</button>
              </div>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reminders;

/* ==========================================================
    Standalone Styles CSS-in-JS Layout Styling Definition Object
========================================================== */
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1300px", margin: "0 auto", padding: "0 20px 70px" },
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "90px 30px", borderRadius: "0 0 35px 35px", marginBottom: "60px" },
  heroTitle: { fontSize: "48px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "760px", margin: "0 auto", lineHeight: "32px", fontSize: "18px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "25px", marginBottom: "50px" },
  statCard: { background: "#ffffff", borderRadius: "20px", padding: "30px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  statIcon: { fontSize: "42px", marginBottom: "15px" },
  statNumber: { fontSize: "38px", color: "#ec4899", margin: "10px 0", fontWeight: "700" },
  statText: { color: "#666", fontSize: "17px" },
  mainLayout: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "35px", alignItems: "start" },
  formCard: { background: "#ffffff", padding: "35px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  listCard: { background: "#ffffff", padding: "35px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  sectionTitle: { fontSize: "28px", color: "#333", marginBottom: "25px", fontWeight: "700" },
  label: { display: "block", marginBottom: "8px", marginTop: "18px", fontWeight: "600", color: "#444" },
  input: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", outline: "none", fontSize: "15px", boxSizing: "border-box" },
  select: { width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", outline: "none", fontSize: "15px", background: "#fff", boxSizing: "border-box" },
  addButton: { width: "100%", marginTop: "30px", padding: "16px", border: "none", borderRadius: "12px", background: "#ec4899", color: "#fff", fontSize: "17px", fontWeight: "700", cursor: "pointer" },
  successBox: { background: "#dcfce7", color: "#166534", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600" },
  searchInput: { width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #ddd", marginBottom: "25px", outline: "none", fontSize: "15px", boxSizing: "border-box" },
  reminderCard: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px", borderRadius: "15px", background: "#fff8fb", marginBottom: "18px", border: "1px solid #f8d7e6" },
  reminderTitle: { fontSize: "22px", fontWeight: "700", color: "#333", marginBottom: "10px" },
  reminderMeta: { display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" },
  badge: { background: "#ec4899", color: "#fff", padding: "6px 12px", borderRadius: "20px", fontSize: "13px" },
  reminderDate: { color: "#666", fontSize: "15px" },
  deleteButton: { border: "none", background: "#ef4444", color: "#fff", padding: "12px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  emptyCard: { textAlign: "center", padding: "60px 20px", color: "#777" },
  emptyIcon: { fontSize: "60px", marginBottom: "15px" },
  emptyTitle: { fontSize: "24px", marginBottom: "12px", color: "#333" },
  emptyText: { lineHeight: "28px", maxWidth: "420px", margin: "0 auto" },
  subscriptionCard: { marginTop: "40px", padding: "30px", borderRadius: "18px", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center" },
  subscriptionTitle: { fontSize: "28px", marginBottom: "15px", fontWeight: "700" },
  subscriptionText: { lineHeight: "30px", marginBottom: "25px", fontSize: "16px" },
  subscriptionButton: { background: "#fff", color: "#ec4899", border: "none", padding: "14px 30px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "16px" }
};