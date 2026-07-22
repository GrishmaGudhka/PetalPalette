import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminEvents = () => {

  /* =========================================================
     SAMPLE EVENTS
  ========================================================= */

  const [events, setEvents] = useState([
    {
      id: "EVT-001",
      name: "Monsoon Flower Festival",
      type: "Festival",
      date: "25 July 2026",
      time: "10:00 AM - 8:00 PM",
      venue: "Bandra Community Hall",
      city: "Mumbai",
      guests: 500,
      budget: 75000,
      status: "Planned",
      description:
        "A beautiful seasonal flower festival featuring floral decorations, workshops, and flower stalls.",
      flowers:
        "Roses, Lilies, Marigolds, Gerberas",
    },

    {
      id: "EVT-002",
      name: "Luxury Wedding Decoration",
      type: "Wedding",
      date: "30 July 2026",
      time: "6:00 PM - 11:00 PM",
      venue: "The Grand Palace",
      city: "Mumbai",
      guests: 350,
      budget: 125000,
      status: "Ongoing",
      description:
        "Luxury floral decoration and stage arrangements for a premium wedding celebration.",
      flowers:
        "White Roses, Orchids, Hydrangeas, Baby's Breath",
    },

    {
      id: "EVT-003",
      name: "Independence Day Floral Setup",
      type: "Corporate",
      date: "15 August 2026",
      time: "8:00 AM - 2:00 PM",
      venue: "Corporate Plaza",
      city: "Mumbai",
      guests: 200,
      budget: 45000,
      status: "Planned",
      description:
        "Patriotic floral arrangements and entrance decorations for Independence Day celebrations.",
      flowers:
        "Orange Marigolds, White Roses, Green Foliage",
    },

    {
      id: "EVT-004",
      name: "Annual Flower Exhibition",
      type: "Exhibition",
      date: "10 June 2026",
      time: "9:00 AM - 7:00 PM",
      venue: "Nehru Exhibition Centre",
      city: "Mumbai",
      guests: 1000,
      budget: 150000,
      status: "Completed",
      description:
        "Annual exhibition showcasing premium flowers, floral arrangements, and artistic installations.",
      flowers:
        "Tulips, Orchids, Roses, Carnations",
    },
  ]);

  /* =========================================================
     STATES
  ========================================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [editingEvent, setEditingEvent] =
    useState(null);

  /* =========================================================
     FORM STATE
  ========================================================= */

  const emptyForm = {
    name: "",
    type: "Wedding",
    date: "",
    time: "",
    venue: "",
    city: "",
    guests: "",
    budget: "",
    status: "Planned",
    description: "",
    flowers: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  /* =========================================================
     FILTER EVENTS
  ========================================================= */

  const filteredEvents = events.filter(
    (event) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        event.name
          .toLowerCase()
          .includes(searchText) ||

        event.id
          .toLowerCase()
          .includes(searchText) ||

        event.venue
          .toLowerCase()
          .includes(searchText) ||

        event.city
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : event.status === statusFilter;

      const matchesType =
        typeFilter === "All"
          ? true
          : event.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    }
  );

  /* =========================================================
     HANDLE FORM INPUT
  ========================================================= */

  const handleInputChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  /* =========================================================
     OPEN ADD EVENT FORM
  ========================================================= */

  const openAddForm = () => {

    setEditingEvent(null);

    setFormData(emptyForm);

    setShowForm(true);

  };

  /* =========================================================
     OPEN EDIT EVENT FORM
  ========================================================= */

  const openEditForm = (event) => {

    setEditingEvent(event.id);

    setFormData({
      name: event.name,
      type: event.type,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.city,
      guests: event.guests,
      budget: event.budget,
      status: event.status,
      description: event.description,
      flowers: event.flowers,
    });

    setShowForm(true);

  };

  /* =========================================================
     SAVE EVENT
  ========================================================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.name ||
        !formData.date ||
        !formData.venue) {

      alert(
        "Please fill in all required fields."
      );

      return;
    }

    if (editingEvent) {

      const updatedEvents =
        events.map((event) =>

          event.id === editingEvent
            ? {
                ...event,
                ...formData,
                guests:
                  Number(formData.guests),
                budget:
                  Number(formData.budget),
              }
            : event

        );

      setEvents(updatedEvents);

      alert(
        "Event updated successfully!"
      );

    } else {

      const newEvent = {

        id:
          `EVT-${String(
            events.length + 1
          ).padStart(3, "0")}`,

        ...formData,

        guests:
          Number(formData.guests),

        budget:
          Number(formData.budget),

      };

      setEvents([
        ...events,
        newEvent,
      ]);

      alert(
        "New event added successfully!"
      );

    }

    setShowForm(false);

    setEditingEvent(null);

    setFormData(emptyForm);

  };

  /* =========================================================
     DELETE EVENT
  ========================================================= */

  const deleteEvent = (eventId) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) {
      return;
    }

    setEvents(
      events.filter(
        (event) =>
          event.id !== eventId
      )
    );

    if (
      selectedEvent &&
      selectedEvent.id === eventId
    ) {

      setSelectedEvent(null);

    }

  };

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const updateStatus = (
    eventId,
    newStatus
  ) => {

    const updatedEvents =
      events.map((event) =>

        event.id === eventId
          ? {
              ...event,
              status: newStatus,
            }
          : event

      );

    setEvents(updatedEvents);

    if (
      selectedEvent &&
      selectedEvent.id === eventId
    ) {

      setSelectedEvent({
        ...selectedEvent,
        status: newStatus,
      });

    }

  };

  /* =========================================================
     STATUS COLOR
  ========================================================= */

  const getStatusStyle = (
    status
  ) => {

    switch (status) {

      case "Planned":
        return {
          background: "#fef3c7",
          color: "#b45309",
        };

      case "Ongoing":
        return {
          background: "#dbeafe",
          color: "#2563eb",
        };

      case "Completed":
        return {
          background: "#dcfce7",
          color: "#15803d",
        };

      case "Cancelled":
        return {
          background: "#fee2e2",
          color: "#dc2626",
        };

      default:
        return {
          background: "#f3f4f6",
          color: "#555",
        };

    }

  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      <Header />

      <div style={styles.page}>

        {/* =================================================
            HERO
        ================================================= */}

        <section style={styles.hero}>

          <h1 style={styles.heroTitle}>
            🎉 Event Management
          </h1>

          <p style={styles.heroSubtitle}>
            Plan, organize and manage all PetalPalette
            floral events, weddings, exhibitions,
            festivals and corporate celebrations.
          </p>

          <button
            style={styles.heroButton}
            onClick={openAddForm}
          >
            + Create New Event
          </button>

        </section>

        <div style={styles.container}>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <section style={styles.statsGrid}>

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#fce7f3",
                }}
              >
                🎉
              </div>

              <div>
                <h2 style={styles.statValue}>
                  {events.length}
                </h2>

                <p style={styles.statLabel}>
                  Total Events
                </p>
              </div>

            </div>

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#fef3c7",
                }}
              >
                📅
              </div>

              <div>
                <h2 style={styles.statValue}>
                  {
                    events.filter(
                      (event) =>
                        event.status ===
                        "Planned"
                    ).length
                  }
                </h2>

                <p style={styles.statLabel}>
                  Planned Events
                </p>
              </div>

            </div>

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#dbeafe",
                }}
              >
                🔄
              </div>

              <div>
                <h2 style={styles.statValue}>
                  {
                    events.filter(
                      (event) =>
                        event.status ===
                        "Ongoing"
                    ).length
                  }
                </h2>

                <p style={styles.statLabel}>
                  Ongoing Events
                </p>
              </div>

            </div>

            <div style={styles.statCard}>

              <div
                style={{
                  ...styles.statIcon,
                  background: "#dcfce7",
                }}
              >
                ✅
              </div>

              <div>
                <h2 style={styles.statValue}>
                  {
                    events.filter(
                      (event) =>
                        event.status ===
                        "Completed"
                    ).length
                  }
                </h2>

                <p style={styles.statLabel}>
                  Completed Events
                </p>
              </div>

            </div>

          </section>

          {/* =================================================
              SEARCH AND FILTER
          ================================================= */}

          <section style={styles.searchSection}>

            <input
              type="text"
              placeholder="Search by event name, ID, venue or city..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={styles.searchInput}
            />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
              style={styles.filterSelect}
            >

              <option value="All">
                All Event Types
              </option>

              <option value="Wedding">
                Wedding
              </option>

              <option value="Festival">
                Festival
              </option>

              <option value="Corporate">
                Corporate
              </option>

              <option value="Exhibition">
                Exhibition
              </option>

              <option value="Birthday">
                Birthday
              </option>

              <option value="Other">
                Other
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

              <option value="Planned">
                Planned
              </option>

              <option value="Ongoing">
                Ongoing
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

            <button
              style={styles.addButton}
              onClick={openAddForm}
            >
              + Add Event
            </button>

          </section>

          {/* =================================================
              EVENTS TABLE
          ================================================= */}

          <section style={styles.section}>

            <h2 style={styles.sectionTitle}>
              📋 All Events
            </h2>

            <div style={styles.tableContainer}>

              <table style={styles.table}>

                <thead>

                  <tr>

                    <th style={styles.tableHeader}>
                      Event ID
                    </th>

                    <th style={styles.tableHeader}>
                      Event
                    </th>

                    <th style={styles.tableHeader}>
                      Type
                    </th>

                    <th style={styles.tableHeader}>
                      Date
                    </th>

                    <th style={styles.tableHeader}>
                      Venue
                    </th>

                    <th style={styles.tableHeader}>
                      Guests
                    </th>

                    <th style={styles.tableHeader}>
                      Budget
                    </th>

                    <th style={styles.tableHeader}>
                      Status
                    </th>

                    <th style={styles.tableHeader}>
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredEvents.length === 0 ? (

                    <tr>

                      <td
                        colSpan="9"
                        style={styles.emptyCell}
                      >
                        No events found.
                      </td>

                    </tr>

                  ) : (

                    filteredEvents.map(
                      (event) => (

                        <tr key={event.id}>

                          <td style={styles.tableCell}>
                            {event.id}
                          </td>

                          <td style={styles.tableCell}>

                            <strong>
                              {event.name}
                            </strong>

                          </td>

                          <td style={styles.tableCell}>
                            {event.type}
                          </td>

                          <td style={styles.tableCell}>
                            {event.date}
                          </td>

                          <td style={styles.tableCell}>
                            {event.venue}
                          </td>

                          <td style={styles.tableCell}>
                            {event.guests}
                          </td>

                          <td style={styles.tableCell}>
                            ₹
                            {Number(
                              event.budget
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td style={styles.tableCell}>

                            <span
                              style={{
                                ...styles.statusBadge,
                                ...getStatusStyle(
                                  event.status
                                ),
                              }}
                            >
                              {event.status}
                            </span>

                          </td>

                          <td style={styles.tableCell}>

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
                                  setSelectedEvent(
                                    event
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                style={
                                  styles.editButton
                                }
                                onClick={() =>
                                  openEditForm(
                                    event
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                style={
                                  styles.deleteButton
                                }
                                onClick={() =>
                                  deleteEvent(
                                    event.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* =================================================
              EVENT DETAILS
          ================================================= */}

          {selectedEvent && (

            <section style={styles.section}>

              <div style={styles.detailsCard}>

                <div
                  style={
                    styles.detailsHeader
                  }
                >

                  <div>

                    <h2
                      style={
                        styles.detailsTitle
                      }
                    >
                      🎉 {selectedEvent.name}
                    </h2>

                    <p
                      style={
                        styles.detailsId
                      }
                    >
                      Event ID:{" "}
                      {selectedEvent.id}
                    </p>

                  </div>

                  <button
                    style={
                      styles.closeButton
                    }
                    onClick={() =>
                      setSelectedEvent(
                        null
                      )
                    }
                  >
                    ✕
                  </button>

                </div>

                <div
                  style={
                    styles.detailsGrid
                  }
                >

                  <div style={styles.detailBox}>
                    <strong>
                      Event Type
                    </strong>

                    <p>
                      {selectedEvent.type}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      Date
                    </strong>

                    <p>
                      {selectedEvent.date}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      Time
                    </strong>

                    <p>
                      {selectedEvent.time}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      Venue
                    </strong>

                    <p>
                      {selectedEvent.venue}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      City
                    </strong>

                    <p>
                      {selectedEvent.city}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      Expected Guests
                    </strong>

                    <p>
                      {selectedEvent.guests}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      Event Budget
                    </strong>

                    <p>
                      ₹
                      {Number(
                        selectedEvent.budget
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div style={styles.detailBox}>
                    <strong>
                      Status
                    </strong>

                    <select
                      value={
                        selectedEvent.status
                      }
                      onChange={(e) =>
                        updateStatus(
                          selectedEvent.id,
                          e.target.value
                        )
                      }
                      style={
                        styles.statusSelect
                      }
                    >

                      <option>
                        Planned
                      </option>

                      <option>
                        Ongoing
                      </option>

                      <option>
                        Completed
                      </option>

                      <option>
                        Cancelled
                      </option>

                    </select>

                  </div>

                </div>

                <div
                  style={
                    styles.descriptionSection
                  }
                >

                  <h3>
                    Event Description
                  </h3>

                  <p>
                    {selectedEvent.description}
                  </p>

                </div>

                <div
                  style={
                    styles.descriptionSection
                  }
                >

                  <h3>
                    🌸 Required Flowers
                  </h3>

                  <p>
                    {selectedEvent.flowers}
                  </p>

                </div>

              </div>

            </section>

          )}

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT EVENT MODAL
      ===================================================== */}

      {showForm && (

        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <div style={styles.modalHeader}>

              <h2 style={styles.modalTitle}>
                {editingEvent
                  ? "✏️ Edit Event"
                  : "🎉 Create New Event"}
              </h2>

              <button
                style={styles.modalClose}
                onClick={() =>
                  setShowForm(false)
                }
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              style={styles.form}
            >

              <div style={styles.formGrid}>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Event Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter event name"
                    style={styles.input}
                    required
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Event Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={
                      handleInputChange
                    }
                    style={styles.input}
                  >

                    <option>
                      Wedding
                    </option>

                    <option>
                      Festival
                    </option>

                    <option>
                      Corporate
                    </option>

                    <option>
                      Exhibition
                    </option>

                    <option>
                      Birthday
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Event Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={
                      handleInputChange
                    }
                    style={styles.input}
                    required
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Event Time
                  </label>

                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={
                      handleInputChange
                    }
                    placeholder="e.g. 10 AM - 6 PM"
                    style={styles.input}
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Venue *
                  </label>

                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter venue"
                    style={styles.input}
                    required
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter city"
                    style={styles.input}
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Expected Guests
                  </label>

                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Number of guests"
                    style={styles.input}
                    min="0"
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Budget
                  </label>

                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter budget"
                    style={styles.input}
                    min="0"
                  />

                </div>

                <div style={styles.formGroup}>

                  <label style={styles.label}>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={
                      handleInputChange
                    }
                    style={styles.input}
                  >

                    <option>
                      Planned
                    </option>

                    <option>
                      Ongoing
                    </option>

                    <option>
                      Completed
                    </option>

                    <option>
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

              <div style={styles.formGroup}>

                <label style={styles.label}>
                  Required Flowers
                </label>

                <input
                  type="text"
                  name="flowers"
                  value={formData.flowers}
                  onChange={
                    handleInputChange
                  }
                  placeholder="e.g. Roses, Orchids, Lilies"
                  style={styles.input}
                />

              </div>

              <div style={styles.formGroup}>

                <label style={styles.label}>
                  Event Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter event details..."
                  style={
                    styles.textarea
                  }
                  rows="4"
                />

              </div>

              <div style={styles.formActions}>

                <button
                  type="button"
                  style={
                    styles.cancelButton
                  }
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={
                    styles.saveButton
                  }
                >
                  {editingEvent
                    ? "Update Event"
                    : "Create Event"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      <Footer />

    </>
  );
};

export default AdminEvents;


/* =========================================================
   STYLES
========================================================= */

const styles = {
  /* ================= BASE LAYOUT ================= */
  page: { minHeight: "100vh", background: "#fff8fb" },
  container: { maxWidth: "1400px", margin: "0 auto", padding: "0 20px 80px" },

  /* ================= HERO ================= */
  hero: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", textAlign: "center", padding: "80px 30px", borderRadius: "0 0 35px 35px", marginBottom: "60px" },
  heroTitle: { fontSize: "48px", margin: "0 0 15px", fontWeight: "700" },
  heroSubtitle: { maxWidth: "750px", margin: "0 auto 30px", fontSize: "18px", lineHeight: "30px" },
  heroButton: { background: "#fff", color: "#ec4899", border: "none", borderRadius: "12px", padding: "15px 30px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },

  /* ================= STATS ================= */
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "22px", marginBottom: "50px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "25px", display: "flex", alignItems: "center", gap: "18px", boxShadow: "0 8px 20px rgba(0,0,0,.06)" },
  statIcon: { width: "60px", height: "60px", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" },
  statValue: { margin: 0, fontSize: "30px", color: "#222" },
  statLabel: { margin: "7px 0 0", color: "#777" },

  /* ================= SEARCH & FILTERS ================= */
  searchSection: { display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "40px" },
  searchInput: { flex: 1, minWidth: "280px", padding: "14px 18px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "15px", outline: "none" },
  filterSelect: { minWidth: "180px", padding: "14px", borderRadius: "12px", border: "1px solid #ddd", background: "#fff", fontSize: "15px" },
  addButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "12px", padding: "14px 22px", cursor: "pointer", fontWeight: "700" },

  /* ================= TABLE ================= */
  section: { marginBottom: "60px" },
  sectionTitle: { fontSize: "30px", color: "#222", marginBottom: "25px" },
  tableContainer: { background: "#fff", borderRadius: "18px", overflowX: "auto", boxShadow: "0 8px 20px rgba(0,0,0,.06)" },
  table: { width: "100%", minWidth: "1200px", borderCollapse: "collapse" },
  tableHeader: { background: "#ec4899", color: "#fff", padding: "17px", textAlign: "left", fontSize: "14px" },
  tableCell: { padding: "17px", borderBottom: "1px solid #f2f2f2", color: "#555", fontSize: "14px" },
  emptyCell: { padding: "50px", textAlign: "center", color: "#999" },
  statusBadge: { padding: "7px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", display: "inline-block" },
  actionButtons: { display: "flex", gap: "7px" },
  viewButton: { background: "#ec4899", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer" },
  editButton: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer" },
  deleteButton: { background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer" },

  /* ================= DETAILS CARD ================= */
  detailsCard: { background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 20px rgba(0,0,0,.06)" },
  detailsHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" },
  detailsTitle: { margin: 0, color: "#ec4899", fontSize: "28px" },
  detailsId: { color: "#999", marginTop: "7px" },
  closeButton: { background: "#fff1f2", color: "#e11d48", border: "none", borderRadius: "10px", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px" },
  detailBox: { background: "#fff8fb", border: "1px solid #f5d3e0", borderRadius: "14px", padding: "18px" },
  descriptionSection: { marginTop: "30px", paddingTop: "25px", borderTop: "1px solid #f2e2e8" },
  statusSelect: { marginTop: "10px", width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "#fff" },

  /* ================= MODAL & FORM ================= */
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.55)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 1000 },
  modal: { background: "#fff", width: "100%", maxWidth: "850px", maxHeight: "90vh", overflowY: "auto", borderRadius: "22px", padding: "30px", boxSizing: "border-box" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" },
  modalTitle: { margin: 0, color: "#ec4899", fontSize: "27px" },
  modalClose: { border: "none", background: "#fff1f2", color: "#e11d48", borderRadius: "10px", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "700", color: "#444" },
  input: { padding: "13px 15px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", outline: "none", boxSizing: "border-box", width: "100%" },
  textarea: { padding: "13px 15px", border: "1px solid #ddd", borderRadius: "10px", fontSize: "15px", outline: "none", resize: "vertical", fontFamily: "Arial, sans-serif", boxSizing: "border-box", width: "100%" },
  formActions: { display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "10px" },
  cancelButton: { padding: "13px 25px", border: "1px solid #ddd", background: "#fff", color: "#555", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  saveButton: { padding: "13px 25px", border: "none", background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", borderRadius: "10px", cursor: "pointer", fontWeight: "700" },
};