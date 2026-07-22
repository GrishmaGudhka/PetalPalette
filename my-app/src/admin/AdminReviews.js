// src/pages/AdminReview.js

import React, { useEffect, useState } from "react";

export default function AdminReview() {
  /* ================= SAMPLE REVIEWS ================= */

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem(
      "adminReviews"
    );

    return savedReviews
      ? JSON.parse(savedReviews)
      : [
          {
            id: "REV-001",
            customer: "Riya Patel",
            email: "riya@gmail.com",
            rating: 5,
            title: "Absolutely Beautiful Flowers!",
            comment:
              "The bouquet was fresh, beautifully arranged and delivered on time. I absolutely loved the colour combination!",
            product: "Deluxe Flower Bouquet",
            date: "2026-07-10",
            status: "Approved",
            reply: "",
          },

          {
            id: "REV-002",
            customer: "Rahul Sharma",
            email: "rahul@gmail.com",
            rating: 4,
            title: "Beautiful Anniversary Bouquet",
            comment:
              "The flowers were beautiful and my wife loved them. The delivery was slightly delayed but overall a great experience.",
            product: "Anniversary Special Bouquet",
            date: "2026-07-12",
            status: "Approved",
            reply:
              "Thank you for your wonderful feedback! We are happy you enjoyed the bouquet.",
          },

          {
            id: "REV-003",
            customer: "Sneha Mehta",
            email: "sneha@gmail.com",
            rating: 3,
            title: "Good but Could Be Better",
            comment:
              "The bouquet was nice, but I expected a few more flowers considering the price.",
            product: "Grand Luxury Bouquet",
            date: "2026-07-14",
            status: "Pending",
            reply: "",
          },

          {
            id: "REV-004",
            customer: "Aarav Shah",
            email: "aarav@gmail.com",
            rating: 5,
            title: "Perfect Birthday Surprise",
            comment:
              "The flowers arrived exactly as shown in the picture. Excellent service and very fresh flowers.",
            product: "Birthday Flower Box",
            date: "2026-07-15",
            status: "Approved",
            reply: "",
          },

          {
            id: "REV-005",
            customer: "Priya Desai",
            email: "priya@gmail.com",
            rating: 2,
            title: "Delivery Was Late",
            comment:
              "The flowers were good, but the delivery was much later than the promised time.",
            product: "Classic Flower Bouquet",
            date: "2026-07-16",
            status: "Hidden",
            reply: "",
          },
        ];
  });

  /* ================= STATES ================= */

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [replyText, setReplyText] =
    useState("");

  /* ================= SAVE REVIEWS ================= */

  useEffect(() => {
    localStorage.setItem(
      "adminReviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  /* ================= STATISTICS ================= */

  const totalReviews = reviews.length;

  const approvedReviews = reviews.filter(
    (review) =>
      review.status === "Approved"
  ).length;

  const pendingReviews = reviews.filter(
    (review) =>
      review.status === "Pending"
  ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  /* ================= UPDATE STATUS ================= */

  const updateReviewStatus = (
    id,
    newStatus
  ) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              status: newStatus,
            }
          : review
      )
    );

    if (
      selectedReview &&
      selectedReview.id === id
    ) {
      setSelectedReview({
        ...selectedReview,
        status: newStatus,
      });
    }
  };

  /* ================= DELETE REVIEW ================= */

  const deleteReview = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to permanently delete this review?"
      );

    if (!confirmDelete) {
      return;
    }

    setReviews((prev) =>
      prev.filter(
        (review) => review.id !== id
      )
    );

    if (
      selectedReview &&
      selectedReview.id === id
    ) {
      setSelectedReview(null);
    }
  };

  /* ================= OPEN REVIEW ================= */

  const openReview = (review) => {
    setSelectedReview(review);

    setReplyText(
      review.reply || ""
    );
  };

  /* ================= SEND REPLY ================= */

  const sendReply = () => {
    if (!selectedReview) {
      return;
    }

    if (!replyText.trim()) {
      alert(
        "Please enter a reply before sending."
      );
      return;
    }

    setReviews((prev) =>
      prev.map((review) =>
        review.id ===
        selectedReview.id
          ? {
              ...review,
              reply: replyText,
            }
          : review
      )
    );

    setSelectedReview({
      ...selectedReview,
      reply: replyText,
    });

    alert(
      "Reply saved successfully!"
    );
  };

  /* ================= FILTER REVIEWS ================= */

  const filteredReviews = reviews
    .filter((review) => {
      const searchText =
        search.toLowerCase();

      return (
        review.customer
          .toLowerCase()
          .includes(searchText) ||
        review.title
          .toLowerCase()
          .includes(searchText) ||
        review.comment
          .toLowerCase()
          .includes(searchText) ||
        review.product
          .toLowerCase()
          .includes(searchText)
      );
    })
    .filter((review) => {
      if (
        ratingFilter === "All"
      ) {
        return true;
      }

      return (
        Number(review.rating) ===
        Number(ratingFilter)
      );
    })
    .filter((review) => {
      if (
        statusFilter === "All"
      ) {
        return true;
      }

      return (
        review.status ===
        statusFilter
      );
    });

  /* ================= STAR DISPLAY ================= */

  const renderStars = (rating) => {
    return (
      <span style={styles.stars}>
        {"★".repeat(Number(rating))}
        <span style={styles.emptyStars}>
          {"★".repeat(
            5 - Number(rating)
          )}
        </span>
      </span>
    );
  };

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div style={styles.page}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            ⭐ Customer Reviews
          </h1>

          <p style={styles.subtitle}>
            Manage customer feedback,
            approve reviews, hide
            inappropriate content and
            respond to customers.
          </p>
        </div>

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
            ⭐
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {totalReviews}
            </h2>

            <p style={styles.statLabel}>
              Total Reviews
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
              {approvedReviews}
            </h2>

            <p style={styles.statLabel}>
              Approved
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
              {pendingReviews}
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
              background: "#8b5cf6",
            }}
          >
            🌟
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {averageRating}
            </h2>

            <p style={styles.statLabel}>
              Average Rating
            </p>
          </div>

        </div>

      </div>

      {/* ================= SEARCH & FILTER ================= */}

      <div style={styles.toolbar}>

        <input
          type="text"
          placeholder="🔍 Search by customer, product or review..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />

        <select
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(
              e.target.value
            )
          }
          style={styles.filterSelect}
        >

          <option value="All">
            All Ratings
          </option>

          <option value="5">
            ⭐⭐⭐⭐⭐ 5 Stars
          </option>

          <option value="4">
            ⭐⭐⭐⭐ 4 Stars
          </option>

          <option value="3">
            ⭐⭐⭐ 3 Stars
          </option>

          <option value="2">
            ⭐⭐ 2 Stars
          </option>

          <option value="1">
            ⭐ 1 Star
          </option>

        </select>

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
            All Status
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Hidden">
            Hidden
          </option>

        </select>

      </div>

      {/* ================= REVIEW LIST ================= */}

      <div style={styles.reviewContainer}>

        <div style={styles.listHeader}>

          <h2 style={styles.listTitle}>
            💬 Customer Feedback
          </h2>

          <span style={styles.resultCount}>
            {filteredReviews.length} review(s)
          </span>

        </div>

        {filteredReviews.length ===
        0 ? (

          <div style={styles.emptyState}>

            <div style={styles.emptyIcon}>
              💬
            </div>

            <h3>
              No Reviews Found
            </h3>

            <p>
              Try changing your search
              or filter settings.
            </p>

          </div>

        ) : (

          <div style={styles.reviewGrid}>

            {filteredReviews.map(
              (review) => (

                <div
                  key={review.id}
                  style={{
                    ...styles.reviewCard,
                    ...(review.status ===
                    "Hidden"
                      ? styles.hiddenCard
                      : {}),
                  }}
                >

                  {/* REVIEW TOP */}

                  <div
                    style={
                      styles.reviewTop
                    }
                  >

                    <div>

                      <span
                        style={{
                          ...styles.statusBadge,
                          background:
                            review.status ===
                            "Approved"
                              ? "#10b981"
                              : review.status ===
                                "Pending"
                              ? "#f59e0b"
                              : "#6b7280",
                        }}
                      >
                        {review.status}
                      </span>

                    </div>

                    <span
                      style={
                        styles.reviewId
                      }
                    >
                      {review.id}
                    </span>

                  </div>

                  {/* CUSTOMER */}

                  <div
                    style={
                      styles.customerInfo
                    }
                  >

                    <div
                      style={
                        styles.avatar
                      }
                    >
                      {review.customer
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <h3
                        style={
                          styles.customerName
                        }
                      >
                        {review.customer}
                      </h3>

                      <p
                        style={
                          styles.customerEmail
                        }
                      >
                        {review.email}
                      </p>

                    </div>

                  </div>

                  {/* RATING */}

                  <div
                    style={
                      styles.ratingRow
                    }
                  >
                    {renderStars(
                      review.rating
                    )}

                    <span
                      style={
                        styles.ratingNumber
                      }
                    >
                      {review.rating}/5
                    </span>
                  </div>

                  {/* REVIEW */}

                  <h3
                    style={
                      styles.reviewTitle
                    }
                  >
                    {review.title}
                  </h3>

                  <p
                    style={
                      styles.reviewComment
                    }
                  >
                    {review.comment}
                  </p>

                  {/* PRODUCT */}

                  <div
                    style={
                      styles.productInfo
                    }
                  >
                    🌸{" "}
                    <strong>
                      Product:
                    </strong>{" "}
                    {review.product}
                  </div>

                  <div
                    style={
                      styles.dateInfo
                    }
                  >
                    📅{" "}
                    {formatDate(
                      review.date
                    )}
                  </div>

                  {/* ADMIN REPLY */}

                  {review.reply && (
                    <div
                      style={
                        styles.replyPreview
                      }
                    >
                      <strong>
                        Admin Reply:
                      </strong>

                      <p>
                        {review.reply}
                      </p>
                    </div>
                  )}

                  {/* ACTIONS */}

                  <div
                    style={
                      styles.actionGrid
                    }
                  >

                    <button
                      style={
                        styles.viewButton
                      }
                      onClick={() =>
                        openReview(
                          review
                        )
                      }
                    >
                      👁 View
                    </button>

                    {review.status !==
                      "Approved" && (
                      <button
                        style={
                          styles.approveButton
                        }
                        onClick={() =>
                          updateReviewStatus(
                            review.id,
                            "Approved"
                          )
                        }
                      >
                        ✓ Approve
                      </button>
                    )}

                    {review.status ===
                      "Approved" && (
                      <button
                        style={
                          styles.hideButton
                        }
                        onClick={() =>
                          updateReviewStatus(
                            review.id,
                            "Hidden"
                          )
                        }
                      >
                        👁‍🗨 Hide
                      </button>
                    )}

                    <button
                      style={
                        styles.deleteButton
                      }
                      onClick={() =>
                        deleteReview(
                          review.id
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

      {/* ================= REVIEW DETAILS MODAL ================= */}

      {selectedReview && (

        <div
          style={styles.modalOverlay}
          onClick={() =>
            setSelectedReview(null)
          }
        >

          <div
            style={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              style={styles.closeButton}
              onClick={() =>
                setSelectedReview(null)
              }
            >
              ✕
            </button>

            <h2
              style={
                styles.modalTitle
              }
            >
              💬 Review Details
            </h2>

            {/* CUSTOMER */}

            <div
              style={
                styles.modalCustomer
              }
            >

              <div
                style={
                  styles.largeAvatar
                }
              >
                {selectedReview.customer
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3>
                  {selectedReview.customer}
                </h3>

                <p>
                  {selectedReview.email}
                </p>

              </div>

            </div>

            {/* RATING */}

            <div
              style={
                styles.modalRating
              }
            >
              {renderStars(
                selectedReview.rating
              )}

              <span>
                {selectedReview.rating}
                /5
              </span>
            </div>

            <h3>
              {selectedReview.title}
            </h3>

            <p
              style={
                styles.modalComment
              }
            >
              {selectedReview.comment}
            </p>

            <div
              style={
                styles.modalInfo
              }
            >

              <p>
                <strong>
                  Product:
                </strong>{" "}
                {selectedReview.product}
              </p>

              <p>
                <strong>
                  Date:
                </strong>{" "}
                {formatDate(
                  selectedReview.date
                )}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {selectedReview.status}
              </p>

            </div>

            {/* REPLY */}

            <div
              style={
                styles.replySection
              }
            >

              <h3>
                📩 Reply to Customer
              </h3>

              <textarea
                value={replyText}
                onChange={(e) =>
                  setReplyText(
                    e.target.value
                  )
                }
                placeholder="Write your reply to the customer..."
                rows="5"
                style={
                  styles.replyTextarea
                }
              />

              <button
                style={
                  styles.replyButton
                }
                onClick={sendReply}
              >
                📩 Save & Send Reply
              </button>

            </div>

            {/* MODAL ACTIONS */}

            <div
              style={
                styles.modalActions
              }
            >

              {selectedReview.status !==
                "Approved" && (
                <button
                  style={
                    styles.approveButton
                  }
                  onClick={() =>
                    updateReviewStatus(
                      selectedReview.id,
                      "Approved"
                    )
                  }
                >
                  ✓ Approve Review
                </button>
              )}

              {selectedReview.status ===
                "Approved" && (
                <button
                  style={
                    styles.hideButton
                  }
                  onClick={() =>
                    updateReviewStatus(
                      selectedReview.id,
                      "Hidden"
                    )
                  }
                >
                  👁‍🗨 Hide Review
                </button>
              )}

              <button
                style={
                  styles.deleteButton
                }
                onClick={() =>
                  deleteReview(
                    selectedReview.id
                  )
                }
              >
                🗑 Delete Review
              </button>

            </div>

          </div>

        </div>

      )}

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
  header: { maxWidth: "1400px", margin: "0 auto 40px" },
  title: { margin: 0, fontSize: "38px", color: "#222", fontWeight: "700" },
  subtitle: { marginTop: "10px", color: "#777", fontSize: "16px", lineHeight: "28px", maxWidth: "750px" },

  /* ================= STATS ================= */
  statsGrid: { maxWidth: "1400px", margin: "0 auto 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "20px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "25px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 8px 20px rgba(0,0,0,.07)" },
  statIcon: { width: "60px", height: "60px", borderRadius: "15px", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontSize: "28px" },
  statNumber: { margin: 0, fontSize: "30px", color: "#222" },
  statLabel: { margin: "5px 0 0", color: "#777", fontSize: "14px" },

  /* ================= TOOLBAR & FILTERS ================= */
  toolbar: { maxWidth: "1400px", margin: "0 auto 30px", display: "flex", gap: "15px", flexWrap: "wrap" },
  searchInput: { flex: 1, minWidth: "280px", padding: "14px 18px", border: "1px solid #ddd", borderRadius: "12px", fontSize: "15px", outline: "none" },
  filterSelect: { width: "210px", padding: "14px", border: "1px solid #ddd", borderRadius: "12px", background: "#fff", fontSize: "15px", outline: "none" },

  /* ================= REVIEW CONTAINER & CARDS ================= */
  reviewContainer: { maxWidth: "1400px", margin: "0 auto", background: "#fff", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.07)" },
  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" },
  listTitle: { margin: 0, fontSize: "25px", color: "#333" },
  resultCount: { color: "#777", fontSize: "14px" },
  reviewGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "25px" },
  reviewCard: { border: "1px solid #f1d7e2", borderRadius: "18px", padding: "25px", background: "#fff" },
  hiddenCard: { opacity: 0.7, background: "#f9fafb" },
  reviewTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  statusBadge: { color: "#fff", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" },
  reviewId: { color: "#999", fontSize: "11px" },

  /* ================= CUSTOMER & CONTENT ================= */
  customerInfo: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" },
  avatar: { width: "45px", height: "45px", borderRadius: "50%", background: "#ec4899", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "700", fontSize: "18px" },
  customerName: { margin: 0, fontSize: "17px", color: "#333" },
  customerEmail: { margin: "4px 0 0", color: "#999", fontSize: "12px" },
  ratingRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" },
  stars: { color: "#fbbf24", fontSize: "20px", letterSpacing: "2px" },
  emptyStars: { color: "#ddd" },
  ratingNumber: { color: "#777", fontSize: "13px" },
  reviewTitle: { margin: "10px 0", color: "#333", fontSize: "19px" },
  reviewComment: { color: "#666", fontSize: "14px", lineHeight: "25px", minHeight: "50px" },
  productInfo: { marginTop: "18px", padding: "12px", background: "#fff8fb", borderRadius: "10px", color: "#555", fontSize: "13px" },
  dateInfo: { color: "#999", fontSize: "12px", marginTop: "10px" },
  replyPreview: { marginTop: "15px", padding: "14px", background: "#f0fdf4", borderRadius: "10px", borderLeft: "4px solid #10b981", color: "#555", fontSize: "13px" },

  /* ================= BUTTONS & ACTIONS ================= */
  actionGrid: { display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" },
  viewButton: { flex: 1, padding: "10px", background: "#ec4899", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  approveButton: { flex: 1, padding: "10px", background: "#10b981", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  hideButton: { flex: 1, padding: "10px", background: "#6b7280", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  deleteButton: { padding: "10px 14px", background: "#fff", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  emptyState: { textAlign: "center", padding: "70px 20px", color: "#777" },
  emptyIcon: { fontSize: "55px", marginBottom: "15px" },

  /* ================= MODAL ================= */
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.55)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 9999, overflowY: "auto" },
  modal: { position: "relative", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto", background: "#fff", borderRadius: "20px", padding: "35px", boxSizing: "border-box" },
  closeButton: { position: "absolute", top: "15px", right: "15px", width: "35px", height: "35px", borderRadius: "50%", border: "none", background: "#f3f3f3", cursor: "pointer", fontSize: "16px" },
  modalTitle: { marginTop: 0, color: "#ec4899", fontSize: "26px" },
  modalCustomer: { display: "flex", alignItems: "center", gap: "15px", margin: "25px 0" },
  largeAvatar: { width: "60px", height: "60px", borderRadius: "50%", background: "#ec4899", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "700" },
  modalRating: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" },
  modalComment: { color: "#555", lineHeight: "28px", background: "#fff8fb", padding: "20px", borderRadius: "12px" },
  modalInfo: { marginTop: "20px", color: "#555", lineHeight: "26px" },
  replySection: { marginTop: "30px", paddingTop: "25px", borderTop: "1px solid #eee" },
  replyTextarea: { width: "100%", boxSizing: "border-box", padding: "15px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "14px", resize: "vertical", outline: "none", fontFamily: "inherit" },
  replyButton: { marginTop: "12px", width: "100%", padding: "13px", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer" },
  modalActions: { display: "flex", gap: "10px", marginTop: "25px", flexWrap: "wrap" },
};