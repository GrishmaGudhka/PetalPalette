// src/components/UserComponents.js

import React from "react";
import { Link } from "react-router-dom";

/* ==========================================================
   User Profile Card
========================================================== */
export const UserProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div style={styles.userProfileCard.card}>
      <img src={user.image || "https://via.placeholder.com/130"} alt={user.name || "User"} style={styles.userProfileCard.image} />
      <div style={styles.userProfileCard.name}>{user.name}</div>
      <div style={styles.userProfileCard.email}>{user.email}</div>

      <div style={styles.userProfileCard.infoContainer}>
        <div style={styles.userProfileCard.row}><span style={styles.userProfileCard.label}>Phone</span><span style={styles.userProfileCard.value}>{user.phone || "-"}</span></div>
        <div style={styles.userProfileCard.row}><span style={styles.userProfileCard.label}>City</span><span style={styles.userProfileCard.value}>{user.city || "-"}</span></div>
        <div style={styles.userProfileCard.row}><span style={styles.userProfileCard.label}>State</span><span style={styles.userProfileCard.value}>{user.state || "-"}</span></div>
        <div style={styles.userProfileCard.row}><span style={styles.userProfileCard.label}>Member Since</span><span style={styles.userProfileCard.value}>{user.memberSince || "-"}</span></div>
      </div>

      <div style={styles.userProfileCard.buttonContainer}>
        <Link to="/profile" style={styles.userProfileCard.button}>Edit Profile</Link>
        <Link to="/track-order" style={styles.userProfileCard.button}>My Orders</Link>
      </div>
    </div>
  );
};

/* ==========================================================
   Address Card
========================================================== */
export const AddressCard = ({ address, onEdit, onDelete, onSelect, selected = false }) => {
  if (!address) return null;

  const dynamicCardStyle = {
    ...styles.addressCard.card,
    background: selected ? "#fff5fa" : "#ffffff",
    border: selected ? "2px solid #ec4899" : "1px solid #e5e5e5",
  };

  return (
    <div style={dynamicCardStyle}>
      <div style={styles.addressCard.header}>
        <div style={styles.addressCard.title}>{address.name || "Delivery Address"}</div>
        {selected && <div style={styles.addressCard.badge}>Default</div>}
      </div>

      <div style={styles.addressCard.info}>
        <div>{address.fullName || "-"}</div>
        <div>{address.phone || "-"}</div>
        <div>{address.addressLine1 || "-"}</div>
        {address.addressLine2 && <div>{address.addressLine2}</div>}
        <div>{address.city || "-"}, {address.state || "-"}</div>
        <div>{address.pincode || "-"}</div>
        <div>{address.country || "India"}</div>
      </div>

      <div style={styles.addressCard.actions}>
        <button style={styles.addressCard.button} onClick={() => onSelect?.(address)}>Select</button>
        <button style={styles.addressCard.secondaryButton} onClick={() => onEdit?.(address)}>Edit</button>
        <button style={styles.addressCard.secondaryButton} onClick={() => onDelete?.(address)}>Delete</button>
      </div>
    </div>
  );
};

/* ==========================================================
   Order Card
========================================================== */
export const OrderCard = ({ order, onTrack, onViewDetails }) => {
  if (!order) return null;

  const paymentColor = order.paymentStatus === "Paid" ? "#16a34a" : order.paymentStatus === "Pending" ? "#f59e0b" : "#dc2626";
  const deliveryColor = order.deliveryStatus === "Delivered" ? "#16a34a" : order.deliveryStatus === "Out for Delivery" ? "#2563eb" : order.deliveryStatus === "Preparing" ? "#f59e0b" : "#6b7280";

  return (
    <div style={styles.orderCard.card}>
      <div style={styles.orderCard.header}>
        <div>
          <div style={styles.orderCard.orderId}>Order #{order.orderId}</div>
          <div style={styles.orderCard.date}>Ordered on {order.orderDate}</div>
        </div>
        <div style={styles.orderCard.total}>₹ {Number(order.total || 0).toLocaleString("en-IN")}</div>
      </div>

      <div style={styles.orderCard.body}>
        <div style={styles.orderCard.column}>
          <div style={styles.orderCard.label}>Bouquet</div>
          <div style={styles.orderCard.value}>{order.productName || "Custom Bouquet"}</div>
          <div style={styles.orderCard.label}>Quantity</div>
          <div style={styles.orderCard.value}>{order.quantity || 1}</div>
        </div>
        <div style={styles.orderCard.column}>
          <div style={styles.orderCard.label}>Payment</div>
          <div style={{ ...styles.orderCard.paymentStatus, color: paymentColor }}>{order.paymentStatus}</div>
          <div style={styles.orderCard.label}>Delivery</div>
          <div style={{ ...styles.orderCard.deliveryStatus, color: deliveryColor }}>{order.deliveryStatus}</div>
        </div>
      </div>

      <div style={styles.orderCard.buttonContainer}>
        <button style={styles.orderCard.primaryButton} onClick={() => onTrack?.(order)}>Track Order</button>
        <button style={styles.orderCard.secondaryButton} onClick={() => onViewDetails?.(order)}>View Details</button>
      </div>
    </div>
  );
};

/* ==========================================================
   Notification Card
========================================================== */
export const NotificationCard = ({ notification, onMarkAsRead, onDelete }) => {
  if (!notification) return null;

  const dynamicCardStyle = {
    ...styles.notificationCard.card,
    background: notification.isRead ? "#ffffff" : "#fff5fa",
    border: notification.isRead ? "1px solid #e5e5e5" : "2px solid #ec4899",
  };

  return (
    <div style={dynamicCardStyle}>
      <div style={styles.notificationCard.content}>
        {!notification.isRead && <span style={styles.notificationCard.badge}>New</span>}
        <div style={styles.notificationCard.title}>{notification.title || "Notification"}</div>
        <div style={styles.notificationCard.message}>{notification.message || "No message available."}</div>
        <div style={styles.notificationCard.time}>{notification.time}</div>
      </div>

      <div style={styles.notificationCard.actions}>
        {!notification.isRead && <button style={styles.notificationCard.primaryButton} onClick={() => onMarkAsRead?.(notification)}>Mark as Read</button>}
        <button style={styles.notificationCard.secondaryButton} onClick={() => onDelete?.(notification)}>Delete</button>
      </div>
    </div>
  );
};

// Unified Standard Default Export containing references to all components
const UserComponents = { UserProfileCard, AddressCard, OrderCard, NotificationCard };
export default UserComponents;

/* ==========================================================
   Standalone Styles Definition Object
========================================================== */
const styles = {
  userProfileCard: {
    card: { width: "100%", maxWidth: "420px", margin: "20px auto", background: "#ffffff", borderRadius: "18px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", padding: "35px", textAlign: "center" },
    image: { width: "130px", height: "130px", borderRadius: "50%", objectFit: "cover", border: "4px solid #ec4899", marginBottom: "20px" },
    name: { fontSize: "28px", fontWeight: "700", color: "#333", marginBottom: "8px" },
    email: { color: "#777", fontSize: "15px", marginBottom: "25px" },
    infoContainer: { textAlign: "left", background: "#fafafa", borderRadius: "12px", padding: "20px" },
    row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #ececec" },
    label: { fontWeight: "600", color: "#444" },
    value: { color: "#666" },
    buttonContainer: { marginTop: "30px", display: "flex", justifyContent: "space-between", gap: "15px" },
    button: { flex: 1, background: "#ec4899", color: "#fff", textDecoration: "none", padding: "12px", borderRadius: "8px", textAlign: "center", fontWeight: "600" },
  },
  addressCard: {
    card: { width: "100%", maxWidth: "500px", borderRadius: "16px", padding: "25px", marginBottom: "20px", boxShadow: "0 3px 10px rgba(0,0,0,0.08)" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
    title: { fontSize: "20px", fontWeight: "700", color: "#333" },
    badge: { background: "#ec4899", color: "#fff", padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
    info: { color: "#555", lineHeight: "28px", fontSize: "15px", marginBottom: "20px" },
    actions: { display: "flex", gap: "12px", flexWrap: "wrap" },
    button: { flex: 1, minWidth: "110px", background: "#ec4899", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
    secondaryButton: { flex: 1, minWidth: "110px", background: "#ffffff", color: "#ec4899", border: "2px solid #ec4899", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  },
  orderCard: {
    card: { width: "700px", background: "#ffffff", borderRadius: "16px", padding: "25px", marginBottom: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: "1px solid #eeeeee" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" },
    orderId: { fontSize: "22px", fontWeight: "700", color: "#333" },
    date: { color: "#777", fontSize: "14px" },
    body: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "25px" },
    column: { flex: "1", minWidth: "220px" },
    label: { fontWeight: "600", color: "#444", marginBottom: "5px" },
    value: { color: "#666", marginBottom: "15px" },
    total: { color: "#ec4899", fontSize: "26px", fontWeight: "700" },
    paymentStatus: { fontWeight: "700" },
    deliveryStatus: { fontWeight: "700" },
    buttonContainer: { display: "flex", gap: "15px", flexWrap: "wrap" },
    primaryButton: { flex: 1, minWidth: "160px", background: "#ec4899", color: "#ffffff", border: "none", borderRadius: "8px", padding: "12px", cursor: "pointer", fontWeight: "600", fontSize: "15px" },
    secondaryButton: { flex: 1, minWidth: "160px", background: "#ffffff", color: "#ec4899", border: "2px solid #ec4899", borderRadius: "8px", padding: "12px", cursor: "pointer", fontWeight: "600", fontSize: "15px" },
  },
  notificationCard: {
    card: { width: "100%", maxWidth: "700px", borderRadius: "16px", padding: "22px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" },
    content: { flex: 1, minWidth: "250px" },
    title: { fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "8px" },
    message: { fontSize: "15px", color: "#666", lineHeight: "24px", marginBottom: "12px" },
    time: { fontSize: "13px", color: "#999" },
    actions: { display: "flex", flexDirection: "column", gap: "10px", minWidth: "150px" },
    primaryButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "8px", padding: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
    secondaryButton: { background: "#ffffff", color: "#ec4899", border: "2px solid #ec4899", borderRadius: "8px", padding: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
    badge: { display: "inline-block", background: "#ec4899", color: "#fff", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px", marginBottom: "10px" },
  },
};