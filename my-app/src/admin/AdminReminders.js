// src/pages/AdminReminders.js

import React, { useEffect, useState } from "react";

export default function AdminReminders() {
  /* ================= STATES ================= */

  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("adminReminders");

    return savedReminders
      ? JSON.parse(savedReminders)
      : [
          {
            id: "REM-001",
            title: "Prepare Riya's Birthday Bouquet",
            description:
              "Prepare red roses, white lilies and baby's breath.",
            date: "2026-07-22",
            time: "09:00",
            priority: "High",
            category: "Custom Order",
            completed: false,
          },
          {
            id: "REM-002",
            title: "Confirm Rahul's Anniversary Order",
            description:
              "Confirm imported flowers and final quotation with customer.",
            date: "2026-07-23",
            time: "11:00",
            priority: "Medium",
            category: "Customer",
            completed: false,
          },
          {
            id: "REM-003",
            title: "Check Flower Inventory",
            description:
              "Check roses, lilies, tulips and orchids stock.",
            date: "2026-07-24",
            time: "10:30",
            priority: "Low",
            category: "Inventory",
            completed: true,
          },
        ];
  });

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    priority: "Medium",
    category: "General",
  });

  /* ================= SAVE TO LOCAL STORAGE ================= */

  useEffect(() => {
    localStorage.setItem(
      "adminReminders",
      JSON.stringify(reminders)
    );
  }, [reminders]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewReminder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= ADD REMINDER ================= */

  const addReminder = (e) => {
    e.preventDefault();

    if (!newReminder.title.trim()) {
      alert("Please enter a reminder title.");
      return;
    }

    if (!newReminder.date) {
      alert("Please select a reminder date.");
      return;
    }

    const reminder = {
      id: `REM-${Date.now()}`,
      ...newReminder,
      completed: false,
    };

    setReminders((prev) => [
      reminder,
      ...prev,
    ]);

    setNewReminder({
      title: "",
      description: "",
      date: "",
      time: "",
      priority: "Medium",
      category: "General",
    });

    setShowForm(false);

    alert("Reminder created successfully!");
  };

  /* ================= TOGGLE COMPLETED ================= */

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
            }
          : reminder
      )
    );
  };

  /* ================= DELETE REMINDER ================= */

  const deleteReminder = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reminder?"
    );

    if (!confirmDelete) {
      return;
    }

    setReminders((prev) =>
      prev.filter(
        (reminder) => reminder.id !== id
      )
    );
  };

  /* ================= FILTER REMINDERS ================= */

  const filteredReminders = reminders
    .filter((reminder) => {
      const searchText =
        search.toLowerCase();

      return (
        reminder.title
          .toLowerCase()
          .includes(searchText) ||
        reminder.description
          .toLowerCase()
          .includes(searchText) ||
        reminder.category
          .toLowerCase()
          .includes(searchText)
      );
    })
    .filter((reminder) => {
      if (filter === "All") {
        return true;
      }

      if (filter === "Completed") {
        return reminder.completed;
      }

      if (filter === "Pending") {
        return !reminder.completed;
      }

      return reminder.priority === filter;
    });

  /* ================= STATISTICS ================= */

  const totalReminders =
    reminders.length;

  const pendingReminders =
    reminders.filter(
      (reminder) =>
        !reminder.completed
    ).length;

  const completedReminders =
    reminders.filter(
      (reminder) =>
        reminder.completed
    ).length;

  const highPriorityReminders =
    reminders.filter(
      (reminder) =>
        reminder.priority === "High" &&
        !reminder.completed
    ).length;

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    if (!date) {
      return "No date";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div style={styles.page}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            🔔 Admin Reminders
          </h1>

          <p style={styles.subtitle}>
            Manage important tasks, customer
            follow-ups, custom orders, inventory
            checks, and delivery reminders.
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "✕ Close"
            : "＋ Add Reminder"}
        </button>

      </div>

      {/* ================= STATISTICS ================= */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#ec4899",
            }}
          >
            🔔
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {totalReminders}
            </h2>

            <p style={styles.statLabel}>
              Total Reminders
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#f59e0b",
            }}
          >
            ⏳
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {pendingReminders}
            </h2>

            <p style={styles.statLabel}>
              Pending
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#10b981",
            }}
          >
            ✅
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {completedReminders}
            </h2>

            <p style={styles.statLabel}>
              Completed
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#ef4444",
            }}
          >
            🚨
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {highPriorityReminders}
            </h2>

            <p style={styles.statLabel}>
              High Priority
            </p>
          </div>
        </div>

      </div>

      {/* ================= ADD REMINDER FORM ================= */}

      {showForm && (
        <div style={styles.formCard}>

          <h2 style={styles.formTitle}>
            ➕ Create New Reminder
          </h2>

          <form onSubmit={addReminder}>

            <div style={styles.formGrid}>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Reminder Title *
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Confirm customer order"
                  value={newReminder.title}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Category
                </label>

                <select
                  name="category"
                  value={newReminder.category}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="General">
                    General
                  </option>

                  <option value="Custom Order">
                    Custom Order
                  </option>

                  <option value="Customer">
                    Customer
                  </option>

                  <option value="Inventory">
                    Inventory
                  </option>

                  <option value="Delivery">
                    Delivery
                  </option>

                  <option value="Payment">
                    Payment
                  </option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={newReminder.date}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={newReminder.time}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Priority
                </label>

                <select
                  name="priority"
                  value={newReminder.priority}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>
                </select>
              </div>

              <div
                style={{
                  ...styles.formGroup,
                  gridColumn: "1 / -1",
                }}
              >
                <label style={styles.label}>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter reminder details..."
                  value={
                    newReminder.description
                  }
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="4"
                />
              </div>

            </div>

            <button
              type="submit"
              style={styles.saveButton}
            >
              💾 Save Reminder
            </button>

          </form>

        </div>
      )}

      {/* ================= SEARCH & FILTER ================= */}

      <div style={styles.toolbar}>

        <input
          type="text"
          placeholder="🔍 Search reminders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          style={styles.filterSelect}
        >
          <option value="All">
            All Reminders
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="High">
            High Priority
          </option>

          <option value="Medium">
            Medium Priority
          </option>

          <option value="Low">
            Low Priority
          </option>
        </select>

      </div>

      {/* ================= REMINDER LIST ================= */}

      <div style={styles.listContainer}>

        <div style={styles.listHeader}>

          <h2 style={styles.listTitle}>
            📋 Reminder List
          </h2>

          <span style={styles.resultCount}>
            {filteredReminders.length} reminder(s)
          </span>

        </div>

        {filteredReminders.length === 0 ? (

          <div style={styles.emptyState}>

            <div style={styles.emptyIcon}>
              🔔
            </div>

            <h3>
              No reminders found
            </h3>

            <p>
              Try changing your search or
              create a new reminder.
            </p>

          </div>

        ) : (

          <div style={styles.reminderGrid}>

            {filteredReminders.map(
              (reminder) => (

                <div
                  key={reminder.id}
                  style={{
                    ...styles.reminderCard,
                    ...(reminder.completed
                      ? styles.completedCard
                      : {}),
                  }}
                >

                  <div
                    style={
                      styles.reminderTop
                    }
                  >

                    <div>

                      <span
                        style={{
                          ...styles.priorityBadge,
                          background:
                            reminder.priority ===
                            "High"
                              ? "#ef4444"
                              : reminder.priority ===
                                "Medium"
                              ? "#f59e0b"
                              : "#10b981",
                        }}
                      >
                        {reminder.priority}
                      </span>

                      <span
                        style={
                          styles.categoryBadge
                        }
                      >
                        {reminder.category}
                      </span>

                    </div>

                    <span
                      style={
                        styles.reminderId
                      }
                    >
                      {reminder.id}
                    </span>

                  </div>

                  <h3
                    style={{
                      ...styles.reminderTitle,
                      ...(reminder.completed
                        ? styles.completedText
                        : {}),
                    }}
                  >
                    {reminder.title}
                  </h3>

                  <p
                    style={
                      styles.reminderDescription
                    }
                  >
                    {reminder.description ||
                      "No description provided."}
                  </p>

                  <div
                    style={
                      styles.reminderInfo
                    }
                  >

                    <span>
                      📅{" "}
                      {formatDate(
                        reminder.date
                      )}
                    </span>

                    {reminder.time && (
                      <span>
                        🕐 {reminder.time}
                      </span>
                    )}

                  </div>

                  <div
                    style={
                      styles.reminderActions
                    }
                  >

                    <button
                      style={
                        reminder.completed
                          ? styles.undoButton
                          : styles.completeButton
                      }
                      onClick={() =>
                        toggleReminder(
                          reminder.id
                        )
                      }
                    >
                      {reminder.completed
                        ? "↩ Mark Pending"
                        : "✓ Complete"}
                    </button>

                    <button
                      style={
                        styles.deleteButton
                      }
                      onClick={() =>
                        deleteReminder(
                          reminder.id
                        )
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */
const styles = {
  /* ================= PAGE BASE ================= */
  page: { minHeight: "100vh", background: "#fff8fb", padding: "40px", boxSizing: "border-box" },

  /* ================= HEADER ================= */
  header: { maxWidth: "1400px", margin: "0 auto 40px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "25px", flexWrap: "wrap" },
  title: { margin: 0, color: "#222", fontSize: "38px", fontWeight: "700" },
  subtitle: { marginTop: "10px", color: "#777", fontSize: "16px", lineHeight: "28px", maxWidth: "700px" },
  addButton: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "12px", padding: "15px 25px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },

  /* ================= STATS ================= */
  statsGrid: { maxWidth: "1400px", margin: "0 auto 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "20px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "25px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.07)" },
  statIcon: { width: "60px", height: "60px", borderRadius: "15px", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontSize: "28px", flexShrink: 0 },
  statNumber: { margin: 0, fontSize: "30px", color: "#222" },
  statLabel: { margin: "5px 0 0", color: "#777", fontSize: "14px" },

  /* ================= FORM ================= */
  formCard: { maxWidth: "1400px", margin: "0 auto 40px", background: "#fff", padding: "35px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.08)" },
  formTitle: { marginTop: 0, color: "#ec4899", fontSize: "26px", marginBottom: "30px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "22px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontWeight: "600", color: "#444", fontSize: "14px" },
  input: { width: "100%", boxSizing: "border-box", padding: "13px 15px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", outline: "none", background: "#fff" },
  textarea: { width: "100%", boxSizing: "border-box", padding: "13px 15px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", resize: "vertical", outline: "none", fontFamily: "inherit" },
  saveButton: { marginTop: "25px", padding: "14px 30px", background: "#ec4899", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },

  /* ================= TOOLBAR & FILTERS ================= */
  toolbar: { maxWidth: "1400px", margin: "0 auto 30px", display: "flex", gap: "15px", flexWrap: "wrap" },
  searchInput: { flex: 1, minWidth: "280px", padding: "14px 18px", border: "1px solid #ddd", borderRadius: "12px", fontSize: "15px", outline: "none" },
  filterSelect: { width: "220px", padding: "14px", border: "1px solid #ddd", borderRadius: "12px", background: "#fff", fontSize: "15px", outline: "none" },

  /* ================= LIST CONTAINER ================= */
  listContainer: { maxWidth: "1400px", margin: "0 auto", background: "#fff", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.07)" },
  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", gap: "15px", flexWrap: "wrap" },
  listTitle: { margin: 0, fontSize: "25px", color: "#333" },
  resultCount: { color: "#777", fontSize: "14px" },

  /* ================= REMINDER CARDS ================= */
  reminderGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "22px" },
  reminderCard: { border: "1px solid #f1d7e2", borderRadius: "16px", padding: "25px", background: "#fff", transition: "0.3s" },
  completedCard: { opacity: 0.7, background: "#f9faf9" },
  reminderTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "18px" },
  priorityBadge: { color: "#fff", padding: "5px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", marginRight: "7px" },
  categoryBadge: { background: "#fff0f6", color: "#ec4899", padding: "5px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" },
  reminderId: { color: "#999", fontSize: "11px" },
  reminderTitle: { margin: "0 0 10px", fontSize: "20px", color: "#333" },
  completedText: { textDecoration: "line-through" },
  reminderDescription: { color: "#666", fontSize: "14px", lineHeight: "24px", minHeight: "48px" },
  reminderInfo: { display: "flex", gap: "20px", flexWrap: "wrap", padding: "15px 0", margin: "15px 0", borderTop: "1px solid #f2f2f2", borderBottom: "1px solid #f2f2f2", color: "#555", fontSize: "13px" },

  /* ================= BUTTONS & EMPTY STATES ================= */
  reminderActions: { display: "flex", gap: "10px" },
  completeButton: { flex: 1, padding: "11px", border: "none", borderRadius: "9px", background: "#10b981", color: "#fff", fontWeight: "600", cursor: "pointer" },
  undoButton: { flex: 1, padding: "11px", border: "none", borderRadius: "9px", background: "#f59e0b", color: "#fff", fontWeight: "600", cursor: "pointer" },
  deleteButton: { padding: "11px 15px", border: "1px solid #ef4444", borderRadius: "9px", background: "#fff", color: "#ef4444", fontWeight: "600", cursor: "pointer" },
  emptyState: { textAlign: "center", padding: "70px 20px", color: "#777" },
  emptyIcon: { fontSize: "55px", marginBottom: "15px" },
};