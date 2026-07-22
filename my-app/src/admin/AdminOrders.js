// src/pages/AdminOrders.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {

  /* =====================================================
     STATES
  ====================================================== */

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);


  /* =====================================================
     FETCH ORDERS
  ====================================================== */

  const fetchOrders = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (err) {

      console.error(
        "Error fetching orders:",
        err
      );

      setError(
        "Unable to load orders. Please check your server connection."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =====================================================
     INITIAL FETCH
  ====================================================== */

  useEffect(() => {

    fetchOrders();

  }, []);


  /* =====================================================
     DELETE ORDER
  ====================================================== */

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:5000/api/orders/${id}`
      );

      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            order._id !== id
        )
      );

      if (
        selectedOrder &&
        selectedOrder._id === id
      ) {

        setSelectedOrder(null);

      }

      alert(
        "Order deleted successfully."
      );

    } catch (err) {

      console.error(
        "Error deleting order:",
        err
      );

      alert(
        "Failed to delete the order."
      );

    }

  };


  /* =====================================================
     UPDATE ORDER STATUS
  ====================================================== */

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {

    try {

      setUpdatingStatus(true);

      const response =
        await axios.put(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            status: newStatus,
          }
        );

      const updatedOrder =
        response.data;

      setOrders((previousOrders) =>
        previousOrders.map(
          (order) =>
            order._id === orderId
              ? {
                  ...order,
                  ...updatedOrder,
                  status: newStatus,
                }
              : order
        )
      );

      if (
        selectedOrder &&
        selectedOrder._id === orderId
      ) {

        setSelectedOrder({
          ...selectedOrder,
          ...updatedOrder,
          status: newStatus,
        });

      }

    } catch (err) {

      console.error(
        "Error updating order status:",
        err
      );

      alert(
        "Unable to update order status."
      );

    } finally {

      setUpdatingStatus(false);

    }

  };


  /* =====================================================
     FILTER ORDERS
  ====================================================== */

  const filteredOrders =
    orders.filter((order) => {

      const customerName =
        order.userId?.name ||
        order.user?.name ||
        "";

      const orderId =
        order._id || "";

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        customerName
          .toLowerCase()
          .includes(searchText) ||

        orderId
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : order.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  /* =====================================================
     ORDER STATISTICS
  ====================================================== */

  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "Pending"
    ).length;

  const processingOrders =
    orders.filter(
      (order) =>
        order.status === "Processing" ||
        order.status === "Confirmed"
    ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;


  /* =====================================================
     TOTAL REVENUE
  ====================================================== */

  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.totalAmount || 0
        ),
      0
    );


  /* =====================================================
     FORMAT DATE
  ====================================================== */

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    try {

      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return "N/A";

    }

  };


  /* =====================================================
     GET STATUS COLOR
  ====================================================== */

  const getStatusStyle = (
    status
  ) => {

    switch (status) {

      case "Pending":
        return styles.pendingStatus;

      case "Confirmed":
        return styles.confirmedStatus;

      case "Processing":
        return styles.processingStatus;

      case "Shipped":
        return styles.shippedStatus;

      case "Delivered":
        return styles.deliveredStatus;

      case "Cancelled":
        return styles.cancelledStatus;

      default:
        return styles.defaultStatus;

    }

  };


  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {

    return (

      <div style={styles.loadingContainer}>

        <div style={styles.loadingIcon}>
          🌸
        </div>

        <h2>
          Loading Orders...
        </h2>

        <p>
          Please wait while we fetch
          the latest orders.
        </p>

      </div>

    );

  }


  /* =====================================================
     MAIN UI
  ====================================================== */

  return (

    <div style={styles.page}>

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div style={styles.pageHeader}>

        <div>

          <h1 style={styles.pageTitle}>
            📦 Manage Orders
          </h1>

          <p style={styles.pageSubtitle}>
            View, manage and track all
            customer orders.
          </p>

        </div>

        <button
          style={styles.refreshButton}
          onClick={fetchOrders}
        >
          🔄 Refresh Orders
        </button>

      </div>


      {/* =================================================
          ERROR
      ================================================== */}

      {error && (

        <div style={styles.errorBox}>

          ⚠️ {error}

          <button
            style={styles.retryButton}
            onClick={fetchOrders}
          >
            Retry
          </button>

        </div>

      )}


      {/* =================================================
          STATISTICS
      ================================================== */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>

          <div
            style={{
              ...styles.statIcon,
              background: "#ec4899",
            }}
          >
            📦
          </div>

          <div>

            <h2 style={styles.statValue}>
              {totalOrders}
            </h2>

            <p style={styles.statLabel}>
              Total Orders
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

            <h2 style={styles.statValue}>
              {pendingOrders}
            </h2>

            <p style={styles.statLabel}>
              Pending Orders
            </p>

          </div>

        </div>


        <div style={styles.statCard}>

          <div
            style={{
              ...styles.statIcon,
              background: "#3b82f6",
            }}
          >
            🔄
          </div>

          <div>

            <h2 style={styles.statValue}>
              {processingOrders}
            </h2>

            <p style={styles.statLabel}>
              Processing
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

            <h2 style={styles.statValue}>
              {deliveredOrders}
            </h2>

            <p style={styles.statLabel}>
              Delivered
            </p>

          </div>

        </div>


        <div style={styles.statCard}>

          <div
            style={{
              ...styles.statIcon,
              background: "#8b5cf6",
            }}
          >
            💰
          </div>

          <div>

            <h2 style={styles.statValue}>
              ₹
              {totalRevenue.toLocaleString(
                "en-IN"
              )}
            </h2>

            <p style={styles.statLabel}>
              Total Revenue
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          SEARCH & FILTER
      ================================================== */}

      <div style={styles.filterSection}>

        <input
          type="text"
          placeholder="🔍 Search by Order ID or Customer..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.searchInput}
        />


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          style={styles.statusFilter}
        >

          <option value="All">
            All Orders
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>


      {/* =================================================
          ORDER TABLE
      ================================================== */}

      <div style={styles.tableCard}>

        <div style={styles.tableHeader}>

          <h2>
            📋 Customer Orders
          </h2>

          <span>
            Showing{" "}
            {filteredOrders.length}{" "}
            of {orders.length}
          </span>

        </div>


        {filteredOrders.length === 0 ? (

          <div style={styles.emptyState}>

            <div style={styles.emptyIcon}>
              📦
            </div>

            <h3>
              No Orders Found
            </h3>

            <p>
              No orders match your
              current search or filter.
            </p>

          </div>

        ) : (

          <div style={styles.tableContainer}>

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>
                    Order ID
                  </th>

                  <th style={styles.th}>
                    Customer
                  </th>

                  <th style={styles.th}>
                    Items
                  </th>

                  <th style={styles.th}>
                    Total
                  </th>

                  <th style={styles.th}>
                    Date
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                  <th style={styles.th}>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredOrders.map(
                  (order) => (

                    <tr
                      key={
                        order._id
                      }
                      style={
                        styles.tableRow
                      }
                    >

                      {/* ORDER ID */}

                      <td style={styles.td}>

                        <strong
                          style={
                            styles.orderId
                          }
                        >
                          {order._id}
                        </strong>

                      </td>


                      {/* CUSTOMER */}

                      <td style={styles.td}>

                        <strong>
                          {
                            order.userId
                              ?.name ||
                            order.user
                              ?.name ||
                            "N/A"
                          }
                        </strong>

                      </td>


                      {/* ITEMS */}

                      <td style={styles.td}>

                        <div
                          style={
                            styles.itemsList
                          }
                        >

                          {order.items?.map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={
                                  index
                                }
                                style={
                                  styles.item
                                }
                              >

                                <span>
                                  {
                                    item.name
                                  }
                                </span>

                                <span>
                                  ×{" "}
                                  {
                                    item.quantity
                                  }
                                </span>

                              </div>

                            )
                          )}

                        </div>

                      </td>


                      {/* TOTAL */}

                      <td style={styles.td}>

                        <strong
                          style={
                            styles.amount
                          }
                        >
                          ₹
                          {Number(
                            order.totalAmount ||
                            0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </td>


                      {/* DATE */}

                      <td style={styles.td}>

                        {formatDate(
                          order.createdAt
                        )}

                      </td>


                      {/* STATUS */}

                      <td style={styles.td}>

                        <span
                          style={{
                            ...styles.statusBadge,
                            ...getStatusStyle(
                              order.status
                            ),
                          }}
                        >
                          {order.status ||
                            "Pending"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td style={styles.td}>

                        <div
                          style={
                            styles.actionButtons
                          }
                        >

                          <button
                            style={
                              styles.viewButton
                            }
                            onClick={() =>
                              setSelectedOrder(
                                order
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            style={
                              styles.deleteButton
                            }
                            onClick={() =>
                              handleDelete(
                                order._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          ORDER DETAILS MODAL
      ================================================== */}

      {selectedOrder && (

        <div
          style={styles.modalOverlay}
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            style={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div style={styles.modalHeader}>

              <div>

                <h2 style={styles.modalTitle}>
                  📦 Order Details
                </h2>

                <p style={styles.modalOrderId}>
                  Order ID:{" "}
                  {selectedOrder._id}
                </p>

              </div>

              <button
                style={styles.closeButton}
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ✕
              </button>

            </div>


            {/* CUSTOMER */}

            <div style={styles.modalSection}>

              <h3>
                👤 Customer Information
              </h3>

              <div
                style={
                  styles.detailGrid
                }
              >

                <div
                  style={
                    styles.detailBox
                  }
                >

                  <strong>
                    Name
                  </strong>

                  <span>
                    {
                      selectedOrder
                        .userId
                        ?.name ||
                      selectedOrder
                        .user
                        ?.name ||
                      "N/A"
                    }
                  </span>

                </div>

                <div
                  style={
                    styles.detailBox
                  }
                >

                  <strong>
                    Email
                  </strong>

                  <span>
                    {
                      selectedOrder
                        .userId
                        ?.email ||
                      selectedOrder
                        .user
                        ?.email ||
                      "N/A"
                    }
                  </span>

                </div>

              </div>

            </div>


            {/* ITEMS */}

            <div style={styles.modalSection}>

              <h3>
                🌸 Ordered Items
              </h3>

              <div
                style={
                  styles.modalItems
                }
              >

                {selectedOrder.items?.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      style={
                        styles.modalItem
                      }
                    >

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <p>
                          Quantity:{" "}
                          {item.quantity}
                        </p>

                      </div>

                      <strong>
                        ₹
                        {Number(
                          item.price ||
                          0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* TOTAL */}

            <div
              style={
                styles.modalTotal
              }
            >

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {Number(
                  selectedOrder.totalAmount ||
                  0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            {/* STATUS */}

            <div style={styles.modalSection}>

              <h3>
                🔄 Update Order Status
              </h3>

              <select
                value={
                  selectedOrder.status ||
                  "Pending"
                }
                disabled={
                  updatingStatus
                }
                onChange={(e) =>
                  handleStatusChange(
                    selectedOrder._id,
                    e.target.value
                  )
                }
                style={
                  styles.modalStatusSelect
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>


            {/* DELETE */}

            <button
              style={
                styles.modalDeleteButton
              }
              onClick={() =>
                handleDelete(
                  selectedOrder._id
                )
              }
            >
              🗑 Delete Order
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

/* =========================================================
   STYLES
========================================================= */
const styles = {
  /* ================= PAGE BASE ================= */
  page: { width: "100%" },

  /* ================= HEADER ================= */
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", marginBottom: "30px", flexWrap: "wrap" },
  pageTitle: { margin: 0, fontSize: "34px", color: "#222" },
  pageSubtitle: { marginTop: "8px", color: "#777", fontSize: "16px" },
  refreshButton: { padding: "12px 20px", border: "none", borderRadius: "10px", background: "#ec4899", color: "#fff", fontWeight: "700", cursor: "pointer" },

  /* ================= ERROR ================= */
  errorBox: { background: "#fff1f2", color: "#be123c", padding: "15px 20px", borderRadius: "12px", marginBottom: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px" },
  retryButton: { background: "#be123c", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 15px", cursor: "pointer" },

  /* ================= STATS ================= */
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "20px", marginBottom: "30px" },
  statCard: { background: "#fff", borderRadius: "16px", padding: "22px", display: "flex", alignItems: "center", gap: "15px", boxShadow: "0 6px 18px rgba(0,0,0,.06)" },
  statIcon: { width: "55px", height: "55px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "25px" },
  statValue: { margin: 0, fontSize: "25px", color: "#222" },
  statLabel: { margin: "5px 0 0", color: "#777", fontSize: "14px" },

  /* ================= FILTER ================= */
  filterSection: { display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" },
  searchInput: { flex: 1, minWidth: "280px", padding: "14px 18px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", outline: "none" },
  statusFilter: { minWidth: "200px", padding: "14px", border: "1px solid #ddd", borderRadius: "10px", background: "#fff", fontSize: "15px", outline: "none" },

  /* ================= TABLE ================= */
  tableCard: { background: "#fff", borderRadius: "18px", boxShadow: "0 6px 20px rgba(0,0,0,.07)", overflow: "hidden" },
  tableHeader: { padding: "22px 25px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px", flexWrap: "wrap", borderBottom: "1px solid #eee" },
  tableContainer: { width: "100%", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "1000px" },
  th: { background: "#fff8fb", color: "#444", padding: "16px", textAlign: "left", fontSize: "14px", borderBottom: "1px solid #eee" },
  td: { padding: "16px", borderBottom: "1px solid #f2f2f2", color: "#555", verticalAlign: "top", fontSize: "14px" },
  tableRow: { transition: "background 0.2s" },

  /* ================= TABLE CONTENT ================= */
  orderId: { color: "#ec4899", fontSize: "13px" },
  itemsList: { display: "flex", flexDirection: "column", gap: "5px" },
  item: { display: "flex", gap: "5px" },
  amount: { color: "#10b981" },

  /* ================= BADGES ================= */
  statusBadge: { display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" },
  pendingStatus: { background: "#fef3c7", color: "#b45309" },
  confirmedStatus: { background: "#dbeafe", color: "#1d4ed8" },
  processingStatus: { background: "#ede9fe", color: "#6d28d9" },
  shippedStatus: { background: "#cffafe", color: "#0e7490" },
  deliveredStatus: { background: "#d1fae5", color: "#047857" },
  cancelledStatus: { background: "#fee2e2", color: "#b91c1c" },
  defaultStatus: { background: "#f3f4f6", color: "#374151" },

  /* ================= BUTTONS ================= */
  actionButtons: { display: "flex", gap: "8px" },
  viewButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 13px", cursor: "pointer", fontWeight: "600" },
  deleteButton: { background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "8px", padding: "8px 13px", cursor: "pointer", fontWeight: "600" },

  /* ================= EMPTY & LOADING ================= */
  emptyState: { textAlign: "center", padding: "70px 20px" },
  emptyIcon: { fontSize: "50px", marginBottom: "15px" },
  loadingContainer: { textAlign: "center", padding: "100px 20px" },
  loadingIcon: { fontSize: "50px", marginBottom: "15px" },

  /* ================= MODAL ================= */
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.55)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 2000 },
  modal: { background: "#fff", width: "100%", maxWidth: "750px", maxHeight: "90vh", overflowY: "auto", borderRadius: "20px", padding: "30px", boxShadow: "0 20px 50px rgba(0,0,0,.2)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #eee", paddingBottom: "20px" },
  modalTitle: { margin: 0, color: "#222" },
  modalOrderId: { color: "#ec4899", fontSize: "13px" },
  closeButton: { width: "35px", height: "35px", border: "none", borderRadius: "50%", background: "#f3f3f3", cursor: "pointer", fontSize: "16px" },
  modalSection: { marginTop: "25px" },
  detailGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "15px", marginTop: "15px" },
  detailBox: { background: "#fff8fb", padding: "15px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "7px" },
  modalItems: { marginTop: "15px" },
  modalItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1px solid #eee" },
  modalTotal: { display: "flex", justifyContent: "space-between", padding: "20px 0", marginTop: "15px", borderTop: "2px solid #eee", fontSize: "20px" },
  modalStatusSelect: { width: "100%", padding: "14px", marginTop: "10px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px" },
  modalDeleteButton: { width: "100%", marginTop: "25px", padding: "14px", border: "none", borderRadius: "10px", background: "#fee2e2", color: "#dc2626", fontWeight: "700", cursor: "pointer" },
};

export default AdminOrders;

