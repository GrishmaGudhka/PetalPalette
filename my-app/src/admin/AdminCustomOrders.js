// src/pages/AdminCustomOrder.js

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminCustomOrder = () => {
  /* =========================================================
     SAMPLE CUSTOM ORDERS
  ========================================================= */

  const [orders, setOrders] = useState([
    {
      id: "PP-C001",
      customer: "Riya Patel",
      phone: "+91 9876543210",
      email: "riya@gmail.com",

      occasion: "Birthday",
      budget: 2500,

      deliveryDate: "22 July 2026",
      deliveryTime: "10:00 AM",

      status: "Pending",

      bouquetSize: "Medium",

      flowers: "Red Roses, White Lilies, Baby's Breath",

      colors: "Red & White",

      wrapping: "Luxury Pink Wrap",

      vase: "Yes",

      message:
        "Happy Birthday! Wishing you a wonderful year ahead.",

      address: "Bandra West, Mumbai",

      specialInstruction:
        "Please avoid strong fragrance.",

      estimatedPrice: null,

      referenceImage: "",
    },

    {
      id: "PP-C002",
      customer: "Rahul Sharma",
      phone: "+91 9988776655",
      email: "rahul@gmail.com",

      occasion: "Anniversary",
      budget: 4500,

      deliveryDate: "25 July 2026",
      deliveryTime: "5:00 PM",

      status: "Designing",

      bouquetSize: "Large",

      flowers: "Pink Roses, Tulips, Orchids",

      colors: "Pink & White",

      wrapping: "Black Luxury Wrap",

      vase: "No",

      message: "Happy Anniversary ❤️",

      address: "Andheri East, Mumbai",

      specialInstruction:
        "Use premium imported flowers.",

      estimatedPrice: 4200,

      referenceImage: "",
    },

    {
      id: "PP-C003",
      customer: "Sneha Mehta",
      phone: "+91 9123456789",
      email: "sneha@gmail.com",

      occasion: "Wedding",
      budget: 8000,

      deliveryDate: "30 July 2026",
      deliveryTime: "9:00 AM",

      status: "Ready",

      bouquetSize: "Luxury",

      flowers: "White Roses, Hydrangeas, Orchids",

      colors: "White & Gold",

      wrapping: "Golden Wrap",

      vase: "Yes",

      message:
        "Congratulations on your wedding!",

      address: "Powai, Mumbai",

      specialInstruction:
        "Deliver before ceremony starts.",

      estimatedPrice: 7800,

      referenceImage: "",
    },

    {
      id: "PP-C004",
      customer: "Aarav Shah",
      phone: "+91 9876501234",
      email: "aarav@gmail.com",

      occasion: "Congratulations",
      budget: 3500,

      deliveryDate: "2 August 2026",
      deliveryTime: "4:00 PM",

      status: "Out for Delivery",

      bouquetSize: "Medium",

      flowers: "Yellow Roses, Sunflowers, Baby's Breath",

      colors: "Yellow & White",

      wrapping: "Classic Kraft Wrap",

      vase: "No",

      message:
        "Congratulations on your wonderful achievement!",

      address: "Bandra East, Mumbai",

      specialInstruction:
        "Please call the recipient before delivery.",

      estimatedPrice: 3300,

      referenceImage: "",
    },

    {
      id: "PP-C005",
      customer: "Meera Joshi",
      phone: "+91 9988123456",
      email: "meera@gmail.com",

      occasion: "Birthday",
      budget: 5000,

      deliveryDate: "18 July 2026",
      deliveryTime: "11:00 AM",

      status: "Delivered",

      bouquetSize: "Large",

      flowers: "Pink Roses, Peonies, Lilies",

      colors: "Pink & Peach",

      wrapping: "Premium Peach Wrap",

      vase: "Yes",

      message:
        "Wishing you a beautiful and joyful birthday!",

      address: "Juhu, Mumbai",

      specialInstruction:
        "Please leave the bouquet with the security desk if unavailable.",

      estimatedPrice: 4800,

      referenceImage: "",
    },
  ]);

  /* =========================================================
     SELECTED ORDER
  ========================================================= */

  const [selectedOrder, setSelectedOrder] =
    useState(orders[0]);

  /* =========================================================
     SEARCH & FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  /* =========================================================
     FILTERED ORDERS
  ========================================================= */

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      order.customer
        .toLowerCase()
        .includes(searchText) ||
      order.id
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "All"
        ? true
        : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================================================
     UPDATE ORDER STATUS
  ========================================================= */

  const updateStatus = (
    orderId,
    newStatus
  ) => {
    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
    );

    setOrders(updatedOrders);

    if (selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
      });
    }
  };

  /* =========================================================
     UPDATE ESTIMATED PRICE
  ========================================================= */

  const updatePrice = (value) => {
    const updatedOrders = orders.map(
      (order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              estimatedPrice:
                value === ""
                  ? null
                  : Number(value),
            }
          : order
    );

    setOrders(updatedOrders);

    setSelectedOrder({
      ...selectedOrder,
      estimatedPrice:
        value === ""
          ? null
          : Number(value),
    });
  };

  /* =========================================================
     SEND QUOTATION
  ========================================================= */

  const sendQuotation = () => {
    if (
      !selectedOrder.estimatedPrice ||
      selectedOrder.estimatedPrice <= 0
    ) {
      alert(
        "Please enter a valid quotation amount first."
      );
      return;
    }

    alert(
      `Quotation of ₹${selectedOrder.estimatedPrice.toLocaleString(
        "en-IN"
      )} sent to ${selectedOrder.customer}.`
    );
  };

  /* =========================================================
     CUSTOMER COMMUNICATION
  ========================================================= */

  const contactCustomer = (type) => {
    alert(
      `${type} feature for ${selectedOrder.customer} will be connected with the backend later.`
    );
  };

  /* =========================================================
     STATUS COLOR
  ========================================================= */

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f59e0b";

      case "Designing":
        return "#3b82f6";

      case "Ready":
        return "#8b5cf6";

      case "Out for Delivery":
        return "#f97316";

      case "Delivered":
        return "#10b981";

      case "Cancelled":
        return "#ef4444";

      default:
        return "#6b7280";
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <Header />

      {/* =====================================================
          PAGE WRAPPER
      ===================================================== */}

      <div style={styles.page}>

        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <section style={styles.hero}>

          <h1 style={styles.heroTitle}>
            🌸 Custom Bouquet Orders
          </h1>

          <p style={styles.heroSubtitle}>
            Manage personalized bouquet requests,
            approve designs, update order status,
            send quotations, and communicate
            directly with customers.
          </p>

        </section>

        {/* ===================================================
            MAIN CONTAINER
        =================================================== */}

        <div style={styles.container}>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <section style={styles.statsGrid}>

            {/* TOTAL ORDERS */}

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#ec4899",
                }}
              >
                📦
              </div>

              <div style={styles.statContent}>

                <h2 style={styles.statValue}>
                  {orders.length}
                </h2>

                <p style={styles.statTitle}>
                  Total Orders
                </p>

              </div>

            </div>

            {/* PENDING */}

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#f59e0b",
                }}
              >
                ⏳
              </div>

              <div style={styles.statContent}>

                <h2 style={styles.statValue}>
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Pending"
                    ).length
                  }
                </h2>

                <p style={styles.statTitle}>
                  Pending
                </p>

              </div>

            </div>

            {/* DESIGNING */}

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#3b82f6",
                }}
              >
                🎨
              </div>

              <div style={styles.statContent}>

                <h2 style={styles.statValue}>
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Designing"
                    ).length
                  }
                </h2>

                <p style={styles.statTitle}>
                  Designing
                </p>

              </div>

            </div>

            {/* OUT FOR DELIVERY */}

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#f97316",
                }}
              >
                🚚
              </div>

              <div style={styles.statContent}>

                <h2 style={styles.statValue}>
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Out for Delivery"
                    ).length
                  }
                </h2>

                <p style={styles.statTitle}>
                  Out for Delivery
                </p>

              </div>

            </div>

            {/* COMPLETED */}

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#10b981",
                }}
              >
                ✅
              </div>

              <div style={styles.statContent}>

                <h2 style={styles.statValue}>
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Delivered"
                    ).length
                  }
                </h2>

                <p style={styles.statTitle}>
                  Completed
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              SEARCH & FILTER
          ================================================= */}

          <section
            style={styles.searchSection}
          >

            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
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
              style={styles.filterSelect}
            >

              <option value="All">
                All Orders
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Designing">
                Designing
              </option>

              <option value="Ready">
                Ready
              </option>

              <option value="Out for Delivery">
                Out for Delivery
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </section>

          {/* =================================================
              CUSTOM ORDER TABLE
          ================================================= */}

          <section style={styles.section}>

            <h2 style={styles.sectionTitle}>
              📋 Custom Bouquet Requests
            </h2>

            <div style={styles.tableContainer}>

              <table style={styles.table}>

                <thead>

                  <tr>

                    <th style={styles.tableHeader}>
                      Order ID
                    </th>

                    <th style={styles.tableHeader}>
                      Customer
                    </th>

                    <th style={styles.tableHeader}>
                      Occasion
                    </th>

                    <th style={styles.tableHeader}>
                      Budget
                    </th>

                    <th style={styles.tableHeader}>
                      Delivery
                    </th>

                    <th style={styles.tableHeader}>
                      Status
                    </th>

                    <th style={styles.tableHeader}>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(
                      (order) => (

                        <tr key={order.id}>

                          <td
                            style={
                              styles.tableCell
                            }
                          >
                            {order.id}
                          </td>

                          <td
                            style={
                              styles.tableCell
                            }
                          >
                            {order.customer}
                          </td>

                          <td
                            style={
                              styles.tableCell
                            }
                          >
                            {order.occasion}
                          </td>

                          <td
                            style={
                              styles.tableCell
                            }
                          >
                            ₹
                            {order.budget.toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td
                            style={
                              styles.tableCell
                            }
                          >
                            {order.deliveryDate}
                          </td>

                          <td
                            style={
                              styles.tableCell
                            }
                          >

                            <span
                              style={{
                                ...styles.statusBadge,
                                background:
                                  getStatusColor(
                                    order.status
                                  ),
                              }}
                            >
                              {order.status}
                            </span>

                          </td>

                          <td
                            style={
                              styles.tableCell
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

                          </td>

                        </tr>

                      )
                    )
                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        style={
                          styles.emptyTable
                        }
                      >
                        🔍 No custom orders found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>
                    {/* =================================================
              ORDER DETAILS
          ================================================= */}

          <section style={styles.section}>

            <h2 style={styles.sectionTitle}>
              🌸 Order Details
            </h2>

            <div style={styles.detailsGrid}>

              {/* =============================================
                  CUSTOMER INFORMATION
              ============================================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  👤 Customer Information
                </h3>

                <div style={styles.infoRow}>
                  <strong>Name</strong>
                  <span>
                    {selectedOrder.customer}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Phone</strong>
                  <span>
                    {selectedOrder.phone}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Email</strong>
                  <span>
                    {selectedOrder.email}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Address</strong>
                  <span>
                    {selectedOrder.address}
                  </span>
                </div>

              </div>

              {/* =============================================
                  BOUQUET DETAILS
              ============================================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  💐 Bouquet Details
                </h3>

                <div style={styles.infoRow}>
                  <strong>Occasion</strong>
                  <span>
                    {selectedOrder.occasion}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Budget</strong>
                  <span>
                    ₹
                    {selectedOrder.budget.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Bouquet Size</strong>
                  <span>
                    {selectedOrder.bouquetSize}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Flowers</strong>
                  <span>
                    {selectedOrder.flowers}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Colour Theme</strong>
                  <span>
                    {selectedOrder.colors}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Wrapping</strong>
                  <span>
                    {selectedOrder.wrapping}
                  </span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Vase</strong>
                  <span>
                    {selectedOrder.vase}
                  </span>
                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              DELIVERY INFORMATION
          ================================================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                🚚 Delivery Information
              </h3>

              <div style={styles.deliveryGrid}>

                <div style={styles.deliveryBox}>

                  <strong>
                    Delivery Date
                  </strong>

                  <p>
                    {selectedOrder.deliveryDate}
                  </p>

                </div>

                <div style={styles.deliveryBox}>

                  <strong>
                    Delivery Time
                  </strong>

                  <p>
                    {selectedOrder.deliveryTime}
                  </p>

                </div>

                <div style={styles.deliveryBox}>

                  <strong>
                    Current Status
                  </strong>

                  <p
                    style={{
                      color: getStatusColor(
                        selectedOrder.status
                      ),
                      fontWeight: "700",
                    }}
                  >
                    {selectedOrder.status}
                  </p>

                </div>

                <div style={styles.deliveryBox}>

                  <strong>
                    Order ID
                  </strong>

                  <p>
                    {selectedOrder.id}
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              MESSAGE & SPECIAL INSTRUCTIONS
          ================================================= */}

          <section style={styles.section}>

            <div style={styles.notesGrid}>

              {/* GREETING MESSAGE */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  💌 Greeting Message
                </h3>

                <div style={styles.messageBox}>
                  {selectedOrder.message}
                </div>

              </div>

              {/* SPECIAL INSTRUCTIONS */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  📝 Special Instructions
                </h3>

                <div style={styles.messageBox}>
                  {
                    selectedOrder.specialInstruction
                  }
                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              REFERENCE IMAGE
          ================================================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                🖼 Reference Image
              </h3>

              {selectedOrder.referenceImage ? (

                <img
                  src={
                    selectedOrder.referenceImage
                  }
                  alt="Customer Reference"
                  style={
                    styles.referenceImage
                  }
                />

              ) : (

                <div
                  style={
                    styles.imagePlaceholder
                  }
                >

                  <div
                    style={
                      styles.placeholderIcon
                    }
                  >
                    📷
                  </div>

                  <p>
                    Customer did not upload
                    any reference image.
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* =================================================
              INVENTORY RECOMMENDATION
          ================================================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                🌼 Inventory Recommendation
              </h3>

              <p
                style={
                  styles.cardDescription
                }
              >
                Based on the customer's custom
                bouquet requirements, the following
                items may be required for preparing
                this order.
              </p>

              <div
                style={
                  styles.inventoryGrid
                }
              >

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🌹 Premium Roses
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🌸 Lilies
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🌼 Carnations
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🌿 Baby's Breath
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🍃 Imported Greenery
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🎀 Luxury Wrapping Paper
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  🏺 Decorative Vase
                </div>

                <div
                  style={
                    styles.inventoryItem
                  }
                >
                  💌 Greeting Card
                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              PRICE QUOTATION & STATUS UPDATE
          ================================================= */}

          <section style={styles.section}>

            <div style={styles.actionGrid}>

              {/* =============================================
                  PRICE QUOTATION
              ============================================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  💰 Price Quotation
                </h3>

                <p
                  style={
                    styles.cardDescription
                  }
                >
                  Enter the final quotation amount
                  for this custom bouquet. The
                  customer can be notified once the
                  quotation is ready.
                </p>

                <div
                  style={
                    styles.budgetReference
                  }
                >
                  <span>
                    Customer Budget
                  </span>

                  <strong>
                    ₹
                    {selectedOrder.budget.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <input
                  type="number"
                  min="0"
                  placeholder="Enter quotation amount"
                  value={
                    selectedOrder.estimatedPrice ||
                    ""
                  }
                  onChange={(e) =>
                    updatePrice(
                      e.target.value
                    )
                  }
                  style={styles.input}
                />

                {selectedOrder.estimatedPrice && (
                  <div
                    style={
                      styles.quotationPreview
                    }
                  >
                    Final Quotation:{" "}
                    <strong>
                      ₹
                      {selectedOrder.estimatedPrice.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                )}

                <button
                  style={
                    styles.primaryButton
                  }
                  onClick={
                    sendQuotation
                  }
                >
                  📩 Send Quotation
                </button>

              </div>


              {/* =============================================
                  ORDER STATUS
              ============================================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  🔄 Update Order Status
                </h3>

                <p
                  style={
                    styles.cardDescription
                  }
                >
                  Keep the customer informed by
                  updating the progress of their
                  custom bouquet order.
                </p>

                <div
                  style={
                    styles.currentStatusBox
                  }
                >

                  <span>
                    Current Status
                  </span>

                  <strong
                    style={{
                      color:
                        getStatusColor(
                          selectedOrder.status
                        ),
                    }}
                  >
                    {selectedOrder.status}
                  </strong>

                </div>

                <select
                  value={
                    selectedOrder.status
                  }
                  style={styles.select}
                  onChange={(e) =>
                    updateStatus(
                      selectedOrder.id,
                      e.target.value
                    )
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Designing">
                    Designing
                  </option>

                  <option value="Ready">
                    Ready
                  </option>

                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* =================================================
              CUSTOMER COMMUNICATION
          ================================================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                📞 Customer Communication
              </h3>

              <p
                style={
                  styles.cardDescription
                }
              >
                Contact the customer directly
                regarding quotation approval,
                delivery updates, or bouquet
                changes.
              </p>

              <div
                style={
                  styles.communicationGrid
                }
              >

                <button
                  style={
                    styles.communicationButton
                  }
                  onClick={() =>
                    contactCustomer("Call")
                  }
                >
                  📞 Call
                </button>

                <button
                  style={
                    styles.communicationButton
                  }
                  onClick={() =>
                    contactCustomer(
                      "WhatsApp"
                    )
                  }
                >
                  💬 WhatsApp
                </button>

                <button
                  style={
                    styles.communicationButton
                  }
                  onClick={() =>
                    contactCustomer(
                      "Email"
                    )
                  }
                >
                  📧 Email
                </button>

              </div>

            </div>

          </section>
                    {/* ================= ORDER DETAILS ================= */}

          <section style={styles.section}>

            <h2 style={styles.sectionTitle}>
              🌸 Order Details
            </h2>

            <div style={styles.detailsGrid}>

              {/* ================= CUSTOMER INFORMATION ================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  👤 Customer Information
                </h3>

                <div style={styles.infoRow}>
                  <strong>Name</strong>
                  <span>{selectedOrder.customer}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Phone</strong>
                  <span>{selectedOrder.phone}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Email</strong>
                  <span>{selectedOrder.email}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Address</strong>
                  <span>{selectedOrder.address}</span>
                </div>

              </div>

              {/* ================= BOUQUET INFORMATION ================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  💐 Bouquet Details
                </h3>

                <div style={styles.infoRow}>
                  <strong>Occasion</strong>
                  <span>{selectedOrder.occasion}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Budget</strong>
                  <span>₹{selectedOrder.budget}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Bouquet Size</strong>
                  <span>{selectedOrder.bouquetSize}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Flowers</strong>
                  <span>{selectedOrder.flowers}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Colour Theme</strong>
                  <span>{selectedOrder.colors}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Wrapping</strong>
                  <span>{selectedOrder.wrapping}</span>
                </div>

                <div style={styles.infoRow}>
                  <strong>Vase</strong>
                  <span>{selectedOrder.vase}</span>
                </div>

              </div>

            </div>

          </section>


          {/* ================= DELIVERY DETAILS ================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                🚚 Delivery Information
              </h3>

              <div style={styles.deliveryGrid}>

                <div style={styles.deliveryBox}>

                  <strong>
                    Delivery Date
                  </strong>

                  <p>
                    {selectedOrder.deliveryDate}
                  </p>

                </div>


                <div style={styles.deliveryBox}>

                  <strong>
                    Delivery Time
                  </strong>

                  <p>
                    {selectedOrder.deliveryTime}
                  </p>

                </div>


                <div style={styles.deliveryBox}>

                  <strong>
                    Current Status
                  </strong>

                  <p>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background:
                          getStatusColor(
                            selectedOrder.status
                          ),
                      }}
                    >
                      {selectedOrder.status}
                    </span>
                  </p>

                </div>


                <div style={styles.deliveryBox}>

                  <strong>
                    Order ID
                  </strong>

                  <p>
                    {selectedOrder.id}
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* ================= MESSAGE & SPECIAL NOTES ================= */}

          <section style={styles.section}>

            <div style={styles.notesGrid}>

              {/* ================= GREETING MESSAGE ================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  💌 Greeting Message
                </h3>

                <div style={styles.messageBox}>

                  {selectedOrder.message ||
                    "No greeting message provided."}

                </div>

              </div>


              {/* ================= SPECIAL INSTRUCTIONS ================= */}

              <div style={styles.detailsCard}>

                <h3 style={styles.cardHeading}>
                  📝 Special Instructions
                </h3>

                <div style={styles.messageBox}>

                  {selectedOrder.specialInstruction ||
                    "No special instructions provided."}

                </div>

              </div>

            </div>

          </section>


          {/* ================= REFERENCE IMAGE ================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                🖼 Reference Image
              </h3>

              {selectedOrder.referenceImage ? (

                <img
                  src={selectedOrder.referenceImage}
                  alt={`Reference for ${selectedOrder.id}`}
                  style={styles.referenceImage}
                />

              ) : (

                <div style={styles.imagePlaceholder}>

                  <div style={styles.placeholderIcon}>
                    📷
                  </div>

                  <p>
                    Customer did not upload a
                    reference image.
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* ================= FLOWER REQUIREMENTS ================= */}

          <section style={styles.section}>

            <div style={styles.detailsCard}>

              <h3 style={styles.cardHeading}>
                🌼 Inventory Recommendation
              </h3>

              <p style={styles.cardDescription}>
                Recommended materials and flowers based
                on the customer's custom bouquet request.
              </p>

              <div style={styles.inventoryGrid}>

                <div style={styles.inventoryItem}>
                  🌹 Premium Roses
                </div>

                <div style={styles.inventoryItem}>
                  🌸 Lilies
                </div>

                <div style={styles.inventoryItem}>
                  🌼 Carnations
                </div>

                <div style={styles.inventoryItem}>
                  🌿 Baby's Breath
                </div>

                <div style={styles.inventoryItem}>
                  🍃 Imported Greenery
                </div>

                <div style={styles.inventoryItem}>
                  🎀 Luxury Wrapping Paper
                </div>

                <div style={styles.inventoryItem}>
                  🏺 Decorative Vase
                </div>

                <div style={styles.inventoryItem}>
                  💌 Greeting Card
                </div>

              </div>

            </div>

          </section>
                    {/* ================= CUSTOMER COMMUNICATION ================= */}

          <section style={styles.section}>
            <div style={styles.detailsCard}>
              <h3 style={styles.cardHeading}>
                📞 Customer Communication
              </h3>

              <p style={styles.cardDescription}>
                Contact the customer directly regarding quotation
                approval, delivery updates, or bouquet changes.
              </p>

              <div style={styles.communicationGrid}>
                <button
                  type="button"
                  style={styles.communicationButton}
                  onClick={() => contactCustomer("Call")}
                >
                  📞 Call Customer
                </button>

                <button
                  type="button"
                  style={styles.communicationButton}
                  onClick={() => contactCustomer("WhatsApp")}
                >
                  💬 WhatsApp
                </button>

                <button
                  type="button"
                  style={styles.communicationButton}
                  onClick={() => contactCustomer("Email")}
                >
                  📧 Email
                </button>
              </div>
            </div>
          </section>

          {/* ================= SUMMARY ================= */}

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              📊 Custom Order Summary
            </h2>

            <div style={styles.statsGrid}>
              {/* Average Order Value */}

              <div style={styles.statCard}>
                <div
                  style={{
                    ...styles.statIcon,
                    background: "#ec4899",
                  }}
                >
                  💐
                </div>

                <div style={styles.statContent}>
                  <h2 style={styles.statValue}>
                    ₹4,250
                  </h2>

                  <p style={styles.statTitle}>
                    Average Order Value
                  </p>
                </div>
              </div>

              {/* Highest Order */}

              <div style={styles.statCard}>
                <div
                  style={{
                    ...styles.statIcon,
                    background: "#10b981",
                  }}
                >
                  🏆
                </div>

                <div style={styles.statContent}>
                  <h2 style={styles.statValue}>
                    ₹12,800
                  </h2>

                  <p style={styles.statTitle}>
                    Highest Custom Order
                  </p>
                </div>
              </div>

              {/* Most Requested Flower */}

              <div style={styles.statCard}>
                <div
                  style={{
                    ...styles.statIcon,
                    background: "#3b82f6",
                  }}
                >
                  🌹
                </div>

                <div style={styles.statContent}>
                  <h2 style={styles.statValue}>
                    Roses
                  </h2>

                  <p style={styles.statTitle}>
                    Most Requested Flower
                  </p>
                </div>
              </div>

              {/* Popular Occasion */}

              <div style={styles.statCard}>
                <div
                  style={{
                    ...styles.statIcon,
                    background: "#f59e0b",
                  }}
                >
                  🎉
                </div>

                <div style={styles.statContent}>
                  <h2 style={styles.statValue}>
                    Birthday
                  </h2>

                  <p style={styles.statTitle}>
                    Most Popular Occasion
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminCustomOrder;
const styles = {
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1400px", margin: "0 auto", padding: "0 20px 80px" },
  hero: { background: "linear-gradient(135deg, #ec4899, #f472b6)", color: "#fff", textAlign: "center", padding: "90px 30px", borderRadius: "0 0 35px 35px", marginBottom: "70px" },
  heroTitle: { fontSize: "52px", fontWeight: "700", marginBottom: "20px" },
  heroSubtitle: { maxWidth: "780px", margin: "0 auto", fontSize: "18px", lineHeight: "34px" },
  section: { marginBottom: "70px" },
  sectionTitle: { fontSize: "36px", fontWeight: "700", color: "#222", marginBottom: "20px", textAlign: "center" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", marginBottom: "60px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "25px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  statIcon: { width: "70px", height: "70px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontSize: "34px", flexShrink: 0 },
  statContent: { flex: 1 },
  statValue: { margin: 0, fontSize: "34px", color: "#222", fontWeight: "700" },
  statTitle: { marginTop: "6px", color: "#777", fontSize: "16px" },
  searchSection: { display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" },
  searchInput: { flex: 1, minWidth: "300px", padding: "14px 18px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "16px", outline: "none", boxSizing: "border-box" },
  filterSelect: { width: "220px", padding: "14px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "16px", outline: "none", background: "#fff" },
  tableContainer: { background: "#fff", borderRadius: "18px", overflowX: "auto", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "950px" },
  tableHeader: { background: "#ec4899", color: "#fff", padding: "18px", textAlign: "left", fontSize: "16px", fontWeight: "700" },
  tableCell: { padding: "18px", borderBottom: "1px solid #f3f3f3", color: "#555", fontSize: "15px" },
  statusBadge: { color: "#fff", padding: "6px 14px", borderRadius: "20px", fontWeight: "600", fontSize: "13px", display: "inline-block" },
  viewButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 18px", cursor: "pointer", fontWeight: "600" },
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "30px" },
  detailsCard: { background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 20px rgba(0,0,0,.08)" },
  cardHeading: { fontSize: "26px", fontWeight: "700", color: "#ec4899", marginBottom: "25px" },
  cardDescription: { color: "#666", lineHeight: "28px", marginBottom: "20px", fontSize: "15px" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid #f2f2f2", color: "#555", gap: "20px" },
  deliveryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" },
  deliveryBox: { background: "#fff8fb", border: "1px solid #f7d4e5", borderRadius: "14px", padding: "20px", textAlign: "center" },
  notesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "30px" },
  messageBox: { background: "#fff8fb", padding: "20px", borderRadius: "14px", color: "#555", lineHeight: "30px", minHeight: "130px", border: "1px solid #f5d3e0" },
  referenceImage: { width: "100%", borderRadius: "18px", objectFit: "cover", maxHeight: "400px" },
  imagePlaceholder: { border: "2px dashed #f5b7d1", borderRadius: "18px", minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "20px", color: "#999", gap: "15px" },
  inventoryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" },
  inventoryItem: { background: "#fff8fb", border: "1px solid #f5d3e0", borderRadius: "14px", padding: "18px", textAlign: "center", color: "#444", fontWeight: "600", fontSize: "15px" },
  actionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "30px" },
  input: { width: "100%", padding: "14px 16px", border: "1px solid #ddd", borderRadius: "12px", fontSize: "16px", outline: "none", marginBottom: "20px", boxSizing: "border-box" },
  select: { width: "100%", padding: "14px 16px", border: "1px solid #ddd", borderRadius: "12px", fontSize: "16px", outline: "none", background: "#fff", boxSizing: "border-box" },
  primaryButton: { width: "100%", background: "linear-gradient(135deg, #ec4899, #f472b6)", color: "#fff", border: "none", borderRadius: "12px", padding: "16px", fontSize: "17px", fontWeight: "700", cursor: "pointer", transition: "0.3s", boxShadow: "0 8px 18px rgba(236,72,153,.25)" },
  communicationGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "18px", marginTop: "20px" },
  communicationButton: { background: "#fff", border: "2px solid #ec4899", color: "#ec4899", padding: "15px", borderRadius: "12px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
};