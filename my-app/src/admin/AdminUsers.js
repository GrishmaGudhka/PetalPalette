// src/pages/AdminUsers.js

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH USERS =================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);

      setError(
        "Unable to load users. Please check if the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= DELETE USER =================

  const handleDelete = async (id) => {
    const user = users.find(
      (user) => user._id === id
    );

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${
        user?.name || "this user"
      }?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );

      // Remove deleted user from UI
      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user._id !== id
        )
      );

      alert("User deleted successfully.");
    } catch (err) {
      console.error(
        "Error deleting user:",
        err
      );

      alert(
        "Failed to delete user. Please try again."
      );
    }
  };

  // ================= SEARCH FILTER =================

  const filteredUsers = users.filter((user) => {
    const searchValue =
      search.toLowerCase();

    const name =
      user.name?.toLowerCase() || "";

    const email =
      user.email?.toLowerCase() || "";

    const phone =
      user.phone?.toLowerCase() || "";

    return (
      name.includes(searchValue) ||
      email.includes(searchValue) ||
      phone.includes(searchValue)
    );
  });

  // ================= LOADING =================

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingIcon}>
            🌸
          </div>

          <h2 style={styles.loadingTitle}>
            Loading Users...
          </h2>

          <p style={styles.loadingText}>
            Please wait while we fetch the
            customer list.
          </p>
        </div>
      </div>
    );
  }

  // ================= MAIN UI =================

  return (
    <div style={styles.page}>

      {/* ================= HEADER ================= */}

      <div style={styles.headerSection}>

        <div>
          <h1 style={styles.pageTitle}>
            👥 Manage Users
          </h1>

          <p style={styles.pageSubtitle}>
            View and manage registered
            PetalPalette customers.
          </p>
        </div>

        <button
          style={styles.refreshButton}
          onClick={fetchUsers}
        >
          🔄 Refresh
        </button>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div style={styles.errorBox}>
          ⚠️ {error}

          <button
            style={styles.retryButton}
            onClick={fetchUsers}
          >
            Try Again
          </button>
        </div>
      )}

      {/* ================= STATISTICS ================= */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>

          <div
            style={{
              ...styles.statIcon,
              background: "#ec4899",
            }}
          >
            👥
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {users.length}
            </h2>

            <p style={styles.statLabel}>
              Total Users
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
              {filteredUsers.length}
            </h2>

            <p style={styles.statLabel}>
              Matching Users
            </p>
          </div>

        </div>

      </div>

      {/* ================= USER MANAGEMENT CARD ================= */}

      <div style={styles.card}>

        <div style={styles.cardHeader}>

          <div>
            <h2 style={styles.cardTitle}>
              Registered Customers
            </h2>

            <p style={styles.cardSubtitle}>
              {users.length} registered user
              {users.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          <span style={styles.userBadge}>
            {filteredUsers.length} Results
          </span>

        </div>

        {/* ================= SEARCH ================= */}

        <div style={styles.searchContainer}>

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.searchInput}
          />

          {search && (
            <button
              style={styles.clearButton}
              onClick={() =>
                setSearch("")
              }
            >
              ✕ Clear
            </button>
          )}

        </div>

        {/* ================= NO USERS ================= */}

        {users.length === 0 ? (

          <div style={styles.emptyState}>

            <div style={styles.emptyIcon}>
              👥
            </div>

            <h3 style={styles.emptyTitle}>
              No Users Found
            </h3>

            <p style={styles.emptyText}>
              There are currently no registered
              customers in the system.
            </p>

          </div>

        ) : filteredUsers.length === 0 ? (

          <div style={styles.emptyState}>

            <div style={styles.emptyIcon}>
              🔍
            </div>

            <h3 style={styles.emptyTitle}>
              No Matching Users
            </h3>

            <p style={styles.emptyText}>
              Try searching with a different
              name, email or phone number.
            </p>

          </div>

        ) : (

          /* ================= TABLE ================= */

          <div style={styles.tableWrapper}>

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>
                    #
                  </th>

                  <th style={styles.th}>
                    User ID
                  </th>

                  <th style={styles.th}>
                    Name
                  </th>

                  <th style={styles.th}>
                    Email
                  </th>

                  <th style={styles.th}>
                    Phone
                  </th>

                  <th style={styles.th}>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map(
                  (user, index) => (

                    <tr
                      key={user._id}
                      style={styles.tableRow}
                    >

                      <td style={styles.td}>
                        {index + 1}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={
                            styles.userId
                          }
                        >
                          {user._id}
                        </span>
                      </td>

                      <td style={styles.td}>

                        <div
                          style={
                            styles.userNameContainer
                          }
                        >

                          <div
                            style={
                              styles.avatar
                            }
                          >
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "U"}
                          </div>

                          <strong
                            style={
                              styles.userName
                            }
                          >
                            {user.name ||
                              "N/A"}
                          </strong>

                        </div>

                      </td>

                      <td style={styles.td}>
                        {user.email ||
                          "N/A"}
                      </td>

                      <td style={styles.td}>
                        {user.phone ||
                          "N/A"}
                      </td>

                      <td style={styles.td}>

                        <button
                          onClick={() =>
                            handleDelete(
                              user._id
                            )
                          }
                          style={
                            styles.deleteButton
                          }
                        >
                          🗑️ Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = {

  page: {
    minHeight: "100vh",
    background: "#fff8fb",
    padding: "40px",
    boxSizing: "border-box",
  },

  // ================= HEADER =================

  headerSection: {
    maxWidth: "1400px",
    margin: "0 auto 35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  pageTitle: {
    margin: 0,
    color: "#222",
    fontSize: "36px",
    fontWeight: "700",
  },

  pageSubtitle: {
    marginTop: "10px",
    color: "#777",
    fontSize: "16px",
  },

  refreshButton: {
    background:
      "linear-gradient(135deg,#ec4899,#f472b6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  // ================= ERROR =================

  errorBox: {
    maxWidth: "1400px",
    margin: "0 auto 25px",
    background: "#fff1f2",
    border: "1px solid #fecdd3",
    color: "#be123c",
    borderRadius: "12px",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    flexWrap: "wrap",
  },

  retryButton: {
    background: "#be123c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "600",
  },

  // ================= STATS =================

  statsGrid: {
    maxWidth: "1400px",
    margin: "0 auto 35px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },

  statCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,.08)",
  },

  statIcon: {
    width: "65px",
    height: "65px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "30px",
    flexShrink: 0,
  },

  statNumber: {
    margin: 0,
    fontSize: "30px",
    color: "#222",
  },

  statLabel: {
    margin: "6px 0 0",
    color: "#777",
  },

  // ================= MAIN CARD =================

  card: {
    maxWidth: "1400px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,.08)",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  cardTitle: {
    margin: 0,
    color: "#222",
    fontSize: "26px",
  },

  cardSubtitle: {
    color: "#777",
    marginTop: "8px",
  },

  userBadge: {
    background: "#fff0f6",
    color: "#ec4899",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "14px",
  },

  // ================= SEARCH =================

  searchContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  searchInput: {
    flex: 1,
    minWidth: "280px",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },

  clearButton: {
    padding: "12px 18px",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#555",
  },

  // ================= TABLE =================

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "14px",
    border: "1px solid #eee",
  },

  table: {
    width: "100%",
    minWidth: "900px",
    borderCollapse: "collapse",
  },

  th: {
    background: "#ec4899",
    color: "#fff",
    padding: "16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "16px",
    borderBottom:
      "1px solid #f1f1f1",
    color: "#555",
    fontSize: "14px",
    verticalAlign: "middle",
  },

  tableRow: {
    background: "#fff",
  },

  userId: {
    fontSize: "12px",
    color: "#888",
    wordBreak: "break-all",
  },

  userNameContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#ec4899,#f472b6)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },

  userName: {
    color: "#333",
  },

  deleteButton: {
    padding: "9px 14px",
    background: "#fff1f2",
    color: "#dc2626",
    border:
      "1px solid #fecaca",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  // ================= EMPTY STATE =================

  emptyState: {
    textAlign: "center",
    padding: "70px 20px",
  },

  emptyIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  emptyTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },

  emptyText: {
    color: "#777",
    fontSize: "16px",
  },

  // ================= LOADING =================

  loadingCard: {
    maxWidth: "500px",
    margin: "100px auto",
    background: "#fff",
    borderRadius: "20px",
    padding: "50px",
    textAlign: "center",
    boxShadow:
      "0 8px 25px rgba(0,0,0,.08)",
  },

  loadingIcon: {
    fontSize: "50px",
    marginBottom: "20px",
  },

  loadingTitle: {
    color: "#ec4899",
    fontSize: "25px",
  },

  loadingText: {
    color: "#777",
  },

};